import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs"
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const id = parseInt(params.id); // Parse id as number

        const event = await prisma.events.delete({
            where: {
                id,
            },
        });
        console.log("Event Deleted: ", event);

        return new NextResponse(JSON.stringify(event), { status: 200 });
    } catch (error) {
        console.log("Error Deleting Event: ", error);
        return new NextResponse(JSON.stringify({ error: "Error deleting event" }), { status: 500 });
    }
}

export async function PATCH(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { userId } = await auth();
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const eventId = parseInt(req.query.id as string, 10);
        if (isNaN(eventId)) {
            res.status(400).json({ error: "Invalid event ID" });
            return;
        }

        const { name, startDate, endDate, eventDetails, Sport, isExternal, isInternal } = req.body;
        const updatedEvent = await prisma.events.update({
            where: { id: eventId, userId },
            data: {
                name,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                eventDetails,
                Sport,
                isExternal,
                isInternal,
            },
        });

        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error('Error Updating Event:', error);
        res.status(500).json({ error: "Error updating event" });
    }
}
