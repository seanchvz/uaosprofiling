import prisma from "@/app/utils/connect";
import { NextResponse } from "next/server";




export async function DELETE(req: Request, { params }: { params: { id: string } }) {


    const sportId = (params.id);  // Parse id as number

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