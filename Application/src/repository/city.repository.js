const BaseRepository = require("./base.repository");

class CityRepository extends BaseRepository {
  constructor(CityDb) {
    super(CityDb);
  }

  async getAllWithoutPagination() {
    return this.model.find();
  }
}

module.exports = CityRepository;
