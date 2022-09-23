const BaseRepository = require("./base.repository");

class TypeRepository extends BaseRepository {
  constructor(typeDb) {
    super(typeDb);
  }

  async getAllWithoutPagination() {
    return this.model.find();
  }
}

module.exports = TypeRepository;
