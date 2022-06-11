const user = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // search account
    let oldUser = await user.findOne({ email });
    if (oldUser) {
      return res.send({
        error: {
          message: "Account already existed",
        },
      });
    }

    // hash password by bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create User
    const result = await user.create({
      name,
      email,
      password: hashedPassword,
      role: "CUSTOMER",
    });

    const payload = {
      id: result._id,
      name: result.name,
      email: result.email,
      role: result.role,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY);

    res.status(200).send({
      status: "Success",
      data: {
        user: {
          payload,
          token,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await user.findOne({ email });
    if (!oldUser) {
      return res.status(400).send({
        error: {
          message: `Account doesn't existed`,
        },
      });
    }
    //compare password
    const passwordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!passwordCorrect) {
      return res.status(400).send({
        error: {
          message: `Email or Password is not Matching`,
        },
      });
    }

    const payload = {
      email: oldUser.email,
      name: oldUser.name,
      id: oldUser._id,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY);

    res.status(200).send({
      data: {
        user: {
          payload,
          token,
        },
      },
    });

    // const token = jwt.sign(payload, process.env.SECRET_KEY);
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const id = req.user._id;

    const oldUser = await user.findOne({ _id: id });
    if (!oldUser) {
      return res.status(400).send({
        status: "Failed",
      });
    }
    const payload = {
      id: oldUser._id,
      name: oldUser.name,
      email: oldUser.email,
      role: oldUser.role,
    };
    res.send({
      status: "Success",
      data: {
        user: {
          payload,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};
