package com.hackbright.patientApp.services;

import com.hackbright.patientApp.dtos.DoctorDto;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface DoctorService {
    @Transactional
    List<String> addDoctor(DoctorDto doctorDto);

    List<String> doctorLogin(DoctorDto doctorDto);

    List<DoctorDto> getAllDoctors();
}
