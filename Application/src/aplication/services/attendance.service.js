const BaseService = require("./base.service");

class AttendanceService extends BaseService {
  constructor(attendanceRepository) {
    super(attendanceRepository);
    this._attendanceRepository = attendanceRepository;
  }  
  
  async getByStudentIdCourseId(CourseID ,StudentID ) {  
    if (!CourseID && !StudentID) {
      const error = new Error();
      error.status = 400;
      error.message = "Es necesario proporcionar los identificadores";
      throw error;
    }
    const entity = await this.repository.getByStudentIdCourseId(CourseID , StudentID);
    if (!entity) {
      const error = new Error();
      error.status = 400;
      error.message = "Attendance no encontrado";
      throw error;
    }
    return entity;
  }

  async getByCourseId(CourseID , Fecha) {
    if (!CourseID && !Fecha) {
      const error = new Error();
      error.status = 400;
      error.message = "Es necesario proporcionar los identificadores";
    }
    const entity = await this.repository.getByCourseId(CourseID , Fecha);
    if (!entity) {
      const error = new Error();
      error.status = 400;
      error.message = "Attendance no encontrado";
      throw error;
    }
   return entity;
  }

  async getDateByCourseId(CourseID) {
    if(!CourseID) {
      error = new Error();
      error.status = 400;
      throw error;
    }
    const entity = await this.repository.getDateByCourseId(CourseID);  
    if(!entity) {
      const error = new Error();
      error.status = 400;
      error.message = "Attendance no encontrado";
      throw error;
    }
    return entity;
 }}
module.exports = AttendanceService;
