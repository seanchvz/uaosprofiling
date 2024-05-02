// pages/api/studentEvent.js
import prisma from '@/app/utils/connect';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { eventId, studentIds } = req.body;

        // Validate the inputs
        if (!eventId || !studentIds || !studentIds.length) {
            return res.status(400).json({ message: "Missing eventId or studentIds" });
        }

        try {
            // Create student-event associations
            const createdAssociations = await prisma.studentEvent.createMany({
                data: studentIds.map(studentId => ({
                    eventId,
                    studentId
                })),
                skipDuplicates: true, // Optionally skip duplicates
            });

            res.status(201).json({ message: "Student-event relationships created successfully", data: createdAssociations });
        } catch (error) {
            console.error('Failed to create student-event relationships:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {



        const { eventId, studentId } = req.query;

        // Validate the query parameters
        if (!eventId && !studentId) {
            return res.status(400).json({
                error: "Missing required query parameters: either eventId or studentId"
            });
        }

        let associations;

        if (eventId) {
            // Fetch all student-event associations for a given event
            associations = await prisma.studentEvent.findMany({
                where: { eventId: Number(eventId) },
                include: {
                    student: true, // Assuming relation name is 'student'
                }
            });
        } else if (studentId) {
            // Fetch all student-event associations for a given student
            associations = await prisma.studentEvent.findMany({
                where: { studentId: Number(studentId) },
                include: {
                    event: true, // Assuming relation name is 'event'
                }
            });
        }

        // Return the fetched associations
        return res.status(200).json(associations);
    } catch (error) {
        console.error("Error retrieving student-event associations: ", error);
        return res.status(500).json({ error: "Error retrieving student-event associations" });
    }
}
