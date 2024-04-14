import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

/**
 * Deletes a coach profile.
 * @param req - The request object.
 * @param params - The parameters object containing the `id` of the coach profile to delete.
 * @returns A NextResponse object with the deleted coach profile or an error message.
 */
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const id = parseInt(params.id); // Parse id as number

        const coachProfile = await prisma.coachprofile.delete({
            where: {
                id,
            },
        });

        console.log("Coach Profile Deleted: ", coachProfile);

        return new NextResponse(JSON.stringify(coachProfile), { status: 200 });
    } catch (error) {
        console.log("Error Deleting Coach Profile: ", error);
        return new NextResponse(JSON.stringify({ error: "Error deleting event" }), { status: 500 });
    }
}
