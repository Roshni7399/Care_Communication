import mongoose from "mongoose";
import user from "../model/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SendEmail } from "../middleware/sendMail";

// Add
export const addNursingHome = async (req, res) => {
  const newNursing = new user({
    name: req.body.name,
    email: req.body.email,
    // password: bcrypt.hashSync(req.body.password, 8),
    nursing_company: req.body.nursing_company,
    location: req.body.location,
    contact: req.body.contact,
    role: req.body.role,
    image: req.file.filename,
  });

  const nursingdata = await newNursing.save();
  const _id = nursingdata._id;
  const link = `http://localhost:3000/setup-page/${_id}&`;

  if (nursingdata) {
    SendEmail(
      "roshnimanmode07@gmail.com",
      req.body.email,
      `Hello ${newNursing.name}`,
      `Please Complete your SetUp  --
      click on link : ${link}
          `
    );

    res.send({
      status: true,
      message: "added successfully",
      result: nursingdata,
    });
  }
};

// Login
export const nursehomeLogin = async (req, res) => {
  const { email, password } = req.body;

  const result = await user.findOne({ email });
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

//  List
export const getnursinghome = async (req, res) => {
  try {
    const data = await user.paginate(
      {
        $and: [
          { name: { $regex: req.body.name, $options: "i" } },
          { role: "1" },
        ],
      },
      {
        page: req.body.page,
        limit: req.body.limit,
      },
      (err, result) => {
        console.log(result);
        res.send({
          status: 200,
          message: " showing nursing home list  ",
          result: result,
        });
      }
    );
  } catch (e) {
    throw e;
  }
};

// delete
export const deleteNursingcompany = async (req, res) => {
  const _id = req.params._id;
  console.log(_id);
  await user.deleteOne({
    _id,
  });
  res.send({
    status: true,
    message: "Deleted Successfully",
  });
};

// update
export const nursinghomeUpdate = async (req, res) => {
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

    user.updateOne(
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
