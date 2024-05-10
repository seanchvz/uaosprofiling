import prisma from "@/app/utils/connect";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from "@clerk/nextjs";


export async function POST(req: Request) {
    const { userId } = auth();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const { name } = await req.json();

    if (!name) {
        return NextResponse.json({
            error: "Sport name is required",
            status: 400,
        });
    }

    try {
        const sport = await prisma.sport.create({
            data: { name }
        });
        return NextResponse.json(sport);
    } catch (error) {
        console.error("Error creating sport: ", error);
        return NextResponse.json({ error: "Error creating sport", status: 500 });
    }
}


export async function GET() {
    try {
        const sports = await prisma.sport.findMany({
            include: {
                teams: true // If you want to include related teams
            }
        });

        console.log(sports)
        return NextResponse.json(sports);
    } catch (error) {
        console.error("Error fetching sports: ", error);
        return NextResponse.json({ error: "Error fetching sports", status: 500 });
    }
}


export async function DELETE(req: Request) {
    const { sportId } = await req.json(); // Assuming you send sportId in JSON body

    // Parse sportId to ensure it is a number
    const parsedSportId = parseInt(sportId, 10);
    if (isNaN(parsedSportId)) {
        return NextResponse.json({ error: "Invalid sport ID", status: 400 });
    }

    try {
        await prisma.sport.delete({
            where: { id: parsedSportId }
        });
        return NextResponse.json({ message: "Sport deleted successfully" });
    } catch (error) {
        console.error("Error deleting sport: ", error);
        return NextResponse.json({ error: "Error deleting sport", status: 500 });
    }
}

export async function PATCH(req: Request) {
    const { sportId, name } = await req.json(); // Assuming these are the fields you want to update

    if (!sportId || !name) {
        return NextResponse.json({
            error: "Missing required fields",
            status: 400
        });
    }

    // Parse sportId to ensure it is a number
    const parsedSportId = parseInt(sportId, 10);
    if (isNaN(parsedSportId)) {
        return NextResponse.json({ error: "Invalid sport ID", status: 400 });
    }

    try {
        const sport = await prisma.sport.update({
            where: { id: parsedSportId },
            data: { name }
        });
        return NextResponse.json(sport);
    } catch (error) {
        console.error("Error updating sport: ", error);
        return NextResponse.json({ error: "Error updating sport", status: 500 });
    }
}
