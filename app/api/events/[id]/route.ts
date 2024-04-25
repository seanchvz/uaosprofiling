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

} export async function PATCH(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Authentication check
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }


        if (!req.query.id) {
            return res.status(400).json({ error: "Missing event ID" });
        }

        const eventId = parseInt(req.query.id as string, 10);
        if (isNaN(eventId)) {
            return res.status(400).json({ error: "Invalid event ID" });
        }

        const { name, startDate, endDate, Sport, eventDetails, isExternal, isInternal } = req.body;

        // Perform the update operation
        const updatedEvent = await prisma.events.update({
            where: { id: eventId },
            data: { name, startDate, endDate, Sport, eventDetails, isExternal, isInternal },
        });

        console.log("Event Updated: ", updatedEvent);
        return res.status(200).json(updatedEvent);
    } catch (error) {
        console.error('Error updating event:', error);
        return res.status(500).json({ error: "Error updating event", details: error.message });
    }
}