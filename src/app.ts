import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import theaterRoutes from "./routes/theater.routes";
import screenRoutes from "./routes/screen.routes";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", theaterRoutes);
app.use("/api", screenRoutes);
export default app;
