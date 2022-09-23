const BaseService = require("./base.service");

class SheduleService extends BaseService {
  constructor(SheduleRepository) {
    super(SheduleRepository);
    this._SheduleRepository = SheduleRepository;
  }
}

module.exports = SheduleService;
