package com.hackbright.patientApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

//@EnableJpaRepositories("com.hackbright.patientApp.*")
//@ComponentScan(basePackages = { "com.hackbright.patientApp.*" })
//@EntityScan("com.hackbright.patientApp.entities.Doctor")
@SpringBootApplication
public class PatientAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(PatientAppApplication.class, args);
	}

}
