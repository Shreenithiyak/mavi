import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { findUserById } from '../shema/shema.js';

const getJwtSecret = () => process.env.JWT_SECRET || 'change-this-secret-in-production';

export const requireAuth = async (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Missing authorization token' });
  }

  try {
    const payload = jwt.verify(token, getJwtSecret());
    const user = await findUserById(payload.id);

    if (!user) {
      return res.status(401).json({ message: 'User no longer exists' });
    }

    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
