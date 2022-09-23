const express = require("express");
const router = express.Router();
const connectionDb = require("../../config/dbconnections");

class VerifyModel {
  async getAll() {
    const con = connectionDb.promise();
    const data = await con.query("SELECT * FROM verify");
    return data[0];
  }
  async findCui(cui) {
    const con = connectionDb.promise();
    const data = await con.query("SELECT * FROM verify WHERE CUI = ?", [cui]);
    return data[0];
  }
}
module.exports = VerifyModel;
