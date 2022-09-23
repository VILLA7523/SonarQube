const BaseRepository = require("./base.repository");

class PersonRepository extends BaseRepository {
  constructor(personDb) {
    super(personDb);
  }
}

module.exports = PersonRepository;
