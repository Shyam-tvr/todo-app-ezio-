import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { userModel } from "../Models/userModel.js";

export const authController = {

  doSignup: async (req, res) => {
    const userData = req.body;
    try {
      const userExist = await userModel.findOne({ email: userData.email });
      if (!userExist) {
        userData.password = await bcrypt.hash(userData?.password, 10);
        userModel
          .create(userData)
          .then(() => res.status(200).json({ message: "signup successfully" }))
          .catch(() =>
            res.status(500).json({ message: "something went wrong" })
          );
      } else {
        res.status(400).json({ message: "user already Exist" });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  doLogin: async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email: email })
        if (user) {
            bcrypt.compare(password,user.password).then(async()=>{
                const token = await jwt.sign({userId:user._id},'privateKey')
                if(token){
                    res.status(200).json({token})
                }
            }).catch((error)=>{
                res.status(401).json(error)
            })
        } else {
            res.status(401).json({message:"user not found"})
        }
    } catch (error) {
        res.status(500).json({ error })
    }
  },
};
