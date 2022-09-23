const express = require("express");
const router = express.Router();
const connectionDb = require("../../config/dbconnections");

class CityModel {
  async getAll() {
    const con = connectionDb.promise();
    const data = await con.query("SELECT * FROM city");
    return data[0];
  }
  async get(id) {
    const con = connectionDb.promise();
    const data = await con.query("SELECT * FROM city WHERE CityID = ?", [id]);
    return data[0];
  }
  async findByName(city) {
    const con = connectionDb.promise();
    const data = await con.query("SELECT * FROM city WHERE City_Name = ?", [
      city,
    ]);
    return data[0];
  }
}
module.exports = CityModel;
