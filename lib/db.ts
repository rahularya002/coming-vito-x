import mongoose from "mongoose";

export const connectToDb = async () => {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        throw new Error("Please provide a valid MongoDB connection string.");
    }

    // Check the connection state
    if (mongoose.connection.readyState === 0) {
        try {
            await mongoose.connect(uri,{
                dbName: "vito-x"
            });
            console.log("Connected to MongoDB successfully.");
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
            throw new Error("Error connecting to MongoDB.");
        }
    } else {
        console.log("Already connected to MongoDB.");
    }
};
