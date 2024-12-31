import express from "express";
import cors from "cors";
import connecToDB from "./config/database.js";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

connecToDB();

app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
