const BaseService = require("./base.service");

class CourseStudentsService extends BaseService {
  constructor(CourseStudentsRepository) {
    super(CourseStudentsRepository);
    this._CourseStudentsRepository = CourseStudentsRepository;
  }
  async studentsForCourse(token) {
    if (!token) {
      const error = new Error();
      error.status = 400;
      error.message = "token parameter is missing";
      throw error;
    }

    const entity = await this.repository.studentsForCourse(token);

    if (!entity) {
      const error = new Error();
      error.status = 400;
      error.message = "Student not found";
      throw error;
    }
    return entity;
  }
}

module.exports = CourseStudentsService;
