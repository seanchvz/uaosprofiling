import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { id } = req.query; // Assuming id is passed as a query parameter
        const teamId = parseInt(id as string);

        if (isNaN(teamId)) {
            return res.status(400).json({ error: "Invalid Team ID" });
        }

        const team = await prisma.team.delete({
            where: { id: teamId },
        });

        console.log("Team Deleted:", team);
        return res.status(200).json(team);
    } catch (error) {
        console.error("Error Deleting Team:", error);
        return res.status(500).json({ error: "Error deleting team" });
    }
}

export async function PATCH(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { id } = req.query; // Assuming id is passed as a query parameter
        const teamId = parseInt(id as string);

        if (isNaN(teamId)) {
            return res.status(400).json({ error: "Invalid Team ID" });
        }

        const { teamName, eventId, studentIds } = req.body;

        if (!Array.isArray(studentIds) || studentIds.some(id => typeof id !== 'number')) {
            return res.status(400).json({ error: "Invalid student IDs" });
        }

        // Perform the update operation
        const updatedTeam = await prisma.team.update({
            where: { id: teamId },
            data: {
                teamName,
                eventId: eventId,
                students: {
                    set: studentIds.map(id => ({ id })) // Replace existing students relationships
                }
            },
            include: {
                students: true // Include the students in the response for verification
            }
        });

        console.log("Team Updated:", updatedTeam);
        return res.status(200).json(updatedTeam);
    } catch (error) {
        console.error('Error updating team:', error);
        return res.status(500).json({ error: "Error updating team" });
    }
}
