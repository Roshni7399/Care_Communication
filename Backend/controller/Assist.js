import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/User";
import { SendEmail } from "../middleware/sendMail";

//  Add
export const addAssist = async (req, res) => {
  const assistData = new User({
    name: req.body.name,
    email: req.body.email,
    // password: bcrypt.hashSync(req.body.password, 8),
    description: req.body.description,
    location: req.body.location,
    role: req.body.role,
    image: req.file.filename,
  });

  // console.log(req.body.role);

  const assissted_living = await assistData.save();
  const _id = assissted_living._id;
  const link = `http://localhost:3000/setup-page/${_id}&`;

  if (assissted_living) {
    SendEmail(
      "roshnimanmode07@gmail.com",
      req.body.email,
      `Hello ${assistData.name}`,
      `Please Complete your SetUp  --
        click on link : ${link}  `
    );

    res.send({
      status: 200,
      message: "nurse add successfull",
      result: assissted_living,
    });
  }

  res.send({
    status: 200,
    message: "assisted add successfully",
    result: assissted_living,
  });
};

// List (pagination)
export const Assistlist = async (req, res) => {
  try {
    let Assistdata = await User.paginate(
      {
        $and: [
          { name: { $regex: req.body.name, $options: "i" } },
          { role: "2" },
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
          message: "Assist Living List",
          result: result,
        });
      }
    );
  } catch (e) {
    throw e;
  }
};

//  Get by Id
export const getAssistById = async (req, res) => {
  const result = await User.find({ role: "2" });

  if (result) {
    res.send({
      status: true,
      message: "Find Successfully",
      result: result,
    });
  }
};

// Update
export const updateAssist = async (req, res) => {
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

    const result = await User.updateOne(
      { _id: mongoose.Types.ObjectId(req.body._id) },
      { $set: jsondata },
      { new: true }
    );

    if (!result) {
      res.send({
        status: 400,
        message: "Updation is Failed",
      });
    } else {
      res.send({
        status: 200,
        message: "Updated Successfully",
        result: result,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

// Delete
export const deleteAssist = async (req, res) => {
  try {
    let _id = req.params._id;
    console.log(_id);
    const user = await User.deleteOne({ _id: mongoose.Types.ObjectId(_id) });
    if (user) {
      res.send({
        status: true,
        message: "success",
        result: user,
      });
    }
  } catch (e) {
    throw e;
  }
};

// Search
// export const allAssist = async (req, res) => {
//   console.log(req.query.name);

//   const users = await User.find({ name: { $regex: req.query.name, $options: "i"} });
//   if (users)
//     res.send({
//       status: 200,
//       message: "Assist search",
//       result: users,
//     });
// };
