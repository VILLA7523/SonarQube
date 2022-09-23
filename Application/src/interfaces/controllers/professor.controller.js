const express = require("express");
const router = express.Router();
const PersonModel = require("../../domain/models/person.model");
const personDb = new PersonModel();
const data = require("../../domain/models/login.model");
const loginDb = new data();
const ProfessorModel = require("../../domain/models/professor.model");
const professorDb = new ProfessorModel();
const AttendanceModel = require("../../domain/models/attendance.model");
const attendanceDb = new AttendanceModel();
const InscriptionModel = require("../../domain/models/inscription.model");
const inscriptionDb = new InscriptionModel();
const CourseModel = require("../../domain/models/course.model");
const courseDb = new CourseModel();
const CourseStudentsModel = require("../../domain/models/course_student.model");
const courseStudentsDb = new CourseStudentsModel();
const SheduleModel = require("../../domain/models/shedule.model");
const sheduleDb = new SheduleModel();

const ProfessorService = require("../../aplication/services/professor.service");
const ProfessorRepository = require("../../repository/professor.repository");

const InscriptionService = require("../../aplication/services/inscription.service");
const InscriptionRepository = require("../../repository/inscription.repository");

const SheduleService = require("../../aplication/services/shedule.service");
const SheduleRepository = require("../../repository/shedule.repository");

const CourseService = require("../../aplication/services/course.service");
const CourseRepository = require("../../repository/course.repository");

const PersonService = require("../../aplication/services/person.service");
const PersonRepository = require("../../repository/person.repository");

const LoginService = require("../../aplication/services/login.service");
const LoginRepository = require("../../repository/login.repository");

const CourseStudentsService = require("../../aplication/services/courseStudents.service");
const CourseStudentsRepository = require("../../repository/courseStudents.repository");

const AttendanceService = require("../../aplication/services/attendance.service");
const AttendanceRepository = require("../../repository/attendance.repository");

class ProfessorController {
  async getAll() {
    const professorRepository = new ProfessorRepository(professorDb);
    const professorService = new ProfessorService(
      professorRepository
    );
    const data = await professorService
      .getAll()
      .catch((err) => {
      console.log("Professor Controller Error", err);
      return null;
    });
    return data;
  }

  async findBydCode(code) {
    const professorRepository = new ProfessorRepository(professorDb);
    const professorService = new ProfessorService(
      professorRepository
    );
    const result = professorService.findBydCode(code);
    const data = await result.catch((err) => {
      console.log("Professor Controller Error", err);
      return null;
    });
    return data;
  }

  //Se vincula el estudiante con el curso
  async studentInscription(StudentID, CourseID) {
    const inscriptionRepository = new InscriptionRepository(
      inscriptionDb
    );
    const inscriptionService = new InscriptionService(
      inscriptionRepository
    );

    const data = await inscriptionService
      .create({ StudentID, CourseID })
      .catch((err) => {
        console.log("Professor Controller Error", err);
        return null;
      });
    console.log(data.insertId);
    if (data.insertId) {
      const courseRepository = new CourseRepository(courseDb);
      const courseService = new CourseService(courseRepository);
      const dataCourseUpdate = await courseService
        .updateCantEstIn(CourseID)
        .catch((err) => {
          console.error("Professor Controller Error", err);
          return null;
        });

      console.log(dataCourseUpdate);
    }

    return data;
  }

  //Se crea el horario
  async createSchedule(Day, Start, Finish, CourseID) {
    const sheduleRepository = new SheduleRepository(sheduleDb);
    const sheduleService = new SheduleService(
      sheduleRepository
    );
    const result = sheduleService.create({
      Day,
      Start,
      Finish,
      CourseID,
    });
    const data = await result.catch((err) => {
      console.log("Professor Controller Error", err);
      return null;
    });
    return data;
  }

  //Se obtiene el horario
  async getSchedule(CourseID) {
    const sheduleRepository = new SheduleRepository(sheduleDb);
    const sheduleService = new SheduleService(
      sheduleRepository
    );
    const result = sheduleService.get(CourseID);
    const data = await result.catch((err) => {
      console.log("Professor Controller Error Get Horario ", err);
      return null;
    });
    return data;
  }

  //Se elimina un horario
  async deleteSchedule(id) {
    const sheduleRepository = new SheduleRepository(sheduleDb);
    const scheduleService = new SheduleService(sheduleRepository);

    const result = scheduleService.delete(id);
    const data = await result.catch((err) => {
      console.log("Professor Controller Error", err);
      return null;
    });
    return data;
  }

  //El profesor crea un curso
  async createCourse(Course_Name, SectionID, TypeID, ProfessorID, Semestre) {
    const courseRepository = new CourseRepository(courseDb);
    const courseService = new CourseService(courseRepository);
    const result = courseService.create({
      Course_Name,
      SectionID,
      TypeID,
      ProfessorID,
      Semestre,
    });
    const data = await result.catch((err) => {
      console.log("Professor Controller Error", err);
      return null;
    });

    return data;
  }

