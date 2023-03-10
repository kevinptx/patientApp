package com.hackbright.patientApp.services;

import com.hackbright.patientApp.dtos.PatientDto;
import com.hackbright.patientApp.entities.Patient;
import com.hackbright.patientApp.entities.Doctor;
import com.hackbright.patientApp.repositories.PatientRepository;
import com.hackbright.patientApp.repositories.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class PatientServiceImpl implements PatientService {
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private PatientRepository patientRepository;

    @Override
    public List<PatientDto> getAllPatientsByDoctorId(Long doctorId){
        Optional<Doctor> doctorOptional = doctorRepository.findById(doctorId);
        if (doctorOptional.isPresent()){
            List<Patient> patientList = patientRepository.findAllByDoctorEquals(doctorOptional.get());
            return patientList.stream().map(patient -> new PatientDto(patient)).collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    @Override
    @Transactional
    public void addPatient(PatientDto patientDto, Long doctorId) {
        Optional<Doctor> doctorOptional = doctorRepository.findById(doctorId);
        Patient patient = new Patient(patientDto);
        doctorOptional.ifPresent(patient::setDoctor);
        patientRepository.saveAndFlush(patient);
    }

    @Override
    @Transactional
    public void deletePatientById(Long patientId) {
        Optional<Patient> patientOptional = patientRepository.findById(patientId);
        patientOptional.ifPresent(patient -> patientRepository.delete(patient));
    }

    @Override
    @Transactional
    public void updatePatientById(PatientDto patientDto) {
        Optional<Patient> patientOptional = patientRepository.findById(patientDto.getId());
        patientOptional.ifPresent(patient -> {
            patient.setAge(patientDto.getAge());
            patient.setFirstName(patientDto.getFirstName());
            patient.setLastName(patientDto.getLastName());
            patient.setDiagnosis(patientDto.getDiagnosis());
            patient.setPrescriptions(patientDto.getPrescriptions());
            patient.setDoctorNotes(patientDto.getDoctorNotes());
            patientRepository.saveAndFlush(patient);
        });
    }

    @Override
    public Optional<PatientDto> getPatientById(Long patientId) {
        Optional<Patient> patientOptional = patientRepository.findById(patientId);
        if (patientOptional.isPresent()){
            return Optional.of(new PatientDto(patientOptional.get()));
        }
        return Optional.empty();
    }
}