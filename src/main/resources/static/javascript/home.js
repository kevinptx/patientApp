//create the Cookie
const cookieArr = document.cookie.split("=");
const doctorId = cookieArr[1];

//create DOM Elements
const submitForm = document.getElementById("patient-form");
const patientContainer = document.getElementById("patient-container");

//Create Modal Elements - these are for the Modal. These are for editing
let patientAge = document.getElementById("patient-age-edit");
let patientFirstName = document.getElementById("patient-firstName-edit");
let patientLastName = document.getElementById("patient-lastName-edit");
let patientDiagnosis = document.getElementById("patient-diagnosis-edit");
let patientPrescriptions = document.getElementById("patient-prescriptions-edit");
let patientDoctorNotes = document.getElementById("patient-doctorNotes-edit");


let updatePatientBtn = document.getElementById("update-patient-button");

const headers = {
    'Content-Type': 'application/json'
}

const baseUrl = "http://localhost:8080/api/v1/patients/"

//InputValidation: make sure password d/n have letter, uppercase, etc...(These are not necessary-these are nice to haves)
//On name, someone can type numbers instead of a name, but this is a more advanced nice to have...get it working first.

const handleSubmit = async (e) => {
    e.preventDefault()
    let bodyObj = {
    //these are for creating on the homepage
        age: document.getElementById("patient-age").value,
        firstName: document.getElementById("patient-firstName").value,
        lastName: document.getElementById("patient-lastName").value,
        prescriptions: document.getElementById("patient-prescriptions").value,
        doctorNotes: document.getElementById("patient-doctorNotes").value,
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
        age: patientAge.value,
        firstName: patientFirstName.value,
        lastName: patientLastName.value,
        diagnosis: patientDiagnosis.value,
        prescriptions: patientPrescriptions.value,
        doctorNotes: patientDoctorNotes.value
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

//work with the OpenFDA API:

const searchInput = document.querySelector('#search-input');
const searchButton = document.getElementById('search-button');
const resultsDropdown = document.querySelector('#results-dropdown');
const apiUrl = 'https://api.fda.gov/drug/label.json?search=';

async function fetchFromApi(selectedOption){
console.log("logging selectedOption in fetchFromAPI function", selectedOption)
await fetch(apiUrl + selectedOption)
  .then(response => response.json())
//  .then(data => console.log("Data.results:", data.results))
  .then(data => createDrugFieldData(data.results))
//  .then(data => {
//    data.results.forEach(result => {
//      const option = document.createElement('option');
//      option.value = result.id;
//      option.text = result.name;
//      resultsDropdown.add(patientPrescriptionsDisplay);
//    });
//  });
}


//this is for the p tag where the drug info is populated
const patientPrescriptionsDisplay = document.querySelector('#patient-prescriptions');

resultsDropdown.addEventListener('change', async () => {
console.log("Dropdown listener clicked")
const selectedOption = resultsDropdown.options[resultsDropdown.selectedIndex].value;
  //call the api with the selected option.
await fetchFromApi(selectedOption)
console.log("selectedOption", selectedOption)
});

const commonDrugsList = ["Aspirin", "Penicillin", "Insulin detemir", "Hydromorphone", "Metformin", "Methylergonovine", "Methotrexate ",
    "Gabapentin", "Nitroglycerin", "Oxytocin", "Pantoprazole", "Risperidone", "Methylprednisolone", "Budesonide", "Levothyroxine",
    "Vancomycin", "Piperacillin", "Clopidogrel", "Lithium", "Haloperidol", "Zolpidem", "Esomeprazole", "Amiodarone", "Aripiprazole",
    "Epoetin", "Risedronate", "Pregabalin", "Aspart", "Diltiazem", "Varenicline", "Furosemide", "Levofloxacin", "Atorvastatin",
    "Sildenafil", "Sertraline", "Fentanyl", "Fluticasone", "Propranolol", "Donepezil", "Lisinopril", "Rifampin", "Enoxaparin",
    "Adenosine", "Dutasteride", "Warfarin", "Phenytoin", "Metronidazole", "Gentamicin", "Digoxin", "Memantine", "Oxycodone",
    "Montelukast"
 ];

//this is populating the dropdown with the above array, commonDrugList
 for (let i = 0; i < commonDrugsList.length; i++) {
   let option = document.createElement("option");
   option.value = commonDrugsList[i];
   option.text = commonDrugsList[i];
   resultsDropdown.appendChild(option);
 }

//appending the fields from the API fetch to the p tag.
const createDrugFieldData = (array) => {
console.log("logging array in CreateDrugFieldData", array)
    patientPrescriptionsDisplay.innerHTML = ''
    array.forEach(obj => {
        let drugFields = document.createElement("div")
        drugFields.innerHTML = `
            <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Click to Expand Adverse Reactions
                  </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                  <p>${obj.adverse_reactions}</p>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Click to Expand Drug Contraindications
                  </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                  <p>${obj.contraindications}</p>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingThree">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Click to Expand Drug Interactions
                  </button>
                </h2>
                <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                  <p>${obj.drug_interactions}</p>
                  </div>
                </div>
              </div>
            </div>
        `
        patientPrescriptionsDisplay.append(drugFields);
    })
}



//working example


//Initialize Datepicker (to be done later if time permits):
//  $(function() {
//            $('#datepicker').datepicker();
//            });