const BaseRepository = require("./base.repository");

class VerifyRepository extends BaseRepository {
  constructor(VerifyDb) {
    super(VerifyDb);
  }

  async getAllWithoutPagination() {
    return this.model.find();
  }
}

module.exports = VerifyRepository;
