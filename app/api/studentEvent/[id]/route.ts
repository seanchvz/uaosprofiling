import prisma from "@/app/utils/connect";
import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from "@clerk/nextjs"; // Assuming Clerk is used for authentication

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Assuming auth() returns the user ID of the logged-in user
        const { userId } = await auth();

        // Check if the user is authenticated
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        // Extract eventId and studentIds from the request body
        const { eventId, studentIds } = req.body;

        // Validate the input
        if (!eventId || !studentIds) {
            return res.status(400).json({
                error: "Missing required fields",
            });
        }

        // Use a transaction if you're creating multiple associations
        const createdAssociations = await prisma.$transaction(
            studentIds.map((studentId: any) => {
                return prisma.studentEvent.create({
                    data: {
                        eventId: Number(eventId), // Ensure the ID is a number
                        studentId, // Assumes studentIds is an array of numbers
                    },
                });
            })
        );

        // Return the created associations
        return res.status(201).json(createdAssociations);
    } catch (error) {
        console.error("Error creating student-event association: ", error);
        return res.status(500).json({ error: "Error creating student-event association" });
    }
}


export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Assuming auth() returns the user ID of the logged-in user
        const { userId } = await auth();

        // Check if the user is authenticated
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { eventId, studentId } = req.query;

        // Validate the query parameters
        if (!eventId && !studentId) {
            return res.status(400).json({
                error: "Missing required query parameters: either eventId or studentId"
            });
        }

        let associations;

        if (eventId) {
            // Fetch all student-event associations for a given event
            associations = await prisma.studentEvent.findMany({
                where: { eventId: Number(eventId) },
                include: {
                    student: true, // Assuming relation name is 'student'
                }
            });
        } else if (studentId) {
            // Fetch all student-event associations for a given student
            associations = await prisma.studentEvent.findMany({
                where: { studentId: Number(studentId) },
                include: {
                    event: true, // Assuming relation name is 'event'
                }
            });
        }

        // Return the fetched associations
        return res.status(200).json(associations);
    } catch (error) {
        console.error("Error retrieving student-event associations: ", error);
        return res.status(500).json({ error: "Error retrieving student-event associations" });
    }
}