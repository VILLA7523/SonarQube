const BaseService = require("./base.service");

class TypeService extends BaseService {
  constructor(TypeRepository) {
    super(TypeRepository);
    this._TypeRepository = TypeRepository;
  }
}

module.exports = TypeService;
