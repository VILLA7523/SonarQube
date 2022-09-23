const express = require("express");
const router = express.Router();
const connectionDb = require("../../config/dbconnections");

class SectionModel {
  async getAll() {
    const con = connectionDb.promise();
    const data = await con.query("SELECT * FROM section");
    return data[0];
  }
}

module.exports = SectionModel;
