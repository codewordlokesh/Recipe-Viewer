import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

console.log("your mongo db uri is", MONGODB_URI);

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

// Ensure global object has a mongoose cache
if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (global.mongoose.conn) return global.mongoose.conn;

  if (!global.mongoose.promise) {
    global.mongoose.promise = mongoose.connect(MONGODB_URI, {
      dbName: "recipeViewer",
    });
  }

  global.mongoose.conn = await global.mongoose.promise;
  return global.mongoose.conn; 
}

export async function dbDisconnect() {
  if (global.mongoose?.conn) {
    await mongoose.disconnect();
    global.mongoose.conn = null;
  }
}
