const express = require("express");
const router = express.Router();
const connectionDb = require("../../config/dbconnections");

class InscriptionModel {
  async getAll() {
    const con = connectionDb.promise();
    const data = await con.query("SELECT * FROM inscription");
    return data[0];
  }

  async create({ StudentID, CourseID }) {
    const con = connectionDb.promise();
    const data = await con.query(
      "INSERT INTO inscription (StudentID,CourseID) VALUES (?,?)",
      [StudentID, CourseID]
    );
    return data[0];
  }

  async findByCui(StudentID) {
    const con = connectionDb.promise();
    const data = await con.query(
      "SELECT * FROM inscription INNER JOIN course ON inscription.CourseID = course.CourseID INNER JOIN section ON course.SectionID = section.SectionID INNER JOIN type ON course.TypeID = type.TypeID INNER JOIN schedule ON course.ScheduleID = schedule.ScheduleID WHERE inscription.StudentID = ?",
      [StudentID]
    );
    return data[0];
  }

  async findByCourse(id) {
    const con = connectionDb.promise();
    const data = await con.query(
      "SELECT * FROM inscription INNER JOIN student ON inscription.StudentID = student.StudentID INNER JOIN person ON person.PersonID = student.PersonID WHERE inscription.CourseID = ?",
      [id]
    );
    console.log(data[0]);
    return data[0];
  }

  async deleteInscription(id, StudentId) {
    const con = connectionDb.promise();
    const data = await con.query(
      "DELETE FROM inscription WHERE inscription.CourseID = ? AND inscription.StudentID = ? ",
      [id, StudentId]
    );
    console.log(data[0]);
    return data[0];
  }
}
module.exports = InscriptionModel;
