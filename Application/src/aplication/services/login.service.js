const BaseService = require("./base.service");

class LoginService extends BaseService {
  constructor(LoginRepository) {
    super(LoginRepository);
    this._LoginRepository = LoginRepository;
  }

  async authenticate(email, password) {
    if (!email || !password) {
      const error = new Error();
      error.status = 400;
      error.message = "Email or password missing";
      throw error;
    }

    const entity = await this.repository.authenticate(email, password);

    if (!entity) {
      const error = new Error();
      error.status = 400;
      error.message = "Failed authentication";
      throw error;
    }
    return entity;
  }
}

module.exports = LoginService;
