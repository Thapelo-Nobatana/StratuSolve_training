
import Person from "./personClass.js";

async function testPersonClass() {
  console.log("___STARTING TEST____");

  //  Creating a person on database
  const newId = await Person.createPerson(
    "Keamgetse",
    "Malau",
    "1999-04-23",
    "nobatanathapelo@gmail.com",
    26
  );
  console.log("Created person with ID:", newId);

  //  Loading person on database
  const person = await Person.loadPerson(newId);
  console.log("Loaded person:", person);

  //  updating person on database
  await Person.updatePerson(
    newId,
    "Keamogetswi",
    "MELLO",
    "1998-03-15",
    "updated@email.com",
    27
  );
  console.log("Person updated");

  // confirm update exites on database
  const updatedPerson = await Person.loadPerson(newId);
  console.log("Updated person:", updatedPerson);

  //  loading the whole database
  const allPeople = await Person.loadAllPeople();
  console.log("All people:", allPeople);

  // deleting a person from database
  await Person.deletePerson(newId);
  console.log("Person deleted");

  // await Person.deleteAllPeople();
  console.log("deleted anything");
  console.log("____TESTS COMPLETE____");
}

testPersonClass();