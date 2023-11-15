import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./dbConfig.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const port = process.env.PORT || 5000;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/user", userRoutes);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.listen(port, () => console.log(`server started on port ${port}`));
