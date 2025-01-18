import { NextResponse } from "next/server";
import PreRegistrationModel from "@/models/user";
import { z } from "zod";
import { connectToDb } from "@/lib/db";

// Define the schema for input validation
const emailSchema = z.object({
    email: z.string().email(),
});

export async function POST(request: Request) {
    try {
        // Parse and validate request body
        const parsedData = emailSchema.safeParse(await request.json());

        if (!parsedData.success) {
            return NextResponse.json(
                { message: "Invalid request format. Please provide a valid email address." },
                { status: 400 }
            );
        }

        const { email } = parsedData.data;

        // Connect to the database
        await connectToDb();

        // Check for duplicate email
        const existingUser = await PreRegistrationModel.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: "This email is already registered." },
                { status: 409 } // Conflict
            );
        }

        // Save email to the database
        await PreRegistrationModel.create({ email });

        return NextResponse.json({
            message: "You will be notified soon!",
        });
    } catch (error: any) {
        console.error("Error occurred:", error);

        // Handle specific Mongoose errors
        if (error.code === 11000) {
            return NextResponse.json(
                { message: "This email is already registered." },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { message: "An unexpected error occurred. Please try again later." },
            { status: 500 }
        );
    }
}
