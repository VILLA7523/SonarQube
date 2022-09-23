const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/student.controller");
const studentDb = new StudentController();
const DataController = require("../controllers/data.controller");
const dataDb = new DataController();
const ProfessorController = require("../controllers/professor.controller");
const professorDb = new ProfessorController();

router.get("/register", async function (req, res, next) {
  const city = await dataDb.getAllCities();
  console.log(city);
  res.render("register", { title: "Express", cities: city });
});

router.post("/checkcrearcurso", async function (req, res, next) {
  const token = req.cookies.tokenUser;
  console.log("token", token);
  const course = await professorDb.createCourse(
    req.body.nombre,
    req.body.seccion,
    req.body.tipo,
    token,
    req.body.semestre
  );
  console.log(course);
  res.redirect("/vercursos?msg=ok");
});

router.post("/checkupdatecurso/:id", async function (req, res, next) {
  const course = await professorDb.updateCourse(
    req.body.nombre,
    req.body.seccion,
    req.body.tipo,
    req.body.semestre,
    req.params.id
  );
  console.log(course);
  res.redirect("/vercursos");
});

router.get("/vercursos", async function (req, res, next) {
  const token = req.cookies.tokenUser;
  console.log("token", token);
  if (req.cookies.tokenUser) {
    const course = await professorDb.getAllCourses(token);
    console.log("courses ", course);
    res.render("TablaVerCurso", {
      title: "Express",
      Courses: course,
    });
  } else {
    res.redirect("/login");
  }
});

router.get("/vercalendario/:CourseID", async function (req, res, next) {
  const token = req.cookies.tokenUser;
  console.log("token", token);
  if (req.cookies.tokenUser) {
    const dataCalendar = await professorDb.getDateByCourseId(req.params.CourseID);
    console.log("asistencias ", dataCalendar);
    res.render("viewAttendancesDates", {
      title: "Express",
      id : req.params.CourseID,
      Calendar: dataCalendar,
    });
  } else {
    res.redirect("/login");
  }
});

router.get("/:CourseID/verasistencias/:Fecha", async function (req, res, next) {
  const token = req.cookies.tokenUser;
  if (token) {
    const dataStudents = await professorDb.getByCourseId(req.params.CourseID,req.params.Fecha);
    console.log("Estamos imprimiendo las asistencias ", dataStudents);
    res.render("viewAttendancesByCourse", {
      title: "Express",
      students: dataStudents,
      fecha: req.params.Fecha,
      asistencias : req.query.asistencias,
      faltas : req.query.faltas,
    });
  } else {
    res.redirect("/login");
  }
});

router.get("/crearcurso", async function (req, res, next) {
  const section = await dataDb.getAllSection();
  const type = await dataDb.getAllType();
  res.render("create", { sections: section, types: type });
});


router.get("/verhorario/:id/:name", async function (req, res, next) {
  const response = await professorDb.getSchedule(req.params.id);
  console.log("horarios " + req.params.id, response);
  res.render("horarios", {
    id: req.params.id,
    name: req.params.name,
    horarios: response,
  });
});


router.get("/viewAttendancesByCourse", async function (req, res, next) {
  res.render("viewAttendancesByCourse", { title: "Express" });
});

router.get("/viewAttendancesDates", async function (req, res, next) {
  res.render("viewAttendancesDates", { title: "Express" });
});


router.get("/verasistencias/:id/:name", async function (req, res, next) {
  const response = await professorDb.getSchedule(req.params.id);
  console.log("asistencias " + req.params.id, response);
  res.render("asistencias", {
    id: req.params.id,
    name: req.params.name,
    asistencias: response,
  });
});




router.post("/crearhorariochecked/:id/:name", async function (req, res, next) {
  const response = await professorDb.createSchedule(
    req.body.dia,
    req.body.hour1,
    req.body.hour2,
    req.params.id
  );
  console.log("Insertando horario ", response);
  res.redirect("/verhorario/" + req.params.id + "/" + req.params.name);
});

router.get("/login", function (req, res, next) {
  res.render("login", { title: "Express" });
});

router.get("/alumnos", async (req, res) => {
  const data = await studentDb.getAll();
  console.log("datas", data);
  res.render("index", { title: "Express" });
});

router.get("/panel", async (req, res) => {
  const token = req.cookies.tokenUser;
  console.log("token", token);
  if (req.cookies.tokenUser) {
    res.render("estadisticas", { nombre: req.params.nombre });
  } else {
    res.redirect("/login");
  }
});

router.get("/tabla/:id", async (req, res) => {
  const data = await studentDb.findByIdCourse(req.params.id);
  console.log("datas", data);
  res.render("TablaAlumnos", { students: data, id: req.params.id });
});

router.post("/agregaralumno/:id", async (req, res) => {
  const data = await professorDb.studentInscription(
    req.body.studentid,
    req.params.id
  );
  console.log("datas", data);
  res.redirect("/tabla/" + req.params.id);
});

router.get("/agregaralumnos", async (req, res) => {
  const data = await studentDb.getAll();
  console.log("datas", data);
  res.render("TablaAgregarAlumnos", { title: "Express" });
});

router.get("/estados", async (req, res) => {
  const data = await studentDb.getAll();
  console.log("datas", data);
  res.render("TablaEstadoEstudiantes", { title: "Express" });
});

router.get("/deletecourse/:id", async (req, res) => {
  const data = await professorDb.deleteCourse(req.params.id);
  console.log("datas", data);
  res.redirect("/vercursos");
});

router.get("/deleteschedule/:id/:id_schedule/:name", async (req, res) => {
  const data = await professorDb.deleteSchedule(req.params.id_schedule);
  console.log("datas", data);
  res.redirect("/verhorario/" + req.params.id + "/" + req.params.name);
});

router.get("/deletealumnos/:id/:id_alumno", async (req, res) => {
  const data = await studentDb.deleteById(req.params.id, req.params.id_alumno);
  console.log("datas", data);
  res.redirect("/tabla/" + req.params.id);
});

router.get("/modify/:id", async (req, res) => {
  const section = await dataDb.getAllSection();
  const type = await dataDb.getAllType();
  const data = await professorDb.getCourse(req.params.id);
  console.log("modify", data);
  res.render("modify", { course: data, sections: section, types: type });
});

//posts
router.post("/registercheck", async (req, res) => {

  let obj = new Object();

  obj.First_Name = req.body.nombre
  obj.Last_Name = req.body.apellidos
  obj.Email = req.body.correo
  obj.DNI = req.body.dni
  obj.Mobile_Phone = req.body.cel
  obj.CityID = req.body.ciudad
  obj.Department = req.body.dep
  obj.Password = req.body.contra
  obj.idDNI = req.body.iddni
  
  const professor = await professorDb.register(obj);
  if (professor.insertId > 0) res.redirect("/login?msg=ok");
  else res.redirect("/register?msg=err");

});

router.post("/loginchecked", async (req, res) => {
  const professor = await professorDb.login(req.body.correo, req.body.contra);
  console.log(professor);
  if (professor.status == "ok") {
    res.cookie("tokenUser", professor.id, { httpOnly: true });
    res.redirect("/panel");
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
