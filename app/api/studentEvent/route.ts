import prisma from "@/app/utils/connect";
import { NextApiResponse } from 'next';
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// POST method to add a new student-event relationship
export async function POST(req: Request, res: NextApiResponse) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        }

        const { eventId, studentId } = await req.json();

        if (!eventId || !studentId) {
            return NextResponse.json({
                error: "Missing required fields",
                status: 400,
            });
        }

        const studentEvent = await prisma.studentEvent.create({
            data: {
                eventId: eventId,
                studentId: studentId,
            },
        });

        return NextResponse.json(studentEvent);
    } catch (error) {
        console.log("Error Creating Student Event: ", error);
        return NextResponse.json({ error: "Error creating student event", });
    }
}

// GET method to retrieve
// GET method to retrieve all student-event relationships
export async function GET(req: Request, res: NextApiResponse) {
    try {
        const studentEvents = await prisma.studentEvent.findMany({
            include: {
                event: true,  // Include related event details
                studentProfile: true  // Include related student profile details
            }
        });

        return NextResponse.json(studentEvents);
    } catch (error) {
        console.log("ERROR GETTING STUDENT EVENTS: ", error);
        return NextResponse.json({ error: "Error retrieving student events", status: 500 });
    }
}
