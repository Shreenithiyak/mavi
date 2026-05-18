import mongoose from 'mongoose';
import { randomUUID } from 'node:crypto';
import { isMongoReady } from '../config/db.js';

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);

const memoryUsers = [];

export const normalizeEmail = (email = '') => email.trim().toLowerCase();

export const publicUser = (user) => ({
  id: user._id?.toString?.() || user.id,
  fullName: user.fullName,
  email: user.email,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export const findUserByEmail = async (email) => {
  if (isMongoReady()) {
    return User.findOne({ email });
  }

  return memoryUsers.find((user) => user.email === email);
};

export const findUserById = async (id) => {
  if (isMongoReady()) {
    return User.findById(id);
  }

  return memoryUsers.find((user) => user.id === id);
};

export const createUser = async ({ fullName, email, passwordHash }) => {
  if (isMongoReady()) {
    return User.create({ fullName, email, passwordHash });
  }

  const now = new Date().toISOString();
  const user = {
    id: randomUUID(),
    fullName,
    email,
    passwordHash,
    createdAt: now,
    updatedAt: now,
  };

  memoryUsers.push(user);
  return user;
};

export const getUsers = async () => {
  if (isMongoReady()) {
    return User.find().sort({ createdAt: -1 });
  }

  return [...memoryUsers].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const updateUser = async (id, updates) => {
  if (isMongoReady()) {
    return User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
  }

  const user = memoryUsers.find((item) => item.id === id);
  if (!user) {
    return null;
  }

  Object.assign(user, updates, { updatedAt: new Date().toISOString() });
  return user;
};

export const deleteUser = async (id) => {
  if (isMongoReady()) {
    return User.findByIdAndDelete(id);
  }

  const userIndex = memoryUsers.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return null;
  }

  const [deletedUser] = memoryUsers.splice(userIndex, 1);
  return deletedUser;
};
