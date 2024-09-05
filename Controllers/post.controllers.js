import { errorCreator } from "../ErrorHandler/error.js";
import { Post } from "../Models/post.model.js";
import { check_cookies, verifyToken } from "../MW/userMW.js";
import { User } from "../Models/user.model.js";

export const posting = async (req, res, next) => {
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
        const { post } = req.body;
        const { _id } = userFound;
        console.log(_id);
        const newPost = await Post.create({ user_id: _id, post });
        console.log(newPost);
        res.json({ msg: "token verified, comment has been posted", newPost });
      }
    }
  } catch (error) {
    next(error);
  }
};


export const get_posts= async (req,res,next)=>{
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
          
          const { _id } = userFound;
          
          const allUserPosts = await Post.find({user_id:_id})

          
          res.json({ msg: "token verified, comment has been posted", allUserPosts });
        }
      }
    } catch (error) {
      next(error);
    }
}
