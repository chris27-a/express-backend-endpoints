import express from "express"
import {createUser, deleteUser, getUsers, getUser, updateUser} from "../controllers/users.controllers.js";

const userRoutes = express.Router();

userRoutes.post("/", createUser)
userRoutes.get("/", getUsers)
userRoutes.get("/:id", getUser)
userRoutes.put("/:id", updateUser)
userRoutes.patch("/:id", updateUser)
userRoutes.delete("/:id", deleteUser)


export default userRoutes