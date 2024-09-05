import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt"
import randomString from "random-string-gen";



const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, min: 8, max: 50, required: true },
    birthday: { type: String },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
    activated: { type: Boolean, default: false },
    activation: { type: String, default: "" },
    
  },
  { timestamps: true }
);

// hashing Password and creating activation_link

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      next();
    } else {
      const salt = await bcrypt.genSalt(12);
      this.password = await bcrypt.hash(this.password, salt);

      // this step generates an activation link to use it directly
      // in our activation email and also to update the activation link
      // in case of changing the password in future:

      const code = randomString({
        capitalization: "lowercase",
      });
      this.activation= code
      this.updated_at = Date.now();
      next();
    }
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePass= async function(password){
  return await bcrypt.compare(password, this.password)
}

export const User = model('User', userSchema);
