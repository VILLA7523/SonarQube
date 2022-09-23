const BaseRepository = require("./base.repository");

class AttendanceRepository extends BaseRepository {
  constructor(attendanceDb) {
    super(attendanceDb);
  }
  async  getByStudentIdCourseId(CourseID , StudentID) {
    return this.model.getByStudentIdCourseId(CourseID , StudentID);
  }

  async  getByCourseId(CourseID , Fecha) {
    return this.model.getByCourseId(CourseID , Fecha);
  }

  async  getDateByCourseId(CourseID) {
    return this.model.getDateByCourseId(CourseID);
  }
  

}

module.exports = AttendanceRepository;
