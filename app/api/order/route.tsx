import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createOrderSchema } from "../validationSchema";

// POST /api/orders - Create a new order
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate incoming data
    const validation = createOrderSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const newOrder = await prisma.order.create({
      data: {
        user_id: body.user_id,
        total_amount: body.total_amount,
        status: "PENDING",
      },
      include: {
        // Include user details in response
        orderItems: true, // Include order items in response
      },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export const GET = async (req: NextRequest) => {
  const orders = await prisma.order.findMany();
  return NextResponse.json(orders, { status: 200 });
};

export const DELETE = async (req: NextRequest) => {
  try {
    const deletedOrders = await prisma.order.deleteMany({});
    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    console.error("Error deleting orders:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
