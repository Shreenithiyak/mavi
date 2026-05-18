import express from "express";

import { createUser,getUsers } from "../controller/control.js";

const router = express.Router();

router.post("/users", createUser);

router.get("/users", getUsers);

export default router;

//http://localhost:5000/api/users