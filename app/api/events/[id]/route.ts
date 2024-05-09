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
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        // Authentication check
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        console.log('Params:', params);
        const { id: eventId } = params;

        if (!eventId) {
            return new NextResponse("Missing Event ID", { status: 400 });
        }

        if (isNaN(+eventId)) {
            return new NextResponse("Invalid Event ID", { status: 400 });
        }

        const body = await req.json();
        const { name, startDate, endDate, Sport, eventDetails, isExternal, isInternal, studentIds } = body;

        if (!Array.isArray(studentIds) || studentIds.some(id => typeof id !== 'number')) {
            return new NextResponse("Invalid student IDs", { status: 400 });
        }

        // Perform the update operation
        const updatedEvent = await prisma.events.update({
            where: { id: +eventId },
            data: {
                name,
                startDate,
                endDate,
                Sport,
                eventDetails,
                isExternal,
                isInternal,
                students: {
                    set: studentIds.map(id => ({ id })) // Use 'set' to replace existing relationships
                }
            },
            include: {
                students: true // Include the students in the response for verification
            }
        });

        console.log("Event Updated: ", updatedEvent);
        return new NextResponse(JSON.stringify(updatedEvent), { status: 200 }); // Ensure to return JSON stringified response
    } catch (error) {
        console.error('Error updating event:', error);
        return new NextResponse("Error updating event", { status: 500 });
    }
}


// // Function to add a student to an event
// export async function addStudentToEvent(req: NextApiRequest, res: NextApiResponse) {
//     const { userId } = auth();
//     if (!userId) {
//         return NextResponse.json({ error: "Unauthorized", status: 401 });
//     }

//     const { eventId, studentId } = await req.json();

//     try {
//         const link = await prisma.studentEvent.create({
//             data: {
//                 eventId: eventId,
//                 studentId: studentId,
//             },
//         });
//         return NextResponse.json(link);
//     } catch (error) {
//         console.log("Error adding student to event: ", error);
//         return NextResponse.json({ error: "Error adding student to event", status: 500 });
//     }
// }

// // Function to remove a student from an event
// export async function removeStudentFromEvent(req: NextApiRequest, res: NextApiResponse) {
//     const { userId } = auth();
//     if (!userId) {
//         return NextResponse.json({ error: "Unauthorized", status: 401 });
//     }

//     const { eventId, studentId } = await req.json();

//     try {
//         const unlink = await prisma.studentEvent.delete({
//             where: {
//                 eventId_studentId: {
//                     eventId: eventId,
//                     studentId: studentId,
//                 },
//             },
//         });
//         return NextResponse.json(unlink);
//     } catch (error) {
//         console.log("Error removing student from event: ", error);
//         return NextResponse.json({ error: "Error removing student from event", status: 500 });
//     }
// }

// // Function to list all students for a specific event
// export async function getStudentsForEvent(req: NextApiRequest, res: NextApiResponse) {
//     const { userId } = auth();
//     if (!userId) {
//         return NextResponse.json({ error: "Unauthorized", status: 401 });
//     }

//     const { eventId } = await req.json();

//     try {
//         const eventWithStudents = await prisma.events.findUnique({
//             where: { id: eventId },
//             include: {
//                 attendees: {
//                     include: {
//                         studentProfile: true,
//                     },
//                 },
//             },
//         });
//         return NextResponse.json(eventWithStudents);
//     } catch (error) {
//         console.log("Error getting students for event: ", error);
//         return NextResponse.json({ error: "Error getting students for event", status: 500 });
//     }
// }