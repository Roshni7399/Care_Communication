import User from "../model/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Signup 
export const userSignup = async (req, res) => {
  const userAdd = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    role: req.body.role,
  });

  const data = await userAdd.save();
  res.send({
    status: "200",
    message: "Admin registered successfully",
    result: data,
  });
};

// Login
export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  // console.log(password);
  const result = await User.findOne({ email });
  if (!result) {
    res.send({
      status: false,
      message: "Invalid Credentials-Email is Incorrect !!!",
    });
  }

  const isValid = bcrypt.compare(password, result.password);
  // console.log(result.password);
  if (isValid) {
    let payload = {};
    payload._id = result._id;
    // console.log(result);
    jwt.sign(payload, "SECRET_KEY", { expiresIn: "24h" }, (err, token) => {
      res.send({
        status: true,
        message: "Successfully Login",
        token: token,
        role: result.role,
        result: result,
      });
    });
  } else {
    res.send({
      status: false,
      message: "Password is incorrect- Please enter correct password",
    });
  }
};

// get data by ID
export const getUserDataById = async (req, res) => {
  try {
    let dataid = await User.findOne({
      _id: mongoose.Types.ObjectId(req.query._id),
    });
    res.send({
      status: "200",
      message: "successfully getting data by id",
      result: dataid,
    });
  } catch (e) {
    throw e;
  }
};

// Update
export const updateUser = async (req, res) => {
  try {
    let jsondata = {};

    if (req.body.name) {
      jsondata.name = req.body.name;
    }
    if (req.body.location) {
      jsondata.location = req.body.location;
    }
    if (req.body.contact) {
      jsondata.contact = req.body.contact;
    }
    if (req.body.password) {
      jsondata.password = bcrypt.hashSync(req.body.password, 8);
    }
    if (req.file.filename) {
      jsondata.image = req.file.filename;
    }
    if (req.body.role) {
      jsondata.role = req.body.role;
    }
    console.log(req.body.password);
    console.log(req.body.email);

    User.updateOne(
      { email: req.body.email },
      { $set: jsondata },
      { new: true },
      (err, result) => {
        if (err) {
          res.send({ status: 404, message: "failed", result: err });
        } else {
          res.send({
            status: 200,
            message: "update successfully",
            result: result,
          });
        }
      }
    );
  } catch (e) {
    throw e;
  }
};
