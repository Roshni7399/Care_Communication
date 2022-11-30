import User from "../model/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { SendEmail } from "../middleware/sendMail";
var generator = require("generate-password");

// Signup 
export const physicianSignup = async (req, res) => {
  // var pass = generator.generate({
  //   length: 10,
  //   numbers: true,
  // });
  // console.log(pass);

  const physicianAdd = new User({
    name: req.body.name,
    email: req.body.email,
    location: req.body.location,
    contact: req.body.contact,
    //password: bcrypt.hashSync(pass, 8),
    role: req.body.role,
    image: req.file.filename,
  });

  const data = await physicianAdd.save();
  const _id = data._id;
  const link = `http://localhost:3000/setup-page/${_id}&`;
  if (data) {
    SendEmail(
      "roshnimanmode07@gmail.com",
      req.body.email,
      `Hello ${physicianAdd.name}`,
      `Please Complete your SetUp  --
     click on link : ${link}
        `
    );

    res.send({
      status: "200",
      message: "Physician  registered successfully",
      result: data,
    });
  }
};

//  Login
export const physicianLogin = async (req, res) => {
  const { email, password, role } = req.body;

  const result = await User.findOne({ email, role });
  if (!result) {
    res.send({
      status: false,
      message: "Invalid Credentials-Email is Incorrect !!!",
    });
  }

  const isValid = bcrypt.compareSync(password, result.password);

  if (isValid) {
    let payload = {};
    payload._id = result._id;
    console.log(result);
    jwt.sign(payload, "SECRET_KEY", { expiresIn: "24h" }, (err, token) => {
      res.send({
        status: true,
        message: "Successfully  Physician Login",
        result: token,
      });
    });
  } else {
    res.send({
      status: false,
      message: "Password is incorrect- Please enter correct password",
    });
  }
};

//  List 
export const getPhysicianList = async (req, res) => {
  try {
    let dataid = await User.paginate(
      {
        $and: [
          { name: { $regex: req.body.name, $options: "i" } },
          { role: "3" },
        ],
      },
      {
        page: req.body.page,
        limit: req.body.limit,
      },
      (err, result) => {
        console.log(result);
        res.send({
          status: "200",
          message: "successfully getting list",
          result: result,
        });
      }
    );
  } catch (e) {
    throw e;
  }
};

//  Update
export const updatePhysician = async (req, res) => {
  try {
    let jsondata = {};

    if (req.body.name) {
      jsondata.name = req.body.name;
    }
    if (req.body.email) {
      jsondata.email = req.body.email;
    }
    if (req.body.location) {
      jsondata.location = req.body.location;
    }
    if (req.body.contact) {
      jsondata.contact = req.body.contact;
    }

    console.log(jsondata);
    User.updateOne(
      { _id: mongoose.Types.ObjectId(req.body._id) },
      { $set: jsondata },
      { new: true },
      (err, result) => {
        if (err) {
          res.send({ status: 404, message: "failed", result: err });
        } else {
          res.send({
            status: 200,
            message: "physician update successfully",
            result: result,
          });
        }
      }
    );
  } catch (e) {
    throw e;
  }
};

//  Delete
export const deletephysician = async (req, res) => {
  const { id } = req.params;

  const deleteStude = await User.deleteOne({
    _id: mongoose.Types.ObjectId(id),
  });

  res.send({
    status: true,
    message: "Deleted Successfully",
  });
};

// Count
export const Count = async (req, res) => {
  try {
    const countPhysician = await User.countDocuments({ role: "3" });
    const countNurse = await User.countDocuments({ role: "4" });
    res.send({
      status: true,
      message: "getting count Successfully",
      countPhysician: countPhysician,
      countNurse: countNurse,
    });
  } catch (e) {
    console.log(e);
  }
};

// Get by ID
export const getPhyDataById = async (req, res) => {
  try {
    console.log(req.query._id);

    let dataid = await User.findOne({
      _id: mongoose.Types.ObjectId(req.query._id),
    });
    res.send({
      status: "200",
      message: "successfully getting data of phy by id",
      result: dataid,
    });
  } catch (e) {
    throw e;
  }
};
