const express = require("express");
const router = express.Router();
const connectionDb = require("../../config/dbconnections");

class AttendanceModel {
  // async create({ AttendanceId, StudentID, ProfessorID, CourseID }) {
  //   const con = connectionDb.promise();
  //   const data = await con.query(
  //     "INSERT INTO curse_attendances (AttendanceId,StudentID,ProfessorID,CourseID) VALUES (?,?,?,?)",
  //     [AttendanceId, StudentID, ProfessorID, CourseID]
  //   );
  //   return data[0];
  // }
  async create() {
    const dateToday = new Date();
    const score = 3;
    const con = connectionDb.promise();
    const data = await con.query(
      "INSERT INTO attendances (Date,Score) VALUES (?,?)",
      [dateToday, score]
    );
    return data[0];
  }
  async getByStudentIdCourseId(CourseID , StudentID) {
    const con = connectionDb.promise();
    const data = await con.query(
      "SELECT * attendances where CourseID = ? and StudentID = $2",
      [CourseID , StudentID]
    );
    console.log(data[0]);
    return data[0];
  }

  async getByCourseId(CourseID , Fecha) {
    const con = connectionDb.promise();
    const data = await con.query(
      "SELECT DATE_FORMAT(a.Date, '%T') AS hora , a.score , a.StudentID, p.First_Name, p.Last_Name FROM attendances a , student s, person p WHERE a.CourseID = ? AND a.StudentID = s.StudentID AND CAST(a.Date as DATE) = ? AND s.PersonID = p.PersonID",
       [CourseID , Fecha]
    ).catch((err) => {
       console.error("error en la base de datos" , err);
    });
    return data[0];
  }

  async getDateByCourseId(CourseID) {
    const con = connectionDb.promise();
    const data = await con.query(
      "SELECT c.NumEst - count(a.AttendanceID) AS faltas, count(a.AttendanceID) AS quantity, DATE_FORMAT(a.Date, '%d %b %Y') AS fecha, DATE_FORMAT(a.Date, '%Y-%m-%d') AS sinFmto , c.NumEst FROM attendances a, course c WHERE a.CourseID = ? AND a.CourseID = c.CourseID GROUP BY CAST(DATE AS DATE) ORDER BY Date DESC",
      [CourseID]
    );
    return data[0];
  }
}
module.exports = AttendanceModel;
