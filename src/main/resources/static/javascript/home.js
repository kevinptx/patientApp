//create the Cookie
const cookieArr = document.cookie.split("=");
const doctorId = cookieArr[1];

//create DOM Elements
const submitForm = document.getElementById("patient-form");
const patientContainer = document.getElementById("patient-container");

//Create Modal Elements
let patientAge = document.getElementById("patient-age");
let patientFirstName = document.getElementById("patient-firstName");
let patientLastName = document.getElementById("patient-lastName");
let patientDiagnosis = document.getElementById("patient-diagnosis");
let patientPrescriptions = document.getElementById("patient-prescriptions");
let patientDoctorNotes = document.getElementById("patient-doctorNotes");


let updatePatientBtn = document.getElementById("update-patient-button");

const headers = {
    'Content-Type': 'application/json'
}

const baseUrl = "http://localhost:8080/api/v1/patients/"
//make sure that the name matches what you have in the DTO. If doesn't match, it won't go through and will be empty. On the DTO, there was a field
//called body. That's how it maps each of the objects inside. If you pass multiple things, it may not know what belongs to what, so make sure
//the name matches. InputValidation: make sure password d/n have letter, uppercase, etc...(These are not necessary-these are nice to haves)
//On name, someone can type numbers instead of a name, but this is more advanced nice to haves...get it working first.

//Some had their connections on the data model set up incorrectly and when they reached the front end, some of the issues
// resurface and this requires refactoring on the backend. Try to work on front end and get it presentable.
//
const handleSubmit = async (e) => {
    e.preventDefault()
    let bodyObj = {
        age: document.getElementById("patient-age").value
        firstName: document.getElementById("patient-firstName").value
        lastName: document.getElementById("patient-lastName").value
        prescriptions: document.getElementById("patient-prescriptions").value
        doctorNotes: document.getElementById("patient-doctorNotes").value
        diagnosis: document.getElementById("patient-diagnosis").value
    }
    await addPatient(bodyObj);
    document.getElementById("patient-age").value = '';
    document.getElementById("patient-firstName").value = '';
    document.getElementById("patient-lastName").value = '';
    document.getElementById("patient-prescriptions").value = '';
    document.getElementById("patient-doctorNotes").value = '';
    document.getElementById("patient-diagnosis").value = '';
}

async function addPatient(obj) {
    const response = await fetch(`${baseUrl}doctor/${doctorId}`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: headers
    })
        .catch(err => console.error(err.message))
    if (response.status == 200) {
        return getPatients(doctorId);
    }
}

async function getPatients(doctorId) {
    await fetch(`${baseUrl}doctor/${doctorId}`, {
        method: "GET",
        headers: headers
    })
        .then(response => response.json())
        .then(data => createPatientCards(data))
        .catch(err => console.error(err))
}

async function handleDelete(patientId){
    await fetch(baseUrl + patientId, {
        method: "DELETE",
        headers: headers
    })
        .catch(err => console.error(err))

    return getPatients(doctorId);
}

async function getPatientById(patientId){
    await fetch(baseUrl + patientId, {
        method: "GET",
        headers: headers
    })
        .then(res => res.json())
        .then(data => populateModal(data))
        .catch(err => console.error(err.message))
}

async function handlePatientEdit(patientId){
    let bodyObj = {
        id: patientId,
        body: patientBody.value
    }

    await fetch(baseUrl, {
        method: "PUT",
        body: JSON.stringify(bodyObj),
        headers: headers
    })
        .catch(err => console.error(err))

    return getPatients(doctorId);
}

const createPatientCards = (array) => {
    patientContainer.innerHTML = ''
    array.forEach(obj => {
        let patientCard = document.createElement("div")
        patientCard.classList.add("m-2")
        patientCard.innerHTML = `
            <div class="card d-flex" style="width: 18rem; height: 18rem;">
                <div class="card-body d-flex flex-column  justify-content-between" style="height: available">
                    <p class="card-text">${obj.firstName}</p>
                    <p class="card-text">${obj.lastName}</p>
                    <p class="card-text">${obj.age}</p>
                    <p class="card-text">${obj.diagnosis}</p>
                    <p class="card-text">${obj.prescriptions}</p>
                    <p class="card-text">${obj.doctorNotes}</p>
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-danger" onclick="handleDelete(${obj.id})">Delete</button>
                        <button onclick="getPatientById(${obj.id})" type="button" class="btn btn-primary"
                        data-bs-toggle="modal" data-bs-target="#patient-edit-modal">
                        Edit
                        </button>
                    </div>
                </div>
            </div>
        `
        patientContainer.append(patientCard);
    })
}
function handleLogout(){
    let c = document.cookie.split(";");
    for(let i in c){
        document.cookie = /^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
}

const populateModal = (obj) =>{
    patientFirstName.innerText = ''
    patientLastName.innerText = ''
    patientAge.innerText = ''
    patientDiagnosis.innerText = ''
    patientPrescriptions.innerText = ''
    patientDoctorNotes.innerText = ''
    patientFirstName.innerText = obj.firstName
    patientLastName.innerText = obj.lastName
    patientAge.innerText = obj.age
    patientDiagnosis.innerText = obj.diagnosis
    patientPrescriptions.innerText = obj.prescriptions
    patientDoctorNotes.innerText = obj.doctorNotes
    updatePatientBtn.setAttribute('data-patient-id', obj.id)
}
getPatients(doctorId);

submitForm.addEventListener("submit", handleSubmit)

updatePatientBtn.addEventListener("click", (e)=>{
    let patientId = e.target.getAttribute('data-patient-id')
    handlePatientEdit(patientId);
})