import prisma from "@/app/utils/connect";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";


//post function
export async function POST(req: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        }

        const {
            firstName,
            middleName,
            lastName,
            contactNumber,
            landLineNumber,
            birthDate,
            nationality,
            weight,
            height,
            sportId,
            bloodType,
            academicYear,
            isMale,
            isFemale,
            yrStartedPlaying,
            mothersName,
            fathersName,
            guardiansName,
            courseAndYear,
            emergencyContactPerson,
            emergencyContactNumber,
            email,
            QPI,
            remarks,
            homeAddress,
            statusIsActive,
            statusIsInactive,
            eventIds,
            teamId,
        } = await req.json();

        // Ensure teamId is correctly parsed as an array of integers
        const teamIds = Array.isArray(teamId) ? teamId.map(id => parseInt(id)).filter(id => !isNaN(id)) : [];

        if (teamIds.length === 0) {
            return NextResponse.json({
                error: "Invalid Team IDs",
                status: 400
            });
        }

        // Validate required fields
        if (!firstName || !lastName || !email) {
            return NextResponse.json({
                error: "Missing required fields",
                status: 400,
            });
        }

        if (!contactNumber || isNaN(contactNumber)) {
            return NextResponse.json({
                error: "Invalid contact number",
                status: 400,
            });
        }

        if (!birthDate || isNaN(Date.parse(birthDate))) {
            return NextResponse.json({
                error: "Invalid birth date",
                status: 400,
            });
        }

        if (!Array.isArray(eventIds) || eventIds.some(id => typeof id !== 'number')) {
            return NextResponse.json({
                error: "Invalid student IDs",
                status: 400,
            });
        }

        // if (!Array.isArray(teamId) || teamId.some(id => typeof id !== 'number')) {
        //     return NextResponse.json({
        //         error: "Invalid student IDs",
        //         status: 400,
        //     });
        // }

        const formattedBirthDate = new Date(birthDate).toISOString();

        // Create student profile
        const student = await prisma.studentprofile.create({
            data: {
                firstName,
                middleName,
                lastName,
                contactNumber,
                landLineNumber,
                birthDate: formattedBirthDate,
                nationality,
                weight,
                height,
                bloodType,
                academicYear,
                isMale,
                isFemale,
                yrStartedPlaying,
                mothersName,
                fathersName,
                guardiansName,
                courseAndYear,
                emergencyContactPerson,
                emergencyContactNumber,
                email,
                QPI,
                homeAddress,
                statusIsActive,
                statusIsInactive,
                remarks,
                userId,
                sportId,
                // teams: {
                //     connect: teamId.map(id => ({ id }))
                // },
                events: {
                    connect: eventIds.map(id => ({ id })),
                },
            },
            include: {
                sport: true,
                events: true,
                // teams: true,
            }
        });

        console.log("STUDENT CREATED ", student);
        return NextResponse.json(student);
    } catch (error) {
        console.error("Error creating Student Profile: ", error);
        return NextResponse.json({ error: "Error Creating Student Profile", status: 500 });
    }
}


export async function GET() {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        }

        const students = await prisma.studentprofile.findMany({
            include: {
                events: true,  // Include connected events if necessary
                sport: true,
                teams: true,   // Include sport details if relevant to the profile
            }
        });

        console.log("STUDENT: ", students);
        return NextResponse.json(students);

    } catch (error) {
        console.log("ERROR GETTING STUDENTS: ", error);
        return NextResponse.json({ error: "Error updating Student", status: 500 });
    }
}

//update function
export async function PUT(req: Request) {
    try {

    } catch (error) {
        console.log("Error Updating profile: ", error);
        return NextResponse.json({ error: "Error Updating profile", status: 500 });

    }
}

//delete function
export async function Delete(req: Request) {
    try {

    } catch (error) {
        console.log("Error Deleting profile: ", error);
        return NextResponse.json({ error: "Error Deleting profile", status: 500 });

    }
}