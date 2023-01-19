const adminServices = require("../services/admin.services");

exports.getAllCandidates = async (req, res, next) => {
  try {
    const result = await adminServices.getAllCandidatesService();
    res.status(200).send({
      success: true,
      data: {
        count: result.candidatesCount,
        candidates: result.candidates,
      },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

exports.getCandidateById = async (req, res, next) => {
  try {
    const candidate = await adminServices.getCandidateByIdService(
      req.params.id
    );
    res.status(200).send({
      success: true,
      data: candidate,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllHiringManagers = async (req, res, next) => {
  try {
    const result = await adminServices.getAllHiringManagersService();
    res.status(200).send({
      success: true,
      data: {
        count: result.hiringManagersCount,
        hiringManagers: result.hiringManagers,
      },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

exports.getHiringManagerById = async (req, res, next) => {
  try {
    const hiringManager = await adminServices.getHiringManagerByIdService(
      req.params.id
    );
    res.status(200).send({
      success: true,
      data: hiringManager,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const result = await adminServices.updateUserService(
      req.params.id,
      req.body
    );
    res.status(200).send({
      success: true,
      message: "User successfully updated",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Can not update user",
      error: error.message,
    });
  }
};
