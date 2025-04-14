import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { connectToDatabase } from "./dbConnection.js";
import routes from "./routes/index.js";

const app = express();
dotenv.config();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));


// routes
app.use("/", routes)
// http:localhost:4700/users
// app.use("/api/v1", routes)
// http://localhost:3400/api/v1/users

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    author: "Chris",
    message: "Im leraning from Expert",
  });
});

// connection
connectToDatabase
const PORT = process.env.PORT || 4700;
app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});