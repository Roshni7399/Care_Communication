import User from "../model/User";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SendEmail } from "../middleware/sendMail";

//nurse create
export const addnurse = async (req, res) => {
  // console.log(req.body);
  const nurseData = new User({
    name: req.body.name,
    email: req.body.email,
    // password:bcrypt.hashSync(req.body.password, 8),
    contact: req.body.contact,
    role: req.body.role,
    location: req.body.location,
    nursing_home_id: req.body.nursing_home_id,
    assissted_living_id: req.body.assissted_living_id,
    image: req.file.filename,
  });

  const nurseDetails = await nurseData.save();
  const _id = nurseDetails._id;
  const link = `http://localhost:3000/setup-page/${_id}&`;

  if (nurseDetails) {
    SendEmail(
      "roshnimanmode07@gmail.com",
      req.body.email,
      `Hello ${nurseData.name}`,
      `Please Complete your SetUp  --
        click on link : ${link}
            `
    );

    res.send({
      status: 200,
      message: "nurse add successfull",
      result: nurseDetails,
    });
  }
};

// Nurse Login
export const nurseLogin = async (req, res) => {
  const { email, password } = req.body;

  const result = await User.findOne({ email });
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

    jwt.sign(payload, "SECRET_KEY", { expiresIn: "24h" }, (err, token) => {
      res.send({
        status: true,
        message: "Successfully  Nurse Login",
        result: token,
        role: result.role,
      });
    });
  } else {
    res.send({
      status: false,
      message: "Password is incorrect- Please enter correct password",
    });
  }
};

// Nurse get by Gole (List)
export const getnurshe = async (req, res) => {
  try {
    const nursedata = await User.paginate(
      {
        $and: [
          { name: { $regex: req.body.name, $options: "i" } },
          { role: "4" },
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
          message: "nuirse list geting done",
          data: result,
        });
      }
    );
  } catch (e) {
    console.log(e);
  }
};

// Delete Nurse 
export const nurseDelete = async (req, res) => {
  try {
    let _id = req.params.id;
    console.log(_id);

    const nurse = await User.deleteOne({ _id: mongoose.Types.ObjectId(_id) });
    if (nurse) {
      res.send({
        message: "document deleted bro!",
      });
    }
  } catch (e) {
    throw e;
  }
};

// //update
export const nurseUpdate = async (req, res) => {
  try {
    let jsondata = {};

    if (req.body.name) {
      jsondata.name = req.body.name;
    }
    if (req.body.email) {
      jsondata.email = req.body.email;
    }
    if (req.body.contact) {
      jsondata.contact = req.body.contact;
    }
    if (req.body.location) {
      jsondata.location = req.body.location;
    }
    if (req.body.password) {
      jsondata.password = req.body.password;
    }
    if (req.body.nursing_home_id) {
      jsondata.nursing_home_id = req.body.nursing_home_id;
    }
    if (req.body.assissted_living_id) {
      jsondata.assissted_living_id = req.body.assissted_living_id;
    }

    User.updateOne(
      { _id: req.body._id },
      { $set: jsondata },
      { new: true },
      (err, updatedlist) => {
        if (err) {
          res.send({
            status: 404,
            message: "Failed",
            result: err,
          });
        } else {
          res.send({
            status: 200,
            message: "Updated Successfully",
            result: updatedlist,
          });
          console.log(updatedlist);
        }
      }
    );
  } catch (e) {
    throw e;
  }
};

// List of all roles
export const List = async (req, res) => {
  try {
    const nursedata = await User.find({ role: "4" });
    const nursinghome = await User.find({ role: "1" });
    const assist = await User.find({ role: "2" });
    const phy = await User.find({ role: "3" });
    res.send({
      status: "200",
      message: "List geting done",
      nursedata: nursedata,
      nursinghome: nursinghome,
      assist: assist,
      phy: phy,
    });
  } catch (e) {
    console.log(e);
  }
};

// get data by ID
export const getNurseDataById = async (req, res) => {
  console.log(req.body.id);
  try {
    let dataid = await User.findOne({
      id: mongoose.Types.ObjectId(req.body.id),
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
