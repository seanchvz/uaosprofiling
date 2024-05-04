import prisma from "@/app/utils/connect";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from "@clerk/nextjs";


/**
 * Handles the HTTP POST request for creating an event.
 * 
 * @param req - The request object.
 * @param res - The response object.
 * @returns A JSON response containing the created event or an error message.
 */export async function POST(req: Request, res: NextApiResponse) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        }

        const { name, startDate, endDate, Sport, eventDetails, isExternal, isInternal, studentIds } = await req.json();

        if (!name || !startDate || !endDate || !studentIds) {
            return NextResponse.json({
                error: "Missing required fields",
                status: 400,
            });
        }

        if (name.length < 3) {
            return NextResponse.json({
                error: "The event name must be at least 3 characters long",
                status: 400,
            });
        }

        if (!Array.isArray(studentIds) || studentIds.some(id => typeof id !== 'number')) {
            return NextResponse.json({
                error: "Invalid student IDs",
                status: 400,
            });
        }


        const formattedStartDate = new Date(startDate).toISOString();
        const formattedEndDate = new Date(endDate).toISOString();

        const event = await prisma.events.create({
            data: {
                name: name,
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                Sport: Sport,
                eventDetails: eventDetails,
                isExternal: isExternal,
                isInternal: isInternal,
                userId: userId,
                students: {
                    connect: studentIds.map(id => ({ id }))
                }
            },
            include: {
                students: true // Include the students in the response for verification
            }
        });

        console.log("Received data:", req.body);
        console.log("Sending event data:", event);

        return NextResponse.json(event);
    } catch (error) {
        console.log("Error Creating Event: ", error);
        return NextResponse.json({ error: "Error creating event", status: 500 });
    }
}



export async function GET(req: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        }

        const event = await prisma.events.findMany({
            where: {
                userId,
            },
            include: {
                students: true // Include the students in the response for verification
            }
        });
        //   console.log("EVENTS: ", events);
        return NextResponse.json(event);
    } catch (error) {
        console.log("ERROR GETTING EVENTS: ", error);
        return NextResponse.json({ error: "Error updating event", status: 500 });
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





// export async function PATCH(req: Request) {
//     // Authenticate the user
//     const { userId } = auth();
//     if (!userId) {
//         return NextResponse.json({ error: "Unauthorized", status: 401 });
//     }

//     try {
//         const url = new URL(req.url);
//         const eventId = parseInt(url.pathname.split('/').pop() || "", 10);  // Parse event ID safely

//         if (isNaN(eventId)) {
//             return NextResponse.json({ error: "Invalid event ID", status: 400 });
//         }

//         const {
//             name,
//             startDate,
//             endDate,
//             Sport,
//             eventDetails,
//             isExternal,
//             isInternal
//         } = await req.json();

//         const updateData: any = {};
//         if (name) updateData.name = name;
//         if (startDate) updateData.startDate = new Date(startDate).toISOString();
//         if (endDate) updateData.endDate = new Date(endDate).toISOString();
//         if (Sport !== undefined) updateData.Sport = Sport;
//         if (eventDetails !== undefined) updateData.eventDetails = eventDetails;
//         if (isExternal !== undefined) updateData.isExternal = isExternal;
//         if (isInternal !== undefined) updateData.isInternal = isInternal;

//         // Perform the update
//         const updatedEvent = await prisma.events.update({
//             where: { id: eventId },  // Use parsed ID
//             data: updateData
//         });

//         console.log("Updated Event: ", updatedEvent);
//         return NextResponse.json(updatedEvent);
//     } catch (error) {
//         console.error("Error Updating Event: ", error);
//         return NextResponse.json({ error: "Error updating event", status: 500 });
//     }
// }