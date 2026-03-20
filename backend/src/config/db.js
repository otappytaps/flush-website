import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/flushDB");
        console.log("MONGODB CONNECTED SUCCESSFULLY!")
    } catch (error) {
        console.error("MONGODB ERROR!", error);
        process.exit(1);
    }
}