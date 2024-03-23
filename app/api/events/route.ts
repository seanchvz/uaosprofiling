import prisma from "@/app/utils/connect";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import events from "events";

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


        const event = await prisma.events.create({
            data: {
                name: name,
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                Sport: Sport,
                eventDetails: eventDetails,
                isExternal: isExternal, 
                isInternal: isInternal,
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
          console.log("EVENTS: ", events);
          return NextResponse.json(event);
  } catch (error) {
    console.log("ERROR GETTING EVENTS: ", error);
    return NextResponse.json({ error: "Error updating event", status: 500 });
  }
}


export async function PUT(req: Request){
    const {userId}=auth();
    
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