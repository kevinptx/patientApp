package com.hackbright.patientApp.repositories;

import com.hackbright.patientApp.entities.Doctor;
import com.hackbright.patientApp.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    List<Patient> findAllByDoctorEquals(Doctor doctor);
}
