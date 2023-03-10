# patientApp 

I created a Java Spring Boot project for doctors, nurses, and medical providers to keep track of patient data.

It is the personal capstone project for Hackbright Academy's (Devmountain's) Intermediate Level Java Spring Boot program. All CRUD operations (Create, Read/Retrieve, Update, and Delete) are demonstrated, which are the four basic functions of persistence storage. The app, and the program for which it was created, are focused on back end rather than front end or user interface (UI) software development. Therefore, front end styling is not the objective or focus of this particular application.

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
- [Additional Features](#Additional-Features)
- [Installation](#installation)
- [About Kevin Peery](#about-kevin-peery)


## Technologies Used

1. Java
2. Spring Boot
3. Maven
4. Spring Data JPA
5. Hibernate
6. Javascript
7. HTML
8. CSS
9. Bootstrap 5
10. PostgreSQL

## CRUD Operations applying RESTful Principles
1. POST: Creates a new resource (A patient form can be filled out and saved to the database on form submit)
2. GET: Reads a resource (Patient data can be displayed from the database)
3. PUT: Updates an existing resource (Patient data can be edited and saved to the database)
4. DELETE: Deletes a resource (Patient data can be deleted)

## User Scenarios
The application provides the following user (doctor/provider) scenarios:

1. Creating a doctor/provider account: The doctor/provider (user) needs to create an account before patient information is saved in the back end.

2. Logging in: Doctors/Providers (users) can log in to their account.

3. Filling out and submitting a form: Doctors/Providers (users) can fill form field information and submit it. That data is then saved in the database.

4. Editing: Doctors/Providers (users) can edit patient information.

5. Deleting: Doctors/Providers (users) can delete patient information.

## Data Model and Entity Mapping

1. One doctor to many patients (@OneToMany on the Doctor @Entity model)
2. Many patients to one doctor (@ManyToOne on the Patient @Entity model)
  
## Below are the project's requirements, which my application exceeded (7 of the following had to be met in order to pass the project):
  
  
## Database and Back-end
1. Has at least 3 tables
2. Contains at least 1 one:many relationship between tables
3. Tables contain data
4. Connects to server
5. Server
6. Uses an ORM (such as Hibernate)
7. Uses DAO (Data Access Object) design
8. Handles requests
9. Sends responses
10. Accepts requests from a front-end

## Front-end
1. Web application with at least 3 views
2. Discord bot
3. Command Line Interface

## Additional Features
1.  My application is using a GET request to display data from OpenFDA through its [Drug API Endpoints](https://open.fda.gov/apis/drug/ "OpenFDA Drug API Endpoints").
  2. I use a dropdown menu that allows the provider to select a drug from the OpenFDA Drug API. The drug dropdown is populated with a list of the most common medications seen on the NCLEX-RN exam, which is required for registered nurse licensure in the USA, Canada, and Australia.
  3. The selected drug is saved to the database table on submission of the patient form.
4. The provider can view associated drug information (e.g., adverse reactions, boxed warnings, and dosage and administration) pulled from the [OpenFDA Drug API](https://open.fda.gov/apis/drug/ "OpenFDA Drug API").

## Installation

#### Requirements:

- Java 11+
- Spring Boot

To have this app running on your local computer, please follow the below steps:

Clone repository:

```
$ git clone https://github.com/kevinptx/patientApp.git
```

Create new backend server:

Create a free database server with AWS or use [pgAdmin 4](https://www.pgadmin.org/download/ "pgAdmin 4") on your computer to create and maintain a local postgreSQL database session


Update application properties file:

```
spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.show-sql=true
spring.datasource.url=jdbc:postgresql://localhost:5432/postgres
spring.datasource.username=username
spring.datasource.password=password

# Hibernate ddl auto (create, create-drop, update)
spring.jpa.hibernate.ddl-auto=create-drop
logging.level.sql=debug
spring.jpa.show-sql=true

spring.datasource.initialization-mode=always
spring.datasource.initialize=true
spring.datasource.schema=classpath:/schema.sql
spring.datasource.continue-on-error=true
```

Get URI from AWS or use pgAdmin 4 to connect to your localhost. If you're using [pgAdmin 4](https://www.pgadmin.org/download/ "pgAdmin 4"), the URI will look something like this:

```
spring.datasource.url=jdbc:postgresql://localhost:5432/postgres
```



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


  
