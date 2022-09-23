const express = require("express");
const router = express.Router();
const connectionDb = require("../../config/dbconnections");

class ProfessorModel {
  async getAll() {
    const con = connectionDb.promise();
    const data = await con.query(
      "SELECT * FROM professor INNER JOIN person ON professor.PersonID = person.PersonID INNER JOIN city ON person.CityID = city.CityID"
    );
    return data[0];
  }
  async findByCode(code) {
    const con = connectionDb.promise();
    const data = await con.query(
      "SELECT * FROM professor INNER JOIN person ON professor.PersonID = person.PersonID INNER JOIN city ON person.CityID = city.CityID WHERE professor.ProfessorID = ?",
      [code]
    );
    return data[0];
  }

  async create({ Department, personId, idDNI }) {
    const con = connectionDb.promise();
    const data = await con.query(
      "INSERT INTO professor (Department,PersonID,idDNI) VALUES (?,?,?)",
      [Department, personId, idDNI]
    );
    return data[0];
  }

  async findByDNI(code) {
    const con = connectionDb.promise();
    const data = await con.query(
      "SELECT * FROM professor INNER JOIN person ON professor.PersonID = person.PersonID INNER JOIN city ON person.CityID = city.CityID WHERE professor.idDNI = ?",
      [code]
    );
    return data[0];
  }
}

module.exports = ProfessorModel;
