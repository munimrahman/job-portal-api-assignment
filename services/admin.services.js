const User = require("../models/User");

exports.getAllCandidatesService = async () => {
  const candidates = await User.find({ role: "candidate" });
  const candidatesCount = await User.countDocuments({ role: "candidate" });
  return { candidates, candidatesCount };
};

exports.getCandidateByIdService = async (candidateId) => {
  const candidate = await User.findById(candidateId);
  return candidate;
};

exports.getAllHiringManagersService = async () => {
  const hiringManagers = await User.find({ role: "hiring-manager" });
  const hiringManagersCount = await User.countDocuments({
    role: "hiring-manager",
  });
  return { hiringManagers, hiringManagersCount };
};

exports.getHiringManagerByIdService = async (hiringManagerId) => {
  const hiringManager = await User.findById(hiringManagerId);
  return hiringManager;
};

exports.updateUserService = async (userId, updatedData) => {
  const updatedUser = await User.updateOne({ _id: userId }, updatedData, {
    runValidators: true,
  });
};
