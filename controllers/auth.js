import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createError } from '../utils/error.js';

export const register = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  try {
    const newUser = await new User({
      ...req.body,
      password: hash,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, 'User not found!'));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return next(createError(400, 'Wrong password or username!'));
    } else {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRETE
      );

      const { password, isAdmin, ...otherDetails } = user._doc;

      res
        .cookie('access_token', token, {
          httpOnly: true,
          path: '/',
        })
        .status(200)
        .json({ details: { ...otherDetails }, isAdmin });
    }
  } catch (error) {
    next(error);
  }
};
