import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";




export async function POST(req:Request) {
    try {
        const {userId}=auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
          }

          const {item, quantity, supplier, stockinDate} = await req.json();
          
          if (!item || !quantity || !supplier || !stockinDate) {
            return NextResponse.json({
                error: "Missing required fields",
                status: 400,
            });
        }
        if (item.length < 3) {
            return NextResponse.json({
                error: "The item name must be at least 3 characters long",
                status: 400,
            });
        }
        const formattedstockinDate = new Date(stockinDate).toISOString(); // Parse the stockinDate value if necessary
        const InventoryItem = await prisma.inventoryitem.create({
          data: {
            item: item,
            quantity: quantity,
            supplier: supplier,
            stockinDate: formattedstockinDate,
            userId: userId,
          },
        });
    return NextResponse.json(InventoryItem);
       
        
    } catch (error) {
        console.log("Error Creating Inventory Item: ", error);
        return NextResponse.json({error: "Error Creating Inventory Item", status:500});
        
    }
    
}

export async function GET(req: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        }
      
        const inventoryItems = await prisma.inventoryitem.findMany({
            where: {
                userId,
            },
        });
        console.log("INVENTORY ITEMS: ", inventoryItems);
        return NextResponse.json(inventoryItems);
    } catch (error) {
        console.error("ERROR GETTING INVENTORY ITEMS: ", error);
        return NextResponse.json({ error: "Error getting inventory items", status: 500 });
    }
}

export async function PUT(req:Request) {
    const {userId}=auth();
    try {
        
    } catch (error) {
        console.log("Error Updating Inventory Item: ", error);
        return NextResponse.json({error: "Error Updating Inventory Item", status:500});
        
    }
    
}

export async function DELETE(req:Request) {
    try {
        
    } catch (error) {
        console.log("Error deleting Inventory Item: ", error);
        return NextResponse.json({error: "Error Deleting Inventory Item", status:500});
        
    }
    
}