  async register(obj) {
    const personRepository = new PersonRepository(personDb);
    const personService = new PersonService(personRepository);

    const professorRepository = new ProfessorRepository(professorDb);
    const professorService = new ProfessorService(professorRepository);

    const loginRepository = new LoginRepository(loginDb);
    const loginService = new LoginService(loginRepository);

    const personId = await personService
      .create(obj)
      .catch((err) => {
      console.error("Professor Controller Error", err);
      return null;
    });

    obj.personId = personId;

    const dataProfessor = await professorService
      .create(obj)
      .catch((err) => {
      console.error("Professor Controller Error ", err);
      return null;
    });

    if(dataProfessor) {
        const dataLogin = await loginService
        .create(obj)
        .catch((err) => {
        console.error("Professor Controller Error", err);
        return null;
      });
      return dataLogin;
    }
    return null;
  }


  async login(email, password) {
    const loginRepository = new LoginRepository(loginDb);
    const loginService = new LoginService(loginRepository);
    const resulLogin = loginService.authenticate(email, password);
    const dataLogin = await resulLogin.catch((err) => {
      console.log("Professor Controller Error", err);
      return null;
    });
    return dataLogin;
  }
  async getAllCourses(id) {
    const courseRepository = new CourseRepository(courseDb);
    const courseService = new CourseService(courseRepository);

    const resultCourse = await courseService
      .findByIdProfessor(id)
      .catch((err) => {
        console.log("Professor Controller Error", err);
        return null;
      });
    return resultCourse;
  }
  async getProfessorToCourse(token) {
    const professorRepository = new ProfessorRepository(professorDb);
    const professorService = new ProfessorService(
      professorRepository
    );

    const resultProfessor = professorService.findByDNI(token);
    const dataProfessor = await resultProfessor.catch((err) => {
      console.log("Professor Controller Error", err);
      return null;
    });
    return dataProfessor;
  }
  async getStudentsOfCourses(token) {
    const courseStudentsRepository = new CourseStudentsRepository(
      courseStudentsDb
    );
    const courseStudentsService = new CourseStudentsService(
      courseStudentsRepository
    );

    const resultStudentsCourse =
      courseStudentsService.studentsForCourse(token);
    const dataStudentsCourse = await resultStudentsCourse.catch((err) => {
      console.log("Professor Controller Error", err);
      return null;
    });
    return dataStudentsCourse;
  }
  async deleteCourse(id) {
    const courseRepository = new CourseRepository(courseDb);
    const courseService = new CourseService(courseRepository);

    const result = courseService.delete(id);
    const data = await result.catch((err) => {
      console.log("Professor Controller Error", err);
      return null;
    });
    return data;
  } 
  async getCourse(id) {
    const courseRepository = new CourseRepository(courseDb);
    const courseService = new CourseService(courseRepository);

    const result = courseService.get(id);
    const data = await result.catch((err) => {
      console.log("Professor Controller Error", err);
      return null;
    });
    return data;
  }
  async updateCourse(name, section, type, semestre, id) {
    const courseRepository = new CourseRepository(courseDb);
    const courseService = new CourseService(courseRepository);

    const result = courseService.update({
      name,
      section,
      type,
      semestre,
      id,
    });
    const data = await result.catch((err) => {
      console.log("Professor Controller Error", err);
      return null;
    });
    return data;
  }
  //Asistencias
  async getByStudentIdCourseId(CourseID , StudentID) {
    const attendanceRepository = new AttendanceRepository(attendanceDb);
    const attendanceService = new AttendanceService(attendanceRepository);

    const dataAttendance = await attendanceService
      .getByStudentIdCourseId(CourseID , StudentID)
      .catch((err) => {
        console.error("PROFESSORCONTROLLER - error al obtener asistencia por curso" , err);
        return null;
      })
      return dataAttendance;
  }
  async getByCourseId(CourseID, Fecha) {
    const attendanceRepository = new AttendanceRepository(attendanceDb);
    const attendanceService = new AttendanceService(attendanceRepository);
    const dataAttendance = await attendanceService
      .getByCourseId(CourseID , Fecha)
      .catch((err) => {
        console.error("PROFESSORCONTROLLER - error al obtener asistencia por curso" , err);
        return null;
      })
      return dataAttendance;
  }
  async getDateByCourseId(CourseID) {
    const attendanceRepository = new AttendanceRepository(attendanceDb);
    const attendanceService = new AttendanceService(attendanceRepository);
    const dataAttendance = await attendanceService
      .getDateByCourseId(CourseID)
      .catch((err) => {
        console.error("ProfessorController - error al obtener asistencia por curso" , err);
        return null;
      })
      return dataAttendance;
  }
}

module.exports = ProfessorController;
