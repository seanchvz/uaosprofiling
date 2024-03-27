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

        const { firstName, middleName, lastName, birthDate, age, nationality, civilStatus, isMale, isFemale, yrStartedPlaying, mothersName, fathersName, courseAndYear, contactNumber, email, homeAddress, weight, height, bloodType} = await req.json();

        if (!firstName || !lastName ) {
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
        
       // console.log(name, startDate, endDate, SportId, eventDetails);
        // const formattedStartDate = new Date().toISOString();
        const formattedbirthDate = new Date().toISOString();
        const male = isMale === "true"; // Assuming isMale is a string "true" or "false"
        const female = isFemale === "true";

        const student = await prisma.studentProfile.create({
            data: {
                
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                birthDate: formattedbirthDate,
                age: age,
                nationality: nationality, 
                civilStatus: civilStatus,
                isMale: male,
                isFemale: female,
                yrStartedPlaying: yrStartedPlaying,
                mothersName: mothersName,
                fathersName: fathersName,
                courseAndYear: courseAndYear,
                contactNumber: contactNumber,
                email: email,
                homeAddress: homeAddress,
                weight: weight,
                height: height,
                bloodType: bloodType,
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
export async function GET(req: Request){
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
          }
      
        //   const student = await prisma.studentProfile.findMany({
        //     where: {
        //       userId,
        //     },
        //   });

        //   console.log("STUDENT: ", student);
        //   return NextResponse.json(student);
          return NextResponse.json([]);
    } catch (error) {
    console.log("ERROR GETTING TASKS: ", error);
    return NextResponse.json({ error: "Error updating event", status: 500 });
  }
}

//update function
export async function PUT(req: Request){
    try {
        
    } catch (error) {
        console.log("Error Updating profile: ", error);
        return NextResponse.json({ error: "Error Updating profile", status: 500 });
        
    }
}

//delete function
export async function Delete(req: Request){
    try {
        
    } catch (error) {
        console.log("Error Deleting profile: ", error);
        return NextResponse.json({ error: "Error Deleting profile", status: 500 });
        
    }
}