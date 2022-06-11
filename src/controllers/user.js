const user = require("../../models/user");

exports.addUsers = async (req, res) => {
  try {
    await user.create(req.body);
    res.send({
      status: "Success",
      message: "Add user completed",
    });
  } catch (error) {
    console.log(err);
    res.send({
      status: "failed",
      message: " Server Error",
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    let users = await user.find();
    res.send({
      status: "Success",
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: " Server Error",
    });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    await user.updateOne(
      { _id: id },
      {
        name: req.body.name,
      }
    );
    res.send({
      status: "Success",
      message: "Edit Data Completed",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: " Server Error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await user.deleteOne({ _id: id });
    res.send({
      status: "Success",
      message: "Delete Completed",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: " Server Error",
    });
  }
};
