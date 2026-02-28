import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://ayeshaakh234_db_user:cKBw3nlO8i2IfqeF@cluster0.rqydp9y.mongodb.net/atown";

if (!MONGODB_URI) {
  throw new Error(
    "Please set MONGODB_URI in .env.local (e.g. mongodb+srv://user:pass@cluster.mongodb.net/atown)"
  );
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose ?? { conn: null, promise: null };

if (process.env.NODE_ENV !== "production") {
  global.mongoose = cached;
}

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const uri = process.env.MONGODB_URI ?? MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI is not set. Add it to .env.local or set the variable in this file.");
    cached.promise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
