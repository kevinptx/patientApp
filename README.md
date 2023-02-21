# patientApp is a Java Spring Boot project for doctors, nurses, and medical providers to keep track of patient data.

## It is the personal capstone project for Devmountain's (Hackbright Academy's) Intermediate Level Java Spring Boot program. All CRUD operations (Create, Read/Retrieve, Update, and Delete) are demonstrated, which are the four basic functions of the persistence storage. The app, and the program for which it was created, are focused on back end rather than front end or user interface (UI) software development. Therefore, front end styling is not the objective or focus of this particular application.

## Below is GIF of the app. It is still under development:

![patientApp](https://github.com/kevinptx/patientApp/blob/main/patientAppDemo.gif)

### <b>[Gifski](https://gif.ski/ "Gifski")</b> is used to decrease the size of the above gif for uploading to GitHub, resulting in the blurry appearance and color incongruency.

**CONTENTS**

- [Technologies Used](#technologies-used)
- [Crud Operations](#CRUD-operations-applying-rESTful-principles)
- [User-Scenarios](#User-Scenarios)
- [Data Model and Entity Mapping](#data-model-and-entity-mapping)
- [Database and Back-end](#Database-and-Back-end)
- [Front-end](#Front-end)
- [Bonus and Additional Features](#Bonus-and-Additional-Features)
- [Installation](#installation)
- [About Kevin Peery](#about-kevin-peery)


## Technologies Used

1. <b>Java</b>
2. <b>Spring Boot</b>
3. <b>Maven</b>
4. <b>Spring Data JPA</b>
5. <b>Hibernate</b>
6. <b>Javascript</b>
7. <b>HTML</b>
8. <b>CSS</b>
9. <b>Bootstrap 5</b>
10. <b>PostgreSQL</b>

## CRUD Operations applying RESTful Principles
1. <b>POST:<b> Creates a new resource (A patient form can be filled out and saved to the database on form submit)
2. <b>GET:<b> Reads a resource (Patient data can be displayed from the database)
3. <b>PUT:<b> Updates an existing resource (Patient data can be edited and saved to the database)
4. <b>DELETE:<b> Deletes a resource (Patient data can be deleted)

## User Scenarios
The application provides the following user (doctor/provider) scenarios:

1. <b>Creating a doctor/provider account</b>: The doctor/provider (user) needs to create an account before patient information is saved in the back end.

2. <b>Logging in</b>: Doctors/Providers (users) can log in to their account.

3. <b>Filling out and submitting a form</b>: Doctors/Providers (users) can fill form field information and submit it. That data is then saved in the database.

4. <b>Editing</b>: Doctors/Providers (users) can edit patient information.

5. <b>Deleting</b>: Doctors/Providers (users) can delete patient information.

## Data Model and Entity Mapping

1. <b>One doctor to many patients (@OneToMany on the Doctor @Entity model)<b>
2. <b>Many patients to one doctor (@ManyToOne on the Patient @Entity model)<b>
  
## Below are the project's requirements, which my application exceeded (7 of the following had to be met in order to pass the project):
  
  
## Database and Back-end
1. <b>Has at least 3 tables</b>
2. <b>Contains at least 1 one:many relationship between tables</b>
3. <b>Tables contain data</b>
4. <b>Connects to server</b>
5. <b>Server</b>
6. <b>Uses an ORM (such as Hibernate)</b>
7. <b>Uses DAO (Data Access Object) design</b>
8. <b>Handles requests</b>
9. <b>Sends responses</b>
10. <b>Accepts requests from a front-end</b>

## Front-end
1. <b>Web application with at least 3 views</b>
2. <b>Discord bot</b>
3. <b>Command Line Interface</b>

## Bonus and Additional Features
1.  <b>My application is using a GET request to display data from OpenFDA through its [Drug API Endpoints](https://open.fda.gov/apis/drug/ "OpenFDA Drug API Endpoints").</b>
  2. <b>I use a dropdown menu that allows the provider to select a drug from the OpenFDA Drug API. The drug dropdown is populated with a list of the most common medications seen on the NCLEX-RN exam, which is required for registered nurse licensure in the USA, Canada, and Australia.</b>
  3. <b>The selected drug is saved to the database table on submission of the patient form</b>
4. <b>The provider can view associated drug information (e.g., adverse reactions, boxed warnings, and dosage and administration) pulled from the [OpenFDA Drug API](https://open.fda.gov/apis/drug/ "OpenFDA Drug API").</b>

## Installation

#### Requirements:

- Java 7.0
- Spring Boot

To have this app running on your local computer, please follow the below steps:

Clone repository:

```
$ git clone https://github.comkevinptx/patientApp.git
```

Create new backend server:

Create a free database server with AWS


Update application properties file:

Get URI from AWS


Run the file in IntelliJ (or your IDE of choice)


Navigate to `localhost:8080/home.html`

## About Kevin Peery

Kevin Peery is a software engineer and registered nurse in Houston, TX. He holds a bachelor's degree with double majors in business economics and history from the University of Texas at Austin, a Bachelor of Science in Nursing from the University of Texas at Arlington, and an Associate of Science in Computer Science. He has also completed several software engineering immersive programs. Kevin has had previous experience with the Database as a Service (DBAAS) team at a major oil and gas company where he focused on Angular development. He has completed training programs and has coding experience in langauges such as Java, Spring Boot, JavaScript, Angular, React, Ruby, Ruby on Rails, and C#. In addition to software development and active learning, Kevin enjoys running outdoors and staying healthy.

Connect with Kevin: 
<p><a href="https://www.linkedin.com/in/kevin-peery/">
  <img
    alt="LinkedIn"
    src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white"
  />
</a>
</p>


  
