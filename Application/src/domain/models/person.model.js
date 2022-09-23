const express = require("express");
const router = express.Router();
const connectionDb = require("../../config/dbconnections");

class PersonModel {
  async getAll() {
    const con = connectionDb.promise();
    const data = await con.query("SELECT * FROM person");
    return data[0];
  }
  async create({ First_Name, Last_Name, Email, DNI, Mobile_Phone, CityID }) {
    const con = connectionDb.promise();
    const data = await con.query(
      "INSERT INTO person (First_Name,Last_Name,Email,DNI,Home_Phone,Mobile_Phone,CityID) VALUES (?,?,?,?,?,?,?)",
      [First_Name, Last_Name, Email, DNI, null, Mobile_Phone, CityID]
    );
    return data[0].insertId;
  }
}
module.exports = PersonModel;
