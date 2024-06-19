import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createOrderItemSchema } from "../validationSchema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = createOrderItemSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    const newOrderItem = await prisma.orderItem.create({
      data: {
        order_id: body.order_id,
        flower_id: body.flower_id,
        quantity: body.quantity || 1, // Default quantity to 1 if not provided
        price: body.price,
      },
    });
    const updatedFlower = await prisma.flower.update({
      where: { flower_id: body.flower_id },
      data: {
        orderItems: {
          connect: { order_item_id: newOrderItem.order_item_id }, // Connecting the new flower to the category
        },
      },
      include: {
        orderItems: true, // Including the flowers in the response
      },
    });
    return NextResponse.json(newOrderItem, { status: 201 });
  } catch (error) {
    console.error("Error creating order item:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await prisma.orderItem.deleteMany({});

    return NextResponse.json(
      { message: "All order items deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting order items", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const orderItems = await prisma.orderItem.findMany({});
  return NextResponse.json(orderItems, { status: 200 });
}
