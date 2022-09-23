const express = require("express");
const router = express.Router();
const connectionDb = require("../../config/dbconnections");
const tools = require("../../libs/tools");
class LoginModel {
  async create({ Email, Password, idDNI }) {
    const con = connectionDb.promise();
    const data = await con.query(
      "INSERT INTO login (Email_Address,Password,IMEI , ID , Role) VALUES (?,?,?,?,?)",
      [Email, tools.toHash(Password), null, idDNI, 1]
    );
    return data[0];
  }
  async getAll() {
    const con = connectionDb.promise();
    const data = await con.query("SELECT * FROM login");
    return data[0];
  }
  async authenticate(email, password) {
    const con = connectionDb.promise();
    const data = await con.query(
      "SELECT * FROM login WHERE Email_Address = ?",
      [email]
    );
    // console.log("AQUI VA LA DATA PARA EL COMPARE HASH", data)
    if (tools.compareHash(password, data[0][0].Password)) {
      return { status: "ok", id: data[0][0].ID };
    }
    return { status: "error" };
  }
}

module.exports = LoginModel;
