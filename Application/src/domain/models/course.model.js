const express = require("express");
const router = express.Router();
const connectionDb = require("../../config/dbconnections");

class CourseModel {
  async create({ Course_Name, SectionID, TypeID, ProfessorID, Semestre }) {
    const con = connectionDb.promise();
    const data = await con.query(
      "INSERT INTO course (Course_Name,SectionID,TypeID,ProfessorID,NumEst,Semestre) VALUES (?,?,?,?,?,?)",
      [Course_Name, SectionID, TypeID, ProfessorID, 0, Semestre]
    );

    console.log("error", data);
    return data[0];
  }

  async getAll() {
    const con = connectionDb.promise();
    const data = await con.query(
      "SELECT * FROM course INNER JOIN section ON course.SectionID = section.SectionID INNER JOIN type ON course.TypeID = type.TypeID"
    );
    return data[0];
  }
  async findByIdProfessor(id) {
    const con = connectionDb.promise();
    const data = await con.query(
      "SELECT * FROM course INNER JOIN section ON course.SectionID = section.SectionID INNER JOIN type ON course.TypeID = type.TypeID WHERE course.ProfessorID = ?",
      [id]
    );
    return data[0];
  }

  async DeleteById(id) {
    const con = connectionDb.promise();
    const data = await con.query(
      "DELETE FROM course INNER JOIN section ON course.SectionID = section.SectionID INNER JOIN type ON course.TypeID = type.TypeID WHERE course.courseID = ?",
      [id]
    );
    return data[0];
  }

  async get(id) {
    const con = connectionDb.promise();
    const data = await con.query(
      "SELECT * FROM course INNER JOIN section ON course.SectionID = section.SectionID INNER JOIN type ON course.TypeID = type.TypeID  WHERE course.CourseID = ?",
      [id]
    );
    return data[0][0];
  }

  async findByName(name) {
    const con = connectionDb.promise();
    const data = await con.query(
      "SELECT * FROM course INNER JOIN section ON course.SectionID = section.SectionID INNER JOIN type ON course.TypeID = type.TypeID  WHERE course.Course_Name = ?",
      [name]
    );
    return data[0];
  }

  async delete(id) {
    const con = connectionDb.promise();
    const data = await con.query("DELETE FROM course WHERE CourseID = ?", [id]);
    return data[0];
  }

  async update({ name, section, type, semestre, id }) {
    const con = connectionDb.promise();
    const data = await con.query(
      "UPDATE course SET Course_Name = ? , SectionId = ? , TypeID = ? , Semestre = ? WHERE CourseID = ?",
      [name, section, type, semestre, id]
    );
    return data[0];
  }

  async updateCantEstIn(id) {
    const con = connectionDb.promise();
    const data = await con.query(
      "UPDATE course SET NumEst = NumEst + 1 WHERE CourseID = ?",
      [id]
    );
    return data[0];
  }

  async updateCantEstDe(id) {
    const con = connectionDb.promise();
    const data = await con.query(
      "UPDATE course SET NumEst = NumEst - 1 WHERE CourseID = ?",
      [id]
    );
    return data[0];
  }
}

module.exports = CourseModel;
