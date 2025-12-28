
import dataBase from "./dataBase.js";

// Create Class Person

class Person {
    constructor () {
       // constructor is empty
    }
   // Create Person
  static async createPerson(firstname, surname, dob, email, age) {
     
    const sql = `
      INSERT INTO Person
      (FirstName, Surname, DateOfBirth, EmailAddress, Age)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await dataBase.query(sql, [
      firstname,
      surname,
      dob,
      email,
      age
    ]);
    return result.insertId;
  
  }
  // load Person
  static async loadPerson(id) {
     const [rows] = await dataBase.query(
      "SELECT * FROM Person WHERE id = ?",
      [id]
    );
    return rows[0];
  }
  // update Person
  static async updatePerson(id, firstName, surname, dob, email, age) {
     await dataBase.query(
      `UPDATE Person
       SET FirstName=?, Surname=?, DateOfBirth=?, EmailAddress=?, Age=?
       WHERE id=?`,
      [firstName, surname, dob, email, age, id]
    );
  }
  // delete Person
  static async deletePerson(id) {
     await dataBase.query(
      "DELETE FROM Person WHERE id = ?",
      [id]
    );
  }
  // load the whole table
  static async loadAllPeople() {
     const [rows] = await dataBase.query("SELECT * FROM Person");
    return rows;
  }

   // delete. the whole table
  static async deleteAllPeople() {
    await dataBase.query('DELETE FROM Person')
  }

}

export default Person;