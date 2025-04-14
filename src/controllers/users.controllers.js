import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createUser = async (req, res) => {
    try {
        const { name, email, profile, password } = req.body;
        // Check if user already exists
        const existingUser = await prisma.users.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(409).json({ error: `User Email ${email} already exists` });
        }
        const newUser = await prisma.users.create({
            data: {
                name,
                email,
                profile,
                password,
            },
        });
        return res.status(201).json({ message: "User created", newUser });
    } catch (error) {
        return res.status(500).json({ error: "Error creating user" });
    }
};


export const getUsers = async (req, res) => {
    try {
        const users = await prisma.users.findMany({
            include: {
                Post: true,
            },
        });

        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        return res.status(200).json({ message: "All users", users });
    } catch (error) {
        return res.status(500).json({ error: "Error fetching users" });
    }
};

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma.users.findUnique({
            where: { id: Number(id) },
            include: {
                Post: true,
            },
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.json(user)
    } catch (error) {
        return res.status(500).json({ error: "Error fetching user" });
    }
};
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, profile, password } = req.body;
        const updateUser = await prisma.users.update({
            where: { id: Number(id) },
            data: {
                name,
                email,
                profile,
                password,
            },
            include: {
                Post: true,
            }
        });
        if (!updateUser) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.json({ message: 'user updated' });
    } catch (error) {
        return res.status(500).json({ error: "Error updating user" });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await prisma.users.delete({
            where: { id: Number(id) },
        });
        if (!deleteUser) {
            return res.status(404).json({ error: 'user not found' });
        }
        return res.json({ message: 'user deleted' });
    } catch (error) {
        return res.status(500).json({ error: 'Error deleting user' });
    }
}