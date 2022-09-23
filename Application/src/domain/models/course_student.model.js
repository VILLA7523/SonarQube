const express = require("express");
const router = express.Router();
const connectionDb = require("../../config/dbconnections");

class CourseStudentsModel {
  
  async studentsForCourse(token) {
    const conextion = connectionDb.promise();
    const data = await conextion.query(
      "SELECT * FROM attendance.cursos_estudiantes INNER JOIN attendance.cursos_estudiantes ON cursos_estudiantes.IdStudent = attendance.student.StudentID WHERE attendance.cursos_estudiantes.ProfessorID = ?",
      [token]
    );
    return data[0];
  }
}
module.exports = CourseStudentsModel;
