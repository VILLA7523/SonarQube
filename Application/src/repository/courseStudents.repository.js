const BaseRepository = require("./base.repository");

class CourseStudentsRepository extends BaseRepository {
  constructor(CourseStudentsDb) {
    super(CourseStudentsDb);
  }
  async studentsForCourse(token) {
    return this.model.studentsForCourse(token);
  }
}

module.exports = CourseStudentsRepository;
