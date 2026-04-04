import express from 'express';
import cors from 'cors';
import postRoutes from './routes/postRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import { connectDB } from "./config/db.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 5001;
const REACT = "http://localhost:5173";

app.use(cors());
app.use(express.json());

app.use(cors({
    origin: REACT, 
    credentials: true                
}));

app.use((req,res,next) => {
    console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
    next();
})

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT);
    });
});

