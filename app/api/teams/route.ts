import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from 'next/server';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        }

        const { eventId, teamName, studentIds } = req.body;

        if (!eventId || !teamName || !studentIds) {
            return NextResponse.json({
                error: "Missing required fields",
                status: 400,
            });
        }

        if (!Array.isArray(studentIds) || studentIds.some(id => typeof id !== 'number')) {
            return NextResponse.json({
                error: "Invalid student IDs",
                status: 400,
            });
        }

        const teams = await prisma.team.create({
            data: {
                eventId: eventId,
                teamName: teamName,
                students: {
                    connect: studentIds.map(id => ({ id }))
                },
                event: {
                    connect: { id: eventId }
                }
            },
            include: {
                students: true // Include the students in the response for verification
            }
        });

        return NextResponse.json(teams);
    } catch (error) {
        console.log("Error Creating teams: ", error);
        return NextResponse.json({ error: "Error creating teams", status: 500 });
    }
}


export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        }

        // You might want to add additional filters or parameters
        const teams = await prisma.team.findMany({
            include: {
                event: true,      // Include the event details
                students: true   // Include the students in each team
            }
        });

        return NextResponse.json(teams);
    } catch (error) {
        console.log("ERROR GETTING EVENTS: ", error);
        return NextResponse.json({ error: "Error updating teams", status: 500 });
    }
}



export async function PUT(req: Request) {
    const { userId } = auth();

    try {

    } catch (error) {
        console.log("Error Updating Event: ", error);
        return NextResponse.json({ error: "Error Updating event", status: 500 });

    }
}

export async function Delete(req: Request) {
    try {

    } catch (error) {
        console.log("Error Deleting Event: ", error);
        return NextResponse.json({ error: "Error Deleting event", status: 500 });

    }
}