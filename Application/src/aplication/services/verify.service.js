const BaseService = require("./base.service");

class VerifyService extends BaseService {
  constructor(VerifyRepository) {
    super(VerifyRepository);
    this._VerifyRepository = VerifyRepository;
  }
}

module.exports = VerifyService;
