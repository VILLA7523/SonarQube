const BaseService = require("./base.service");

class PersonService extends BaseService {
  constructor(PersonRepository) {
    super(PersonRepository);
    this._PersonRepository = PersonRepository;
  }
}

module.exports = PersonService;
