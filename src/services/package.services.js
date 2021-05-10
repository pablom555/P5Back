const Package = require("../models/package");

async function savePackage(packageData) {
  const package = new Package(packageData);
  return package.save();
}

async function query(filter = {}) {
  return Package.find(filter);
}

async function findByID(id) {
  return Package.findById(id);
}

async function deletePackagesByPassenger(id) {
  return Package.deleteMany({ passenger: id });
}

module.exports = {
  savePackage,
  query,
  findByID,
  deletePackagesByPassenger
};
