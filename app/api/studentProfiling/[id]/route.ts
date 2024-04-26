import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PATCH') {
        await PATCH(req, res);
    } else if (req.method === 'DELETE') {
        await DELETE(req, res);
    } else {
        res.setHeader('Allow', ['PATCH', 'DELETE']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
export async function PATCH(req: NextApiRequest, res: NextApiResponse) {
    // Assuming the student's ID is provided in the URL as a dynamic route parameter
    const studentId = parseInt(req.query.id as string);

    // Your update data should come in the body of the request
    const updateData = req.body;

    try {
        // Use Prisma Client to update the student profile in the database
        const updatedStudentProfile = await prisma.studentprofile.update({
            where: {
                id: studentId, // This needs to match the primary key type of your StudentProfile model
            },
            data: updateData, // This is the new data for the student profile
        });

        // Send back the updated student profile as a response
        res.status(200).json(updatedStudentProfile);
    } catch (error) {
        // If the student profile doesn't exist or the database update fails, send an error response
        console.error("Failed to update the student profile: ", error);
        res.status(500).json({ message: "Failed to update the student profile", error });
    }
}

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