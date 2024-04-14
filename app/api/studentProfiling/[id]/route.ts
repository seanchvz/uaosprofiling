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

        const studentProfile = await prisma.studentprofile.delete({
            where: {
                id,
            },
        });

        console.log("Student Profile Deleted: ", studentProfile);

        return new NextResponse(JSON.stringify(studentProfile), { status: 200 });
    } catch (error) {
        console.log("Error Deleting Student Profile: ", error);
        return new NextResponse(JSON.stringify({ error: "Error deleting profile" }), { status: 500 });
    }
}
