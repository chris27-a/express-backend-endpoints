import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const existingCategory = await prisma.category.findUnique({
            where: { name },
        });
        if (existingCategory) {
            return res.status(409).json({ error: "Category already exists" });
        }
        const newCategory = await prisma.category.create({
            data: {
                name
            }
        })
        return res.status(201).json({ message: "Category created", newCategory });
    } catch (error) {
        return res.status(500).json({ error: "Error creating category" });
    }
}

export const getCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            include: {
                Post: true,
            },
        })
        if (!categories) {
            return res.status(404).json({ error: "Categories not found" });
        }
        return res.status(200).json({ message: "all categories", categories });
    } catch (error) {
        return res.status(500).json({ error: "Error fetching categories" });
    }
}

export const getCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await prisma.category.findUnique({
            where: { id: Number(id) },
            include: {
                Post: true,
            }
        })
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        return res.status(200).json({ message: "Category", category });
    } catch (error) {
        return res.status(500).json({ error: "Error fetching category" });
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        // Optional: check if category exists first
        const existing = await prisma.category.findUnique({
            where: { id: Number(id) },
        });

        if (!existing) {
            return res.status(404).json({ error: "Category not found" });
        }

        const category = await prisma.category.update({
            where: { id: Number(id) },
            data: { name },
        });

        return res.status(200).json({ message: "Category updated", category });
    } catch (error) {
        return res.status(500).json({ error: "Error updating category" });
    }
};


export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await prisma.category.delete({
            where: { id: Number(id) },
        })
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        return res.status(200).json({ message: "Category deleted", category });
    } catch (error) {
        return res.status(500).json({ error: "Error deleting category" });
    }
}