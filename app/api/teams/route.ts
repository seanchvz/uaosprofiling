import prisma from "@/app/utils/connect";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from "@clerk/nextjs";

/**
 * Handles the HTTP POST request for creating a team.
 *
 * @param req - The request object.
 * @returns A JSON response containing the created team or an error message.
 */



export async function POST(req: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        }

        const { sportId, teamName, studentIds, eventIds } = await req.json();

        if (!teamName || sportId === undefined) {
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

        const team = await prisma.team.create({
            data: {
                sportId,  // Linking the team to a sport by sportId
                teamName,
                students: {
                    connect: studentIds.map(id => ({ id }))
                },
                // Assuming eventIds is also an array of integers
                // events: {
                //     connect: eventIds.map(id => ({ id }))
                // }
            },
            include: {
                sport: true,  // Including sport details in the response
                students: true,
                // events: true
            }
        });

        return NextResponse.json(team);
    } catch (error) {
        console.error("Error Creating Team: ", error);
        return NextResponse.json({ error: "Error creating team", status: 500 });
    }
}


export async function GET() {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        }

        const teams = await prisma.team.findMany({
            include: {
                students: true,
                sport: true
            }
        });

        return NextResponse.json(teams);
    } catch (error) {
        console.error("ERROR GETTING TEAMS: ", error);
        return NextResponse.json({ error: "Error retrieving teams", status: 500 });
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


export async function PATCH(req: Request) {
    try {

    } catch (error) {
        console.log("Error Updating Event: ", error);
        return NextResponse.json({ error: "Error Updating event", status: 500 });

    }
}
