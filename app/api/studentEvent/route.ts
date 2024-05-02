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
