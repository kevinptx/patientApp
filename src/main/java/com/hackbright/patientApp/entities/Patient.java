package com.hackbright.patientApp.entities;

import com.hackbright.patientApp.dtos.PatientDto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "Patients")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "text")
    private String body;

    @ManyToOne
    @JsonBackReference
    private Patient patient;

    public Patient(PatientDto patientDto){
        if (patientDto.getBody() != null){
            this.body = patientDto.getBody();
        }
    }

}
