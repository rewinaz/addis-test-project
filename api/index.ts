import express from "express";
import songsRoute from "./routes/songs";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";

const PORT = 3000 | Number(process.env.PORT);

const app = express();


app.use(
  cors({
    origin: ["http://localhost:3000", "https://addis-test-project.vercel.app/"],
  })
);
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});
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

app.use("/api/v1/songs", songsRoute);

app.listen(PORT, () => {
  console.log("Server is listening on port 3000");
});
