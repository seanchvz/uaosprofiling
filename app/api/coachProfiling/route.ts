import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


/**
 * Handles the POST request for creating a coach profile.
 * @param req - The request object.
 * @returns A JSON response containing the created coach profile or an error message.
 */
export async function POST(req: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        }

        const { name, remarks, contactNumber, sport, permanentTeam, isMale, isFemale, emergencyContact, emergencyContactPerson, birthDate, nationality, weight, height, bloodType, academicYear, statusIsFulltime, statusIsParttime, resumeUrl, email } = await req.json();

        if (!name || !contactNumber || !sport || !permanentTeam || !nationality || !academicYear || !emergencyContact || !emergencyContactPerson) {
            return NextResponse.json({
                error: "Missing required fields",
                status: 400,
            });
        }
        if (name.length < 2) {
            return NextResponse.json({
                error: "The item name must be at least 2 characters long",
                status: 400,
            });
        }
        const formattedBirthDate = new Date(birthDate).toISOString(); // Parse the stockinDate value if necessary

        const coachProfile = await prisma.coachprofile.create({
            data: {
                name: name,
                contactNumber: contactNumber,
                sport: sport,
                permanentTeam: permanentTeam,
                isMale: isMale,
                isFemale: isFemale,
                emergencyContact: emergencyContact,
                emergencyContactPerson: emergencyContactPerson,
                birthDate: formattedBirthDate,
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
        console.log(coachProfile);
        return NextResponse.json(coachProfile);


    } catch (error) {
        console.log("Error Creating Coach Profile ", error);
        return NextResponse.json({ error: "Error Creating Coach Profile", status: 500 });

    }

}

/**
 * Retrieves coach profiles for a specific user.
 * @param req - The request object.
 * @returns A JSON response containing the coach profiles.
 */
export async function GET(req: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        }

        const coachProfile = await prisma.coachprofile.findMany({
            where: {
                userId,
            },
        });
        console.log("Coach Profiles: ", coachProfile);
        return NextResponse.json(coachProfile);
    } catch (error) {
        console.error("ERROR GETTING COACH PROFILES: ", error);
        return NextResponse.json({ error: "Error getting coach profiles", status: 500 });
    }
}

export async function PUT(req: Request) {
    const { userId } = auth();
    try {

    } catch (error) {
        console.log("Error Updating Coach Proffile: ", error);
        return NextResponse.json({ error: "Error Updating Coach Proffile", status: 500 });

    }

}

export async function DELETE(req: Request) {
    try {

    } catch (error) {
        console.log("Error deleting Coach Profile: ", error);
        return NextResponse.json({ error: "Error Deleting Coach Profile", status: 500 });

    }

}

export async function PATCH(req: Request) {
    try {

    } catch (error) {
        console.log("Error Updating Profile: ", error);
        return NextResponse.json({ error: "Error Updating Profile", status: 500 });

    }
}


