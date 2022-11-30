import User from "../model/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


export const forgetPassword = async (req, res) => {

    const {email}=req.body
    try {
      let result = await User.find({ email: email });
      res.send({
        status: "200",
        message: "successfully getting email",
        result: result,
      });
    } catch (e) {
      throw e;
    }
  };
  