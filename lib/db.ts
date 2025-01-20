import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
}

const MONGODB_URI: string = process.env.MONGODB_URI;

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

// Use proper typing for the global object
interface CustomGlobal extends Global {
    mongoose?: MongooseCache;
}

// Type assertion for globalThis
let cached: MongooseCache = (globalThis as CustomGlobal).mongoose || {
    conn: null,
    promise: null
};

if (!cached) {
    cached = (globalThis as CustomGlobal).mongoose = {
        conn: null,
        promise: null
    };
}

export async function connectToDb() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            dbName: "vito-x"
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts);
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

declare global {
    
    var mongoose: MongooseCache | undefined;
}