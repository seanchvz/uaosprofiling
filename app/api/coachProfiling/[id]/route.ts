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
        return new NextResponse(JSON.stringify({ error: "Error deleting Coach" }), { status: 500 });
    }
}




export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const { id: coachprofileId } = params

        if (!coachprofileId) {
            return new NextResponse("Missing Coach Profile ID", { status: 400 });
        }

        if (isNaN(+coachprofileId)) {
            return new NextResponse("Invalid Coach Profile ID", { status: 400 });
        }

        const body = await req.json();

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
        } = body;

        // Perform the update operation

        const updatedCoachProfile = await prisma.coachprofile.update({
            where: { id: +coachprofileId },
            data: {
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
            },
        });

        console.log("Profile Updated: ", updatedCoachProfile);
        return new NextResponse("Coach Updated: ", { status: 200 });
    } catch (error) {
        console.error('Error updating coach:', error);
        return new NextResponse("Error updating coach");
    }
}

