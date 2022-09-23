const express = require("express");
const router = express.Router();
const connectionDb = require("../../config/dbconnections");

class CurseAttendanceModel {
  async create({ AttendanceId, StudentID, ProfessorID, CourseID }) {
    const con = connectionDb.promise();
    const data = await con.query(
      "INSERT INTO curse_attendances (AttendanceId,StudentID,ProfessorID,CourseID) VALUES (?,?,?,?)",
      [AttendanceId, StudentID, ProfessorID, CourseID]
    );
    return data[0];
  }
}
module.exports = CurseAttendanceModel;