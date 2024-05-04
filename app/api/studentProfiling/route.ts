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
            id,
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
            emergencyContactPerson,
            emergencyContactNumber,
            email,
            remarks,
            homeAddress,
            statusIsActive,
            statusIsInactive,
            eventIds,
        } = await req.json();

        // Check if firstName, lastName, and email are provided
        if (!firstName || !lastName || !email) {
            return NextResponse.json({
                error: "Missing required fields",
                status: 400,
            });
        }

        // Check if email is valid
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({
                error: "Invalid email format",
                status: 400,
            });
        }

        // Check if contactNumber is provided and is a valid number
        if (!contactNumber || isNaN(contactNumber)) {
            return NextResponse.json({
                error: "Invalid contact number",
                status: 400,
            });
        }

        // Check if birthDate is provided and is a valid date
        if (!birthDate || isNaN(Date.parse(birthDate))) {
            return NextResponse.json({
                error: "Invalid birth date",
                status: 400,
            });
        }

        const formattedBirthDate = new Date(birthDate).toISOString();

        const student = await prisma.studentprofile.create({
            data: {
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                contactNumber: contactNumber,
                birthDate: formattedBirthDate,
                nationality: nationality,
                weight: weight,
                height: height,
                sport: sport,
                bloodType: bloodType,
                academicYear: academicYear,
                isMale: isMale,
                isFemale: isFemale,
                yrStartedPlaying: yrStartedPlaying,
                mothersName: mothersName,
                fathersName: fathersName,
                guardiansName: guardiansName,
                courseAndYear: courseAndYear,
                emergencyContactPerson: emergencyContactPerson,
                emergencyContactNumber: emergencyContactNumber,
                email: email,
                homeAddress: homeAddress,
                statusIsActive: statusIsActive,
                statusIsInactive: statusIsInactive,
                remarks: remarks,
                userId: userId,
                events: {
                    connect: eventIds.map((id: string) => ({ id }))
                }
            },
            include: {
                events: true // Include connected events in the response
            }
        });


        console.log("STUDENT CREATED ", student);

        return NextResponse.json(student);
    } catch (error) {
        console.log("Error creating Student Profile: ", error);
        return NextResponse.json({ error: "Error Creating Student Profile:", status: 500 });
    }
}


//get rfunction
export async function GET(req: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        }

        const student = await prisma.studentprofile.findMany({
            where: {
                userId,
            },
            include: {
                events: true // Include the students in the response for verification
            }
        });

        console.log("STUDENT: ", student);
        return NextResponse.json(student);

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