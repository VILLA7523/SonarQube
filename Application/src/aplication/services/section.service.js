const BaseService = require("./base.service");

class SectionService extends BaseService {
  constructor(SectionRepository) {
    super(SectionRepository);
    this._SectionRepository = SectionRepository;
  }
}

module.exports = SectionService;
