import express from 'express';
import {
  addUser,
  editUser,
  getCurrentUser,
  getDashboard,
  getUser,
  healthCheck,
  listUsers,
  loginUser,
  registerUser,
  removeUser,
} from '../controller/control.js';
import { requireAuth } from '../middleware/mid.js';

const router = express.Router();

router.get('/health', healthCheck);

router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);
router.get('/auth/me', requireAuth, getCurrentUser);

router.get('/dashboard', requireAuth, getDashboard);

router.get('/users', requireAuth, listUsers);
router.get('/users/:id', requireAuth, getUser);
router.post('/users', requireAuth, addUser);
router.put('/users/:id', requireAuth, editUser);
router.delete('/users/:id', requireAuth, removeUser);


export default router;



//GET http://localhost:5000/api/users
//GET http://localhost:5000/api/users/USER_ID
//POST http://localhost:5000/api/users
//PUT http://localhost:5000/api/users/USER_ID
//DELETE http://localhost:5000/api/users/USER_ID



