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
        } = await req.json();

        if (!firstName || !lastName) {
            return NextResponse.json({
                error: "Missing required fields",
                status: 400,
            });
        }

        if (email.length < 3) {
            return NextResponse.json({
                error: "The email must contain a domain",
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
            },
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
        });

        console.log("STUDENT: ", student);
        return NextResponse.json(student);

    } catch (error) {
        console.log("ERROR GETTING TASKS: ", error);
        return NextResponse.json({ error: "Error updating event", status: 500 });
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