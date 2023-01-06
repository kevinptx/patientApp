package com.hackbright.patientApp.entities;

import com.hackbright.patientApp.dtos.DoctorDto;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//import javax.persistence.*;
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
    private String doctorname;

    //User entity should keep track if patient or doctor. Provider username and password. Based on type of current user,
    // will see info based on that. Once you've provided credentials, app will know.
    //may store userID in cookies, so subsequent calls are aware of this (This is what NoteApp does)

    @Column
    private String password;

    @OneToMany(mappedBy = "doctor", fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JsonManagedReference
    private Set<Patient> patientSet = new HashSet<>();
    //Do it just like the Notes app: Users will be doctors table and notes table should be patients table.
    //we want oneToMany mapping between doctors and patients. Only the doctors will login at this point. Login as Dr
    //to access list of pts. Very much like notes app.
    public Doctor(DoctorDto doctorDto){
        if (doctorDto.getDoctorname() != null){
            this.doctorname = doctorDto.getDoctorname();
        }
        if (doctorDto.getPassword() != null){
            this.password = doctorDto.getPassword();
        }
    }

}