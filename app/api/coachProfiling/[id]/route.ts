import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils";
import { NextResponse } from "next/server";

/**
 * Deletes a coach profile.
 * @param req - The request object.
 * @param params - The parameters object containing the `id` of the coach profile to delete.
 * @returns A NextResponse object with the deleted coach profile or an error message.
 */
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const id = parseInt(params.id); // Parse id as number

        const coachProfile = await prisma.coachprofile.delete({
            where: {
                id,
            },
        });

        console.log("Coach Profile Deleted: ", coachProfile);

        return new NextResponse(JSON.stringify(coachProfile), { status: 200 });
    } catch (error) {
        console.log("Error Deleting Coach Profile: ", error);
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

        const coachId = parseInt(req.query.id as string, 10);
        if (isNaN(coachId)) {
            res.status(400).json({ error: "Invalid event ID" });
            return;
        }

        const {
            name,
            contactNumber,
            sport,
            permanentTeam,
            isMale,
            isFemale,
            emergencyContact,
            emergencyContactPerson,
            birthDate,
            nationality,
            weight,
            height,
            bloodType,
            academicYear,
            statusIsFulltime,
            statusIsParttime,
            resumeUrl,
            email,
            remarks,
        } = req.body;

        const updatedCoachProfile = await prisma.coachprofile.update({
            where: { id: coachId, userId },
            data: {
                name: name,
                contactNumber: contactNumber,
                sport: sport,
                permanentTeam: permanentTeam,
                isMale: isMale,
                isFemale: isFemale,
                emergencyContact: emergencyContact,
                emergencyContactPerson: emergencyContactPerson,
                birthDate: new Date(birthDate),
                nationality: nationality,
                weight: weight,
                height: height,
                bloodType: bloodType,
                academicYear: academicYear,
                statusIsFulltime: statusIsFulltime,
                statusIsParttime: statusIsParttime,
                resumeUrl: resumeUrl,
                email: email,
                remarks: remarks,
                userId: userId,
            },
        });

        res.status(200).json(updatedCoachProfile);
    } catch (error) {
        console.error('Error Updating Event:', error);
        res.status(500).json({ error: "Error updating event" });
    }
}

