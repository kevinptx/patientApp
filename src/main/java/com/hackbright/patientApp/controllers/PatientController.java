package com.hackbright.patientApp.controllers;

import com.hackbright.patientApp.dtos.DoctorDto;
import com.hackbright.patientApp.dtos.PatientDto;
import com.hackbright.patientApp.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/patients")
public class PatientController {
    @Autowired
    private PatientService patientService;

    @GetMapping("/doctor/{doctorId}")
    public List<PatientDto> getPatientsByDoctor(@PathVariable Long doctorId){
        return patientService.getAllPatientsByDoctorId(doctorId);
    }

    @PostMapping("/doctor/{doctorId}")
    public void addPatient(@RequestBody PatientDto patientDto, @PathVariable Long doctorId){
        patientService.addPatient(patientDto, doctorId);
    }

    @DeleteMapping("/{patientId}")
    public void deletePatientById(@PathVariable Long patientId){
        patientService.deletePatientById(patientId);
    }

    @PutMapping
    public void updatePatient(@RequestBody PatientDto patientDto){
        patientService.updatePatientById(patientDto);
    }

    @GetMapping("/{patientId}")
    public Optional<PatientDto> getPatientById(@PathVariable Long patientId){
        return patientService.getPatientById(patientId);
    }
}

