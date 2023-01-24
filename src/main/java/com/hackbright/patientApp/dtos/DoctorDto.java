package com.hackbright.patientApp.dtos;

import com.hackbright.patientApp.entities.Doctor;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorDto implements Serializable {
    private Long id;
    private String doctorname;
    private String password;
    private Set<DoctorDto> doctorDtoSet = new HashSet<>();

    public DoctorDto(Doctor doctor) {
        if (doctor.getId() != null){
            this.id = doctor.getId();
        }
        if (doctor.getDoctorname() != null){
            this.doctorname = doctor.getDoctorname();
        }
        if (doctor.getPassword() != null){
            this.password = doctor.getPassword();
        }
    }
}
