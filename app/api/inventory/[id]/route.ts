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

        const Item = await prisma.inventoryitem.delete({
            where: {
                id,
            },
        });

        console.log("Item Deleted: ", Item);

        return new NextResponse(JSON.stringify(Item), { status: 200 });
    } catch (error) {
        console.log("Error Deleting Item: ", error);
        return new NextResponse(JSON.stringify({ error: "Error deleting Item" }), { status: 500 });
    }
}
