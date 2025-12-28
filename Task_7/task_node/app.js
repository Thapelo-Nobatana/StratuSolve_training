const API_BASE = "http://localhost:8100";



// functions to get inputvalues
function getInputValue(id) {
  return document.getElementById(id).value;
}

function setInputValue(id, value) {
  document.getElementById(id).value = value ?? "";
}

// renderTable function
function renderTable(people) {
  const tableBody = document.getElementById("peopleTableBody");
  tableBody.innerHTML = "";

  people.forEach(person => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${person.id}</td>
      <td>${person.firstname}</td>
      <td>${person.Surname}</td>
      <td>${person.DateOfBirth}</td>
      <td>${person.EmailAddress}</td>
      <td>${person.Age}</td>
    `;

    // Click row to fill form
    row.addEventListener("click", () => {
      setInputValue("personId", person.id);
      setInputValue("firstName", person.firstname);
      setInputValue("surname", person.Surname);
      setInputValue("dateOfBirth", person.DateOfBirth);
      setInputValue("email", person.EmailAddress);
      setInputValue("age", person.Age);
    });

    tableBody.appendChild(row);
  });
}
 
 

// load all
async function loadAll() {
  const res = await fetch(`${API_BASE}/people`);
  const people = await res.json();

  renderTable(people);
}

// create Person
async function createPerson() {
  const person = {
    firstname: getInputValue("firstName"),
    Surname: getInputValue("surname"),
    DateOfBirth: getInputValue("dateOfBirth"),
    EmailAddress: getInputValue("email"),
    Age: getInputValue("age")
  };

  const res = await fetch(`${API_BASE}/people`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(person)
  });

  const data = await res.json();

  loadAll();
}

// update Person
async function updatePerson() {
  const id = getInputValue("personId");

  if (!id) {
    alert("Please enter an ID to update");
    return;
  }

  const person = {
    firstname: getInputValue("firstName"),
    Surname: getInputValue("surname"),
    DateOfBirth: getInputValue("dateOfBirth"),
    EmailAddress: getInputValue("email"),
    Age: getInputValue("age")
  };

  console.log(person)

  const res = await fetch(`${API_BASE}/people/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json"},
  
    body: JSON.stringify(person)
  });

  const data = await res.json();
    console.log(data)

  loadAll();
}

// delete Person 
async function deletePerson() {
  const id = getInputValue("personId");

  if (!id) {
    alert("Please enter an ID to delete");
    return;
  }

  const res = await fetch(`${API_BASE}/people/${id}`, {
    method: "DELETE"
  });

  const data = await res.json();
  

  loadAll();
}

// delete all People from the table
async function deleteAll() {
 

  const res = await fetch(`${API_BASE}/people`, {
    method: "DELETE"
  });

  const data = await res.json();


  loadAll();
}

loadAll();