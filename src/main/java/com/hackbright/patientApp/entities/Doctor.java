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
//need additional column for type (Either a doctor or patient and this needs to be specified)
    //Note app, you login and notes are based on which user you are.
    //this one needs a certain set of info displayed depending on whether doctor or patient
    //add a new column can be string with the value "doctor" or "patient". This needs to be consistent throughout
    //the entire app. This will be a normal column value like "password". You will have a new string
    //value called "type" for example. User is the entity. Patient and doctor are just specific fields
    //in that entity.
    //Do it just like the Notes app: Users will be doctors table. and notes table should be patients table.
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