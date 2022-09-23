const BaseService = require("./base.service");

class CityService extends BaseService {
  constructor(CityRepository) {
    super(CityRepository);
    this._cityRepository = CityRepository;
  }
}

module.exports = CityService;
