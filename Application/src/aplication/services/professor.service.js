const BaseService = require("./base.service");

class ProfessorService extends BaseService {
  constructor(ProfessorRepository) {
    super(ProfessorRepository);
    this._ProfessorRepository = ProfessorRepository;
  }
}

module.exports = ProfessorService;
