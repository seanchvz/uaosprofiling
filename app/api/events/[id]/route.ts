import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const id = parseInt(params.id); // Parse id as number

        const event = await prisma.events.delete({
            where: {
                id,
            },
        });

        console.log("Event Deleted: ", event);

        return new NextResponse(JSON.stringify(event), { status: 200 });
    } catch (error) {
        console.log("Error Deleting Event: ", error);
        return new NextResponse(JSON.stringify({ error: "Error deleting event" }), { status: 500 });
    }
}


// import prisma from "@/app/utils/connect";
// import { auth } from "@clerk/nextjs";
// import { NextResponse } from "next/server";

// export async function DELETE(
//     req: Request, 
//     {params}:{params:{id:string}}
//     ){
//     try {
//         const {userId}=auth();
//         const {id} = params;

//         if (!userId) {
//             return new NextResponse("Unauthorized", { status: 401 });
//           }
        
//           const event = await prisma.event.delete({
//             where: {
//               id,
//             },
//           });

//           console.log("Event Deleted: ", event);
//           return NextResponse.json(event);

//     } catch (error) {
//         console.log("Error Deleting Event: ", error);
//         return NextResponse.json({error:"Error deleting event", status: 500})
//     }
// }