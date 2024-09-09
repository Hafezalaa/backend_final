import { errorCreator } from "../ErrorHandler/error.js";
import { User } from "../Models/user.model.js";

import { email_gen, email_sender, passwordCheck } from "../MW/userMW.js";
import { createToken, verifyToken } from "../MW/userMW.js";

export const user_register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password });
    newUser.password = undefined;
    res.json({ msg: "User added successfully", newUser });
    email_sender(newUser);
  } catch (error) {
    next(error);
  }
};

export const activator = async (req, res, next) => {
  try {
    const code = req.params.activation;
    const uid = req.params._id;

    const userFound = await User.findOne({ activation: code, _id: uid });
    if (userFound) {
      res.json({ msg: "your account was activated" });
      const user = await User.findByIdAndUpdate(uid, {
        activated: true,
        activation: "",
      });
      console.log("Hello");
    }
    //console.log(userFound);
  } catch (error) {
    next(error);
  }
};

export const user_login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email: email });
    if (!userFound.activated) {
      res.json({ msg: "You need to activate your account first" });
    } else if (!(await passwordCheck(userFound, password))) {
      res.json({ msg: "Your password doesn't match" });
    } else {
      const token = await createToken(
        { uid: userFound._id, name: userFound.name },
        process.env.JWT_SECRET
      );
      //res.json({msg:'Data OK'})
      res
        .cookie("token", token, {
          expiresIn: new Date(Date.now() + 3_600_000 * 24),
          httpOnly: true,
        })
        .json({ status: "Login OK" });
    }
  } catch (error) {
    next(error);
  }
};

export const user_logout = (req, res, next) => {
  res.clearCookie("token").json({ msg: "cookies have been terminated" });
};

export const user_edit_pass = async (req, res, next) => {
  try {
    const { email, password, new_password1, new_password2 } = req.body;
    console.log(req.body);
    const userFound = await User.findOne({ email: email });
    if (!userFound || !userFound.activated) {
      res.json({
        msg: "No user registered with this email or you didn't activate your account",
      });
    } else if (!(await passwordCheck(userFound, password))) {
      res.json({ msg: "your current password doesn't match" });
    } else if (new_password1 !== new_password2) {
      res.json({ msg: "your new password should match in 2 lines" });
    } else {
      userFound.email=email || userFound.email
      userFound.password= password||userFound.password
      await userFound.save()
      res.json({msg:"OK",userFound})
      console.log(userFound);
    }
  } catch (error) {
    next(error);
  }
};
