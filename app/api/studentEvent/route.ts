import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/app/utils/connect';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
    try {

    } catch (error) {
        console.log("Error Posting Event: ", error);
        return NextResponse.json({ error: "Error Posting event", status: 500 });

    }
}