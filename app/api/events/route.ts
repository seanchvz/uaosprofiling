import prisma from "@/app/utils/connect";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        }

        const { name, startDate, endDate, Sport, eventDetails, isExternal, isInternal } = await req.json();

        if (!name || !startDate || !endDate ) {
            return NextResponse.json({
                error: "Missing required fields",
                status: 400,
            });
        }

        if (name.length < 3) {
            return NextResponse.json({
                error: "The event name must be at least 3 characters long",
                status: 400,
            });
        }
       // console.log(name, startDate, endDate, SportId, eventDetails);
        const formattedStartDate = new Date().toISOString();
        const formattedEndDate = new Date().toISOString();
        const external = isExternal === "true"; // Assuming isExternal is a string "true" or "false"
        const internal = isInternal === "true";

        const event = await prisma.events.create({
            data: {
                name: name,
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                Sport: Sport,
                eventDetails: eventDetails,
                isExternal: external, 
                isInternal:internal,
                userId: userId,
            },
        });

        return NextResponse.json(event);
    } catch (error) {
        console.log("Error Creating Event: ", error);
        return NextResponse.json({ error: "Error creating event", status: 500 });
    }
}

export async function GET(req: Request){
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
          }
      
          const event = await prisma.events.findMany({
            where: {
              userId,
            },
          });
          return NextResponse.json(event);
  } catch (error) {
    console.log("ERROR GETTING TASKS: ", error);
    return NextResponse.json({ error: "Error updating event", status: 500 });
  }
}


export async function PUT(req: Request){
    try {
        
    } catch (error) {
        console.log("Error Updating Event: ", error);
        return NextResponse.json({ error: "Error Updating event", status: 500 });
        
    }
}

export async function Delete(req: Request){
    try {
        
    } catch (error) {
        console.log("Error Deleting Event: ", error);
        return NextResponse.json({ error: "Error Deleting event", status: 500 });
        
    }
}