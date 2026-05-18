import 'dotenv/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { isMongoReady } from '../config/db.js';
import {
  createUser,
  deleteUser,
  findUserByEmail,
  findUserById,
  getUsers,
  normalizeEmail,
  publicUser,
  updateUser,
} from '../shema/shema.js';

const createToken = (user) =>
  jwt.sign(publicUser(user), process.env.JWT_SECRET || 'change-this-secret-in-production', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

export const healthCheck = (req, res) => {
  res.json({ ok: true, database: isMongoReady() ? 'mongodb' : 'memory' });
};

export const registerUser = async (req, res) => {
  try {
    const fullName = req.body.fullName?.trim();
    const email = normalizeEmail(req.body.email);
    const password = req.body.password || '';
    const confirmPassword = req.body.confirmPassword || '';

    if (!fullName || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'Email is already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await createUser({ fullName, email, passwordHash });

    res.status(201).json({
      message: 'Account created successfully',
      user: publicUser(user),
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Email is already registered' });
    }

    res.status(500).json({ message: 'Registration failed' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const password = req.body.password || '';

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await findUserByEmail(email);
    const passwordMatches = user ? await bcrypt.compare(password, user.passwordHash) : false;

    if (!passwordMatches) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      message: 'Login successful',
      token: createToken(user),
      user: publicUser(user),
    });
  } catch {
    res.status(500).json({ message: 'Login failed' });
  }
};

export const getCurrentUser = (req, res) => {
  res.json({ user: publicUser(req.user) });
};

export const getDashboard = (req, res) => {
  res.json({
    user: publicUser(req.user),
    metrics: [
      { label: 'System Uptime', value: '99.99%', trend: '+0.01%' },
      { label: 'Compute Usage', value: '42.8%', trend: '-2.4%' },
      { label: 'Global Traffic', value: '1.2M', trend: '+12%' },
      { label: 'Avg Latency', value: '14ms', trend: '-2ms' },
    ],
  });
};

export const listUsers = async (req, res) => {
  const users = await getUsers();
  res.json({ users: users.map(publicUser) });
};

export const getUser = async (req, res) => {
  const user = await findUserById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({ user: publicUser(user) });
};

export const addUser = async (req, res) => {
  try {
    const fullName = req.body.fullName?.trim();
    const email = normalizeEmail(req.body.email);
    const password = req.body.password || '';

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Full name, email, and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'Email is already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await createUser({ fullName, email, passwordHash });

    res.status(201).json({ message: 'User created', user: publicUser(user) });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Email is already registered' });
    }

    res.status(500).json({ message: 'Create user failed' });
  }
};

export const editUser = async (req, res) => {
  try {
    const updates = {};

    if (req.body.fullName) {
      updates.fullName = req.body.fullName.trim();
    }

    if (req.body.email) {
      const email = normalizeEmail(req.body.email);
      const existingUser = await findUserByEmail(email);

      if (existingUser && publicUser(existingUser).id !== req.params.id) {
        return res.status(409).json({ message: 'Email is already registered' });
      }

      updates.email = email;
    }

    if (req.body.password) {
      if (req.body.password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
      }

      updates.passwordHash = await bcrypt.hash(req.body.password, 12);
    }

    const user = await updateUser(req.params.id, updates);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated', user: publicUser(user) });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Email is already registered' });
    }

    res.status(500).json({ message: 'Update user failed' });
  }
};

export const removeUser = async (req, res) => {
  const user = await deleteUser(req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({ message: 'User deleted', user: publicUser(user) });
};
