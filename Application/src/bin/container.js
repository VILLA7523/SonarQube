const app = require("../app");
const { createContainer, asClass, asValue, asFunction } = require("awilix");

const CityService = require("../aplication/services/city.service");

const routes = require("./interfaces/routes");
const indexRouter = require("./interfaces/routes/index");
const usersRouter = require("./interfaces/routes/users");
const apiRouter = require("./interfaces/routes/api");

const CityModel = require("../domain/models/city.model");
const CityRepository = require("../domain/repository/city.repository");

const container = createContainer();
container
  .register({ CityService: asClass(CityService).singleton() })
  .register({ indedxRouter: asfunction(indexRouter).singleton() })
  .register({ CityModel: asValue(CityModel) })
  .register({ CityRepository: asClass(CityRepository).singleton() });

module.exports = container;
