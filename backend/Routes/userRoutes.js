import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import User from '../Models/User.js';
import { isAuth } from '../utils.js';
import { generateToken } from '../utils.js';

const userRouter = express.Router();

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          addresses: user.addresses,
          email: user.email,
          userType: user.userType,
          token: generateToken(user),
        });
        return;
      }
      res.status(401).send({ message: 'Invalid email or password' });
    }
  })
);

userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      addresses: user.addresses,
      email: user.email,
      userType: user.userType,
      token: generateToken(user),
    });
    return;
  })
);

userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        addresses: updatedUser.addresses,
        email: updatedUser.email,
        userType: updatedUser.userType,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: 'user not found' });
    }
  })
);

export default userRouter;
