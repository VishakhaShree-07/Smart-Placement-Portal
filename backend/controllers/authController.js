import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide all required fields: name, email, password',
      });
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide a valid email address',
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        status: 'error',
        message: 'A user with this email is already registered',
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      return res.status(201).json({
        status: 'success',
        message: 'Student registered successfully',
        data: {
          token: generateToken(user._id),
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
      });
    } else {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid user data',
      });
    }
  } catch (error) {
    console.error('Registration Error:', error);
    return res.status(500).json({
      status: 'error',
      message: error.message || 'Something went wrong during registration',
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide both email and password',
      });
    }

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      return res.status(200).json({
        status: 'success',
        message: 'Login successful',
        data: {
          token: generateToken(user._id),
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
      });
    } else {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password',
      });
    }
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({
      status: 'error',
      message: error.message || 'Something went wrong during login',
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    if (req.user) {
      return res.status(200).json({
        status: 'success',
        data: {
          user: {
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role,
          },
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        message: 'User profile not found',
      });
    }
  } catch (error) {
    console.error('Get Profile Error:', error);
    return res.status(500).json({
      status: 'error',
      message: error.message || 'Something went wrong while retrieving profile',
    });
  }
};
