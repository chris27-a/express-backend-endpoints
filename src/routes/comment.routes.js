import express from 'express';
import { createComment, deleteComment, getComments, getComment } from '../controllers/comment.controllers.js';

const commentRoutes = express.Router();

commentRoutes.post("/", createComment)
commentRoutes.get("/", getComments)
commentRoutes.get("/:id", getComment)
commentRoutes.delete("/:id", deleteComment)



export default commentRoutes;