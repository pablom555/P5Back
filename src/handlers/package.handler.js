const PackageService = require("../services/package.services");
const PassengerService = require("../services/passenger.Services");
const { createJSONResponse } = require("../utils/utils");

const CANT_AVAILABLE_PACK = 3;

const getPassengers = async (request, h) => {
  try {
    const passengersDB = await PassengerService.query();

    if (!passengersDB.length)
      return h.response(createJSONResponse(true, "Passengers found successfully", { passengers: [] })).code(200);
    return h
      .response(createJSONResponse(true, "Passengers found successfully", { passengers: passengersDB }))
      .code(200);
  } catch (error) {
    return h.response(createJSONResponse(false, "Failed to find passengers", error.message)).code(500);
  }
};

const getPassengersByID = async (request, h) => {
  try {
    const passengersDB = await PassengerService.findByID(request.params.id);

    if (!passengersDB)
      return h.response(createJSONResponse(false, "There are not passengers", "Passengers not found")).code(404);

    return h
      .response(createJSONResponse(true, "Passengers found successfully", { passengers: passengersDB }))
      .code(200);
  } catch (error) {
    return h.response(createJSONResponse(false, "Failed to find passengers", error.message)).code(500);
  }
};

const deletePassenger = async (request, h) => {
  try {
    const passengersDB = await PassengerService.findByID(request.params.id);

    if (!passengersDB)
      return h.response(createJSONResponse(false, "There are not passengers", "Passengers not found")).code(404);

    const passengerDel = await PassengerService.deletePassenger(request.params.id);
    const packageDel = await PackageService.deletePackagesByPassenger(request.params.id);

    return h.response(createJSONResponse(true, "Passengers deleted successfully")).code(200);
  } catch (error) {
    return h.response(createJSONResponse(false, "Failed to find passengers", error.message)).code(500);
  }
};

const addPackage = async (request, h) => {
  try {
    const { documentNumber, passengerName, flightNumber, packageType, packageName } = request.payload;

    let passengerFound = await PassengerService.queryOne({ documentNumber, flightNumber });

    if (!passengerFound) {
      passengerFound = await PassengerService.savePassenger({ documentNumber, name: passengerName, flightNumber });
    }

    if (passengerFound.packages.length >= CANT_AVAILABLE_PACK)
      return h.response(createJSONResponse(true, "You already have 3 packages")).code(400);

    const packageSaved = await PackageService.savePackage({
      packageName,
      type: packageType,
      passenger: passengerFound._id,
    });
    const passengerSaved = await PassengerService.updatePassenger(passengerFound._id, packageSaved._id);

    return h.response(createJSONResponse(true, "Rate Created successfully", { passengerSaved })).code(201);
  } catch (error) {
    return h.response(createJSONResponse(false, "Bad Request", error.message)).code(500);
  }
};

module.exports = {
  getPassengers,
  getPassengersByID,
  addPackage,
  deletePassenger,
};
