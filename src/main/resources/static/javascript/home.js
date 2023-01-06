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

//on dropdown maybe have a prepopulated field with some of the most common medicines.
//then give them a choice and once selected, fetch description from API and show it.

async function fetchFromApi(selectedOption){
console.log("logging selectedOption in fetchFromAPI function", selectedOption)
await fetch(apiUrl + selectedOption)
  .then(response => response.json())
  .then(data => console.log("Data.results:", data.results))
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

//searchButton.addEventListener('click', async () => {
//console.log("Clicked search button")
//  const searchTerm = searchInput.value;
//  //I'll no longer be using a search term but the dropdown. Edit for that.
//     await fetchFromApi(searchTerm);
//});

//this is for the dropdown
const patientPrescriptionsDisplay = document.querySelector('#patient-prescriptions');
//const selectedOption = resultsDropdown.options[resultsDropdown.selectedIndex];
//console.log("selectedOption Outside/Global", selectedOption)

resultsDropdown.addEventListener('change', async () => {
console.log("Dropdown listener clicked")
const selectedOption = resultsDropdown.options[resultsDropdown.selectedIndex].value;
  //call the api with the selected option.
await fetchFromApi(selectedOption)
console.log("selectedOption", selectedOption)
  //patientPrescriptionsDisplay.value += selectedOption.text + '\n';
});

//how to iterate over the common drugs list (for loop) and then for each of those, you append the child
//to the dropdown menu. There's a specific way to do that, connecting to the HTML.
//once those are added, you need the event listener to detect the one selected.
//from there, you do the API call (fetch) and populate the <p> tag with the specific fields
//that you drilled into using dot notation. Once you have list with the fields, select the ones you want
//and format it on the HTML.
const commonDrugsList = ["Aspirin", "Penicillin", "Insulin detemir", "Hydromorphone", "Metformin", "Methylergonovine", "Methotrexate ",
    "Gabapentin", "Nitroglycerin", "Oxytocin", "Pantoprazole", "Risperidone", "Methylprednisolone", "Budesonide", "Levothyroxine",
    "Vancomycin", "Piperacillin", "Clopidogrel", "Lithium", "Haloperidol", "Zolpidem", "Esomeprazole", "Amiodarone", "Aripiprazole",
    "Epoetin", "Risedronate", "Pregabalin", "Aspart", "Diltiazem", "Varenicline", "Furosemide", "Levofloxacin", "Atorvastatin",
    "Sildenafil", "Sertraline", "Fentanyl", "Fluticasone", "Propranolol", "Donepezil", "Lisinopril", "Rifampin", "Enoxaparin",
    "Adenosine", "Dutasteride", "Warfarin", "Phenytoin", "Metronidazole", "Gentamicin", "Digoxin", "Memantine", "Oxycodone",
    "Montelukast"
 ];

 for (let i = 0; i < commonDrugsList.length; i++) {
   let option = document.createElement("option");
   option.value = commonDrugsList[i];
   option.text = commonDrugsList[i];
   resultsDropdown.appendChild(option);
 }

//appending the fields from the API fetch to the p tag.
const createDrugFieldData = (array) => {
    patientPrescriptionsDisplay.innerHTML = ''
    array.forEach(obj => {
        let drugFields = document.createElement("div")
        //limit adverse reactions to a limited extendable textarea or p tag or other element.
        drugFields.innerHTML = `
                    <div>
                    <p class="lh-lg">${obj.adverse_reactions}</p>
                    <p class="lh-lg">${obj.contraindications}</p>
                    <p class="lh-lg">${obj.drug_interactions}</p>
                    </div>
                </div>
            </div>
        `
        patientPrescriptionsDisplay.append(drugFields);
    })
}


//Initialize Datepicker (to be done later if time permits):
//  $(function() {
//            $('#datepicker').datepicker();
//            });