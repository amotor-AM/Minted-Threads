import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import User from '../Models/User.js';
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

export default userRouter;
