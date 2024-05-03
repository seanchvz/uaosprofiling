import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next";

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const id = parseInt(params.id); // Parse id as number

        const studentProfile = await prisma.studentprofile.delete({
            where: {
                id,
            },
        });

        console.log("Student Profile Deleted: ", studentProfile);

        return new NextResponse(JSON.stringify(studentProfile), { status: 200 });
    } catch (error) {
        console.log("Error Deleting Student Profile: ", error);
        return new NextResponse(
            JSON.stringify({ error: "Error deleting profile" }),
            { status: 500 }
        );
    }
}
export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const { id: studentprofileId } = params;

        if (!studentprofileId) {
            return new NextResponse("Missing Student Profile ID", { status: 400 });
        }

        if (isNaN(+studentprofileId)) {
            return new NextResponse("Invalid Student Profile ID", { status: 400 });
        }

        const body = await req.json();

        const {
            firstName,
            middleName,
            lastName,
            contactNumber,
            birthDate,
            nationality,
            weight,
            height,
            sport,
            bloodType,
            academicYear,
            isMale,
            isFemale,
            yrStartedPlaying,
            mothersName,
            fathersName,
            guardiansName,
            courseAndYear,
            emergencyContactNumber,
            emergencyContactPerson,
            email,
            homeAddress,
            statusIsActive,
            statusIsInactive,
            remarks,
            id,
            eventIds,
        } = body;

        // Perform the update operation
        //If events is the event is not an array, if statement is executed
        if (!Array.isArray(eventIds)) {
            return new NextResponse("Invalid event IDs", { status: 400 });
        }

        const updatedStudentProfile = await prisma.studentprofile.update({
            where: { id: +studentprofileId },
            data: {
                firstName,
                middleName,
                lastName,
                contactNumber,
                birthDate,
                nationality,
                weight,
                height,
                sport,
                bloodType,
                academicYear,
                isMale,
                isFemale,
                yrStartedPlaying,
                mothersName,
                fathersName,
                guardiansName,
                courseAndYear,
                emergencyContactNumber,
                emergencyContactPerson,
                email,
                homeAddress,
                statusIsActive,
                statusIsInactive,
                remarks,
                id,
                // Creating new Array of objects with id property
                events: {
                    set: eventIds.map(id => ({ id })) // Replace existing connections with new ones
                }
            },
            // Include related 'events' in the response for verification of successful update
            include: {
                events: true // Include connected events in the response for verification
            }
        });

        console.log("Profile Updated: ", updatedStudentProfile);
        return new NextResponse("Student Updated: ", { status: 200 });
    } catch (error) {
        console.error("Error updating coach:", error);
        return new NextResponse("Error updating coach");
    }
}