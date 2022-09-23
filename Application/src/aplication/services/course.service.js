const BaseService = require("./base.service");

class CourseService extends BaseService {
  constructor(CourseRepository) {
    super(CourseRepository);
    this._CourseRepository = CourseRepository;
  }

  async findByIdProfessor(id) {
    if (!id) {
      const error = new Error();
      error.status = 400;
      error.message = "Email or password missing";
      throw error;
    }

    const entity = await this.repository.findByIdProfessor(id);

    if (!entity) {
      const error = new Error();
      error.status = 400;
      error.message = "Failed authentication";
      throw error;
    }
    return entity;
  }
  //si es true aumenta , si es fals disminuye

  async updateCantEstIn(id) {
    if (!id) {
      const error = new Error();
      error.status = 400;
      error.message = "Parametro id debe ser enviado";
      throw error;
    }

    const entity = await this.repository.updateCantEstIn(id);

    if (!entity) {
      const error = new Error();
      error.status = 400;
      error.message = "Entidad no encontrada";
      throw error;
    }
    return entity;
  }

  async updateCantEstDe(id) {
    if (!id) {
      const error = new Error();
      error.status = 400;
      error.message = "Parametro id debe ser enviado";
      throw error;
    }

    const entity = await this.repository.updateCantEstDe(id);

    if (!entity) {
      const error = new Error();
      error.status = 400;
      error.message = "Entidad no encontrada";
      throw error;
    }
    return entity;
  }
}

module.exports = CourseService;
