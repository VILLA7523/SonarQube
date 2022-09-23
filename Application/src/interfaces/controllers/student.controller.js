const express = require("express");
const router = express.Router();
const LoginModel = require("../../domain/models/login.model");
const loginDb = new LoginModel();
const VerifyModel = require("../../domain/models/verify.model");
const verifyDb = new VerifyModel();
const StudentModel = require("../../domain/models/student.model");
const studentDb = new StudentModel();
const PersonModel = require("../../domain/models/person.model");
const personDb = new PersonModel();
const InscriptionModel = require("../../domain/models/inscription.model");
const inscriptionDb = new InscriptionModel();
const AttendanceModel = require("../../domain/models/attendance.model");
const attendaceDb = new AttendanceModel();
const CurseAttendanceModel = require("../../domain/models/course_attendance.model");
const curse_attendanceDb = new CurseAttendanceModel();
const CourseModel = require("../../domain/models/course.model");
const courseDb = new CourseModel();

const CourseService = require("../../aplication/services/course.service");
const CourseRepository = require("../../repository/course.repository");

const InscriptionService = require("../../aplication/services/inscription.service");
const InscriptionRepository = require("../../repository/inscription.repository");

class StudentController {
  async register({
    First_Name,
    Last_Name,
    Email,
    DNI,
    Home_Phone,
    Mobile_Phone,
    CityID,
    StudentID,
    Career,
    Faculty,
    Password,
    IMEI
  }) {
    const result = personDb.create(
      First_Name,
      Last_Name,
      Email,
      DNI,
      Home_Phone,
      Mobile_Phone,
      CityID
    );
    const data = await result.catch((err) => {
      console.log("Student Controller Error", err);
      return null;
    });

    const dataStudent = await studentDb.create(
      StudentID,
      Career,
      Faculty,
      data.insertId
    ).catch((err) => {
      console.log("Student Controller Error", err);
      return null;
    });

    if(dataStudent){
      const dataLogin = await loginDb
      .create(Email, Password, IMEI, StudentID, 2)
      .catch((err) => {
        console.error("Student Controller Error", err);
        return null;
      });
      return dataLogin;
    }
    return null;
  }

  async login(email, password) {
    const result = loginDb.authenticate(email, password);
    const data = await result.catch((err) => {
      console.log("Student Controller Error", err);
      return null;
    });
    return data;
  }

  async getAll() {
    const result = studentDb.getAll();
    const data = await result.catch((err) => {
      console.log("Student Controller Error", err);
      return null;
    });
    return data;
  }

  async findBydCui(cui) {
    const result = studentDb.findByCui(cui);
    const data = await result.catch((err) => {
      console.log("Student Controller Error", err);
      return null;
    });
    if (data != null) {
      const resultCourses = inscriptionDb.findByCui(cui);
      const dataCourses = await resultCourses.catch((err) => {
        console.log("Student Controller Error", err);
        return null;
      });

      return { Alumno: data[0], Cursos: dataCourses };
    }
    return { Alumno: null, Cursos: null };
  }

  async attendance(StudentID, ProfessorID, CourseID) {
    const result = attendaceDb.create();
    const data = await result.catch((err) => {
      console.log("Student Controller Error", err);
      return null;
    });

    if (data != null) {
      const resultCurseAttendance = curse_attendanceDb.create(
        data.insertId,
        StudentID,
        ProfessorID,
        CourseID
      );
      const dataCurseAttedance = await resultCurseAttendance.catch((err) => {
        console.log("Student Controller Error", err);
        return null;
      });
      if (dataCurseAttedance != null) {
        return { asistencia: "ok" };
      }
    }
    return { asistencia: "error" };
  }
  async findByIdCourse(id) {
    const result = inscriptionDb.findByCourse(id);
    const data = await result.catch((err) => {
      console.log("Student Controller Error find by Course", err);
      return null;
    });
    return data;
  }

  async deleteById(id, StudentId) {
    const inscriptionRepository = new InscriptionRepository(inscriptionDb);
    const inscriptionService = new InscriptionService(inscriptionRepository);
    const courseRepository = new CourseRepository(courseDb);
    const courseService = new CourseService(courseRepository);

    const data = await inscriptionService
      .deleteInscription(id, StudentId)
      .catch((err) => {
        console.log("Studentt Controller Error", err);
        return null;
      });

    if(data) {
      const dataCourseUpdate = await courseService
      .updateCantEstDe(id)
      .catch((err) => {
        console.error("Student Controller Error", err);
        return null;
      });

      if(!dataCourseUpdate) return null;
      return data;
    }
    return null;
  }
}

module.exports = StudentController;
