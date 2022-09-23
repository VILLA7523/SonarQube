const BaseRepository = require("./base.repository");

class ProfessorRepository extends BaseRepository {
  constructor(ProfessorDb) {
    super(ProfessorDb);
  }

}

module.exports = ProfessorRepository;
