import express from "express";
import songsRoute from "./routes/songs";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";

const PORT = Number(process.env.PORT) || 3000;

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Origin",
      "X-Requested-With",
      "Accept",
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin",
    ],
  })
);
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// @ts-ignore
app.use(bodyParser.json({ limit: "30mb", extended: true }));
dotenv.config();

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/v1/songs", songsRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

export default app;
