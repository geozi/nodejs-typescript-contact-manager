/**
 * Main entry point.
 */

import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
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

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});

connectToDB();
