import mongoose from "mongoose"
import dns from "node:dns/promises"

dns.setServers(["8.8.8.8"]);

export const connectDB = async () => {
    try {
        const DB_URL = "mongodb+srv://jenricklim_db_user:admin123456@flushcluster.zdndybn.mongodb.net/flushapp?appName=FlushCluster"
        await mongoose.connect(DB_URL);
        console.log("MONGODB CONNECTED SUCCESSFULLY!")
    } catch (error) {
        console.error("MONGODB ERROR!", error);
        process.exit(1);
    }
}