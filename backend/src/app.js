import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { connectToSocket } from "./controller/socketManager.js";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import 'dotenv/config'












const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ extended: true, limit: "40kb" }));

app.set("port", process.env.PORT || 8000);


/////routes

app.use("/", userRoutes);


let dburl = process.env.MONGOURL


const start = async () => {
  const connectDb = await mongoose
    .connect(dburl)
    .then(() => console.log("Database Is Connected"))
    .catch((err) => console.log(err));

  server.listen(app.get("port"), () => {
    console.log(`app is listining on port 8000`);
  });
};

start();
