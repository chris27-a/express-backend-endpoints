import express from 'express';
import { getPosts, createPost, getPost, deletePost } from '../controllers/posts.controllers.js';


const postsRoutes = express.Router();

postsRoutes.post("/", createPost)
postsRoutes.get("/", getPosts)
postsRoutes.get("/:id", getPost)
postsRoutes.delete("/:id", deletePost)

export default postsRoutes;