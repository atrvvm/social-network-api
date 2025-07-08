import mongoose from "mongoose";

const db = async (): Promise<typeof mongoose.connection> =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://annangoctram1:AfBMPlmf8eUNpu37@cluster0.qjrmg3e.mongodb.net/socialNetwork');
        console.log('Database connected.');
        return mongoose.connection;
    } catch(error) {
        console.error('Database connection error:', error);
        throw new Error('Database connection failed.');
    }
}

export default db;
