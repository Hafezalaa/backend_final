import jwt from "jsonwebtoken";
import { promisify } from "util";
import nodemailer from 'nodemailer'
import { User } from "../Models/user.model.js";

export const createToken = async (payload, secret, options) => {
    const asyncToken = promisify(jwt.sign);
    return await asyncToken(payload, secret, options);
  };
  
 export const verifyToken = async (token, secret) => {
    const asyncVerify = promisify(jwt.verify);
    return await asyncVerify(token, secret);
  };

  export const email_gen = (user) => {
    const { name, email, activation, _id } = user;
    const link = `https://localhost:9117/user/confirm/${activation}/${_id}`;
  
    return `
      Dear ${name}:<br/>
      Thanks for your registration, please follow the link below to activate your account:<br/>
      <br/>
      <a href="${link}"><button>Here to Verify<button/></a>.<br/>
      Best Regards
      `;
  };
  
  export const email_sender = async (user) => {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.EmailPORT,
        secure: true,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });
  
      const info = await transporter.sendMail({
        from: process.env.EMAIL,
        to: user.email,
        subject: "Verify your Email",
        html: email_gen(user),
      });
    } catch (error) {
      console.error(error);
    }
  };


export const check_cookies = async (req, res, next) => {
    const { token } = req.cookies;
  
    try {
      if (!token) {
        res.json({
          msg: "you don't have credentials to see this page",
          status: 400,
        });
      } else {
        const payloadFromToken = await verifyToken(token, process.env.JWT_SECRET);
        const { name, uid } = payloadFromToken;
        const userFound = await User.findById({ _id: uid });
  
        if (!userFound) {
          res.json({ msg: "you have provided the wrong cookies" });
        } else {
          res.json({ msg: "token verified" });
        }
      }
    } catch (error) {
      next(error);
    }
  };


 export const passwordCheck= async(user, password)=>{
   return await user.comparePass(password)
  }
  