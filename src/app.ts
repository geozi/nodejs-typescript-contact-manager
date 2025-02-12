/**
 * Main entry point.
 */

import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { authRouter } from "./presentation/apis/v1/routes/auth.route";
import { userRouter } from "./presentation/apis/v1/routes/user.route";
import { groupRouter } from "./presentation/apis/v1/routes/group.route";
import { contactRouter } from "./presentation/apis/v1/routes/contact.route";
dotenv.config();
const app = express();
const port = 3000;

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connection to database established.");
  } catch (error) {
    console.log("Failed to connect to database", error);
  }
}

app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/groups", groupRouter);
app.use("/api/v1/contacts", contactRouter);

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});

connectToDB();
