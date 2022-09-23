const express = require("express");
const router = express.Router();
const connectionDb = require("../../config/dbconnections");

class StudentModel {
  async getAll() {
    const con = connectionDb.promise();
    const data = await con.query(
      "SELECT * FROM student INNER JOIN person ON student.PersonID = person.PersonID INNER JOIN city ON person.CityID = city.CityID"
    );
    return data[0];
  }
  async findByCui(cui) {
    const con = connectionDb.promise();
    const data = await con.query(
      "SELECT * FROM student INNER JOIN person ON student.PersonID = person.PersonID INNER JOIN city ON person.CityID = city.CityID WHERE student.StudentID = ?",
      [cui]
    );
    return data[0];
  }
  async create({ StudentID, Career, Faculty, PersonID }) {
    const con = connectionDb.promise();
    const data = await con.query(
      "INSERT INTO student (StudentID,Career,Faculty,PersonID) VALUES (?,?,?,?)",
      [StudentID, Career, Faculty, PersonID]
    );
    return data[0];
  }
}
module.exports = StudentModel;
