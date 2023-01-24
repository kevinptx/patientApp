package com.hackbright.patientApp.entities;

import com.hackbright.patientApp.dtos.DoctorDto;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Doctors")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    @NotBlank(message = "Name is required")
    private String doctorname;

    //userID stored in cookies, so subsequent calls are aware of this

    @Column
    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;

    @OneToMany(mappedBy = "doctor", fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JsonManagedReference
    private Set<Patient> patientSet = new HashSet<>();
    //Do it just like the Notes app: Users will be doctors table and notes table should be patients table.
    //we want oneToMany mapping between doctors and patients. Only the doctors will login at this point. Login as Dr
    //to access list of pts.
    public Doctor(DoctorDto doctorDto){
        if (doctorDto.getDoctorname() != null){
            this.doctorname = doctorDto.getDoctorname();
        }
        if (doctorDto.getPassword() != null){
            this.password = doctorDto.getPassword();
        }
    }

}
