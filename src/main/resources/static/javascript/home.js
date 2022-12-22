//create the Cookie
const cookieArr = document.cookie.split("=");
const doctorId = cookieArr[1];

//create DOM Elements
const submitForm = document.getElementById("patient-form");
const patientContainer = document.getElementById("patient-container");

//Create Modal Elements
let patientBody = document.getElementById("patient-body");
let updatePatientBtn = document.getElementById("update-patient-button");

const headers = {
    'Content-Type': 'application/json'
}

const baseUrl = "http://localhost:8080/api/v1/patients/"

const handleSubmit = async (e) => {
    e.preventDefault()
    let bodyObj = {
        body: document.getElementById("patient-input").value
    }
    await addPatient(bodyObj);
    document.getElementById("patient-input").value = '';
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
                    <p class="card-text">${obj.body}</p>
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
    patientBody.innerText = ''
    patientBody.innerText = obj.body
    updatePatientBtn.setAttribute('data-patient-id', obj.id)
}

getPatients(doctorId);

submitForm.addEventListener("submit", handleSubmit)

updatePatientBtn.addEventListener("click", (e)=>{
    let patientId = e.target.getAttribute('data-patient-id')
    handlePatientEdit(patientId);
})