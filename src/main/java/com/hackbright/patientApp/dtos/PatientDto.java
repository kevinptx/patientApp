package com.hackbright.patientApp.dtos;

import com.hackbright.patientApp.entities.Patient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientDto implements Serializable {
    private Long id;
    private String body;
    private DoctorDto doctorDto;

    public PatientDto(Patient patient){
        if (patient.getId() != null){
            this.id = patient.getId();
        }
        if (patient.getBody() != null){
            this.body = patient.getBody();
        }
    }
}
