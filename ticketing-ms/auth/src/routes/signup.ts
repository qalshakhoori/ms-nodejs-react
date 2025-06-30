import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import {
  validateRequest,
  BadRequestError,
} from '@qalshakhoori-ms/ticketing-ms-common';
import { User } from '../models/user';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password });
    const createdUser = await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: createdUser.id,
        email: createdUser.email,
      },
      process.env.JWT_KEY! // Ensure JWT_KEY is defined in your environment variables
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(createdUser);
  }
);

export { router as signupRouter };
