import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createComment = async (req, res) => {
    try{
        const { content, postId, authorId } = req.body;
        const newComment = await prisma.comment.create({
            data: {
                content,
                postId,
                authorId
            }
        })
        return res.status(201).json({ message: "Comment created", newComment });
    }catch (error){
        return res.status(500).json({ error: "Error creating comment" });
    }
}

export const getComment = async (req, res) => {
    try{
      const { id } = req.params;
      const comment = await prisma.comment.findUnique({
        where: { id: Number(id) },
        include: {
            post: true,
            author: true,
        }
      })
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        return res.status(200).json({ message: "Comment", comment });
    }catch (error){
        return res.status(500).json({ error: "Error fetching comment" });
    }
}

export const getComments = async (req, res) => {
    try{
        const comments = await prisma.comment.findMany({
            include:{
                author: true,
                post: true
            }
        })
        if (!comments) {
            return res.status(404).json({ error: "Comments not found" });
        }
        return res.status(200).json({ message: "all comments", comments });
    }catch (error){
        return res.status(500).json({ error: "Error fetching comments" });
    }
}

export const deleteComment = async (req, res) => {
    try{
        const { id } = req.params;
        const comment = await prisma.comment.delete({
            where: { id: Number(id) },
        })
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        return res.status(200).json({ message: "Comment deleted", comment });   
    }catch (error){
        return res.status(500).json({ error: "Error deleting comment" });
    }
}