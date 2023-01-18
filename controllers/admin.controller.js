const adminServices = require("../services/admin.services");

exports.getAllCandidates = async (req, res, next) => {
  const result = await adminServices.getAllCandidatesService();
  res.send(result);
};

exports.getCandidateById = async (req, res, next) => {
  const result = await adminServices.getCandidateByIdService();
  res.send(result);
};

exports.getAllHiringManagers = async (req, res, next) => {
  const result = await adminServices.getAllHiringManagersService();
  res.send(result);
};

exports.getHiringManagerById = async (req, res, next) => {
  const result = await adminServices.getHiringManagerByIdService();
  res.send(result);
};

exports.updateUser = async (req, res, next) => {
  const result = await adminServices.updateUserService();
  res.send(result);
};
