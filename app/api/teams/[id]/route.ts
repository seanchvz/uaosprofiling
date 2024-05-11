import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

/**
 * DELETE endpoint to remove a team by its ID.
 *
 * @param req - The request object.
 * @param params - Route parameters containing the team ID.
 * @returns A response indicating the success or failure of the deletion.
 */
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const id = parseInt(params.id);  // Parse id as number

        const deletedTeam = await prisma.team.delete({
            where: {
                id,
            },
        });

        console.log("Team Deleted: ", deletedTeam);
        return new NextResponse(JSON.stringify(deletedTeam), { status: 200 });
    } catch (error) {
        console.log("Error Deleting Team: ", error);
        return new NextResponse(JSON.stringify({ error: "Error deleting team" }), { status: 500 });
    }
}

/**
 * PATCH endpoint to update details of a team.
 *
 * @param req - The request object.
 * @param params - Route parameters containing the team ID.
 * @returns A response indicating the success or failure of the update.
 */
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { id: teamId } = params;

        if (!teamId) {
            return new NextResponse("Missing Team ID", { status: 400 });
        }

        if (isNaN(+teamId)) {
            return new NextResponse("Invalid Team ID", { status: 400 });
        }

        const body = await req.json();
        const { sportId, eventIds, teamName, studentIds, year } = body;

        if (!Array.isArray(studentIds) || studentIds.some(id => typeof id !== 'number')) {
            return new NextResponse("Invalid student IDs", { status: 400 });
        }

        if (!Array.isArray(eventIds)) {
            return new NextResponse("Invalid event IDs", { status: 400 });
        }

        // Format the year similarly to the first code snippet
        const formattedYear = new Date(year);
        if (isNaN(formattedYear.getTime())) {
            return new NextResponse("Invalid year format", { status: 400 });
        }


        const updatedTeam = await prisma.team.update({
            where: { id: +teamId },
            data: {
                sportId,
                teamName,
                year: formattedYear,
                students: {
                    set: studentIds.map(id => ({ id })) // Use 'set' to replace existing relationships
                },
                events: {
                    set: eventIds.map(id => ({ id })) // Replace existing connections with new ones
                }
            },
            include: {
                students: true,
                sport: true,
                events: true // Include the students in the response for verification
            }
        });

        console.log("Team Updated: ", updatedTeam);
        return new NextResponse(JSON.stringify(updatedTeam), { status: 200 });
    } catch (error) {
        console.error('Error updating team:', error);
        return new NextResponse(JSON.stringify({ error: "Error updating team" }), { status: 500 });
    }
}
