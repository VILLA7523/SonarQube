const express = require("express");
const router = express.Router();

const VerifyModel = require("../../domain/models/verify.model");
const verifyDb = new VerifyModel();

const CityModel = require("../../domain/models/city.model");
const cityDb = new CityModel();

const SectionModel = require("../../domain/models/section.model");
const sectionDb = new SectionModel();

const TypeModel = require("../../domain/models/type.model");
const typeDb = new TypeModel();

const PersonModel = require("../../domain/models/person.model");
const personDb = new PersonModel();

const CourseModel = require("../../domain/models/course.model");
const courseDb = new CourseModel();

const CityService = require("../../aplication/services/city.service");
const CityRepository = require("../../repository/city.repository");

const TypeService = require("../../aplication/services/type.service");
const TypeRepository = require("../../repository/type.repository");

const SectionService = require("../../aplication/services/type.service");
const SectionRepository = require("../../repository/type.repository");

class DataController {
  async getAllPerson() {
    const instancePersonRepository = new TypeRepository(personDb);
    const instancePersonService = new TypeService(instancePersonRepository);
    const result = instancePersonService.getAll();
    const data = await result.catch((err) => {
      console.log("Data Controller Error", err);
      return null;
    });
    return data;
  }

  async getAllVerify() {
    const instanceVerifyRepository = new VerifyRepository(personDb);
    const instanceVerifyService = new VerifyService(instanceVerifyRepository);
    const result = instanceVerifyService.getAll();
    const data = await result.catch((err) => {
      console.log("Data Controller Error", err);
      return null;
    });
    return data;
  }

  async getDataVerifyByCui(cui) {
    const result = verifyDb.findCui(cui);
    const data = await result.catch((err) => {
      console.log("Data Controller Error", err);
      return null;
    });
    return data;
  }

  async getAllCities() {
    const instanceCityRepository = new CityRepository(cityDb);
    const instanceCityService = new CityService(instanceCityRepository);
    const data = await instanceCityService.getAll().catch((err) => {
      console.log("Data Controller Error", err);
      return null;
    });
    return data;
  }

  async getAllType() {
    const instanceTypeRepository = new TypeRepository(typeDb);
    const instanceTypeService = new TypeService(instanceTypeRepository);
    const data = await instanceTypeService.getAll().catch((err) => {
      console.log("Data Controller Error", err);
      return null;
    });
    return data;
  }

  async getAllSection() {
    const instanceSectionRepository = new SectionRepository(sectionDb);
    const instanceSectionService = new SectionService(
      instanceSectionRepository
    );
    const result = instanceSectionService.getAll();
    const data = await result.catch((err) => {
      console.log("Data Controller Error", err);
      return null;
    });
    return data;
  }

  async findCityByName(name) {
    const instanceCityRepository = new CityRepository(cityDb);
    const instanceCityService = new CityService(instanceCityRepository);
    const result = instanceCityService.findByName(name);
    const data = await result.catch((err) => {
      console.log("Data Controller Error", err);
      return null;
    });
    return data;
  }

  async findCityById(id) {
    const instanceCityRepository = new CityRepository(cityDb);
    const instanceCityService = new CityService(instanceCityRepository);
    const result = instanceCityService.get(id);
    const data = await result.catch((err) => {
      console.log("Data Controller Error", err);
      return null;
    });
    return data;
  }

  async getAllCourses() {
    const instanceCoursesRepository = new CoursesRepository(CoursesDb);
    const instanceCoursesService = new CoursesService(
      instanceCoursesRepository
    );
    const result = instanceCoursesService.getAll();
    const data = await result.catch((err) => {
      console.log("Data Controller Error", err);
      return null;
    });
    return data;
  }

  async findCourseById(id) {
    const instanceCoursesRepository = new CoursesRepository(CoursesDb);
    const instanceCoursesService = new CoursesService(
      instanceCoursesRepository
    );
    const result = instanceCoursesService.get(id);
    const data = await result.catch((err) => {
      console.log("Data Controller Error", err);
      return null;
    });
    return data;
  }

  async findCourseByName(name) {
    const instanceCoursesRepository = new CoursesRepository(CoursesDb);
    const instanceCoursesService = new CoursesService(
      instanceCoursesRepository
    );
    const result = instanceCoursesService.findByName(name);
    const data = await result.catch((err) => {
      console.log("Data Controller Error", err);
      return null;
    });
    return data;
  }
}

module.exports = DataController;
