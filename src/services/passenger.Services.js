const Passenger = require("../models/passenger");

async function savePassenger(passengerData) {
  const passenger = new Passenger(passengerData);
  return passenger.save();
}

async function queryOne(filter = {}) {
  return Passenger.findOne(filter).populate({path: 'packages'}).exec();
}

async function query(filter = {}) {
    return Passenger.find(filter).populate({path: 'packages'}).exec();;
  }

async function findByID(id) {
  return Passenger.findById(id).populate({path: 'packages'}).exec();
}

async function updatePassenger(id, package) {
  return Passenger.findByIdAndUpdate(id, { $push: { packages: package } }, { new: true });
}

async function deletePassenger(id) {
    return Passenger.deleteOne({ _id: id });
  }

module.exports = {
  savePassenger,
  queryOne,
  query,
  findByID,
  updatePassenger,
  deletePassenger
};
