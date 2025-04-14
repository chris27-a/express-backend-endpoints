import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const connectToDatabase = async () => {
    try {
        await prisma.$connect();
        console.log('Prisma connected to the database ✅');

        // Test the connection
        await prisma.$queryRaw`SELECT 1`;
        console.log('Database query successful ✅');

    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
}

// Connect to database
connectToDatabase();


export default prisma;