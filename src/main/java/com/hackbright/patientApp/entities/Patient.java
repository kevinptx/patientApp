package com.hackbright.patientApp.entities;

import com.hackbright.patientApp.dtos.PatientDto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//import javax.persistence.*;
import javax.print.Doc;

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
//    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    public Patient(PatientDto patientDto){
        if (patientDto.getBody() != null){
            this.body = patientDto.getBody();
        }
    }

}
