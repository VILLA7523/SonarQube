const BaseRepository = require("./base.repository");

class LoginRepository extends BaseRepository {
  constructor(LoginDb) {
    super(LoginDb);
  }
  async getAllWithoutPagination() {
    return this.model.find();
  }

  async authenticate(email, password) {
    return this.model.authenticate(email, password);
  }
}

module.exports = LoginRepository;
