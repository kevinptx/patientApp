package com.hackbright.patientApp.services;

import com.hackbright.patientApp.dtos.DoctorDto;
import com.hackbright.patientApp.entities.Doctor;
import com.hackbright.patientApp.repositories.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DoctorServiceImpl implements DoctorService {
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public List<String> addDoctor(DoctorDto doctorDto){
        List<String> response = new ArrayList<>();
        Doctor doctor = new Doctor(doctorDto);
        doctorRepository.saveAndFlush(doctor);
        response.add("http://localhost:8080/login.html");
        return response;
    }

    @Override
    public List<String> doctorLogin(DoctorDto doctorDto){
        List<String> response = new ArrayList<>();
        Optional<Doctor> doctorOptional = doctorRepository.findByDoctorName(doctorDto.getDoctorName());
        if(doctorOptional.isPresent()){
            if(passwordEncoder.matches(doctorDto.getPassword(), doctorOptional.get().getPassword())){
                response.add("http://localhost:8080/home.html");
                response.add(String.valueOf(doctorOptional.get().getId()));
            } else {
                response.add("Provider name or password incorrect");
            }
        } else {
            response.add("Provider name or password incorrect");
        }
        return response;

    }

    public List<DoctorDto> getAllDoctors(){
        List<Doctor> doctors = this.doctorRepository.findAll();
        return doctors.stream().map(entity -> {
            return new DoctorDto(entity);
        }).toList();
    }

}