import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createPost = async (req, res) => {
    try {
        const { title, content, category, authorId, categoryId } = req.body;
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                category,
                authorId,
                categoryId
            }
        })
        return res.status(201).json({ message: "Post created", newPost });
    } catch (error) {
        return res.status(500).json({ error: "Error creating post" });

    };
}


export const getPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                author: true,
            },
        })
        if (!posts) {
            return res.status(404).json({ error: "Posts not found" });
        }
        return res.status(200).json({ message: "all posts", posts });
    } catch (error) {
        return res.status(500).json({ error: "Error fetching posts" });
    }
}

export const getPost = async (req, res) => {
    try {
        const post = await prisma.post.findUnique({
            where: { id: Number(req.params.id) },
            include: {
                author: true,
            }
        })
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        return res.status(200).json({ message: "post", post });
    } catch (error) {
        return res.status(500).json({ error: "Error fetching post" });
    }
}


export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const deletePost = await prisma.post.delete({
            where: { id: Number(id) },
        });
        if (!deletePost) {
            return res.status(404).json({ error: "Post not found" });
        }
        return res.status(200).json({ message: "Post deleted" });
    } catch (error) {
        return res.status(500).json({ error: "Error deleting post" });
    }
}               