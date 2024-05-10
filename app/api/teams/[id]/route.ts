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
        const { sportId, teamName, studentIds } = body;

        if (!Array.isArray(studentIds) || studentIds.some(id => typeof id !== 'number')) {
            return new NextResponse("Invalid student IDs", { status: 400 });
        }

        const updatedTeam = await prisma.team.update({
            where: { id: +teamId },
            data: {
                sportId,
                teamName,
                students: {
                    set: studentIds.map(id => ({ id })) // Use 'set' to replace existing relationships
                }
            },
            include: {
                students: true,
                sport: true // Include the students in the response for verification
            }
        });

        console.log("Team Updated: ", updatedTeam);
        return new NextResponse(JSON.stringify(updatedTeam), { status: 200 });
    } catch (error) {
        console.error('Error updating team:', error);
        return new NextResponse(JSON.stringify({ error: "Error updating team" }), { status: 500 });
    }
}
