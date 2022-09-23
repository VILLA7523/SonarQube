const express = require("express");
const router = express.Router();
const connectionDb = require("../../config/dbconnections");

class SheduleModel {
  async getAll() {
    const con = connectionDb.promise();
    const data = await con.query("SELECT * FROM shedule");
    return data[0];
  }

  async create({ Day, Start, Finish, CourseID }) {
    const con = connectionDb.promise();
    const data = await con.query(
      "INSERT INTO schedule (Day,Start,Finish,CourseID) VALUES (?,?,?,?)",
      [Day, Start, Finish, CourseID]
    );
    return data[0];
  }

  async get(id) {
    const con = connectionDb.promise();
    const data = await con.query("SELECT * FROM schedule WHERE CourseID = ?", [
      id,
    ]);
    console.log("model", data);
    return data[0];
  }

  async delete(id) {
    const con = connectionDb.promise();
    const data = await con.query("DELETE FROM schedule WHERE ScheduleID = ?", [id]);
    return data[0];
  }
}

module.exports = SheduleModel;
