import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createCartSchema } from "../validationSchema";

// POST /api/orders - Create a new order
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate incoming data
    const validation = createCartSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const newCart = await prisma.cart.create({
      data: {
        user_id: body.user_id,
        flower_id: body.flower_id,
        quantity: body.quantity,
      },
    });

    return NextResponse.json(newCart, { status: 201 });
  } catch (error) {
    console.error("Error creating cart:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export const GET = async (req: NextRequest) => {
  const carts = await prisma.cart.findMany({
    include: {
      flower: true,
    },
  });
  return NextResponse.json(carts, { status: 200 });
};

export const DELETE = async (req: NextRequest) => {
  try {
    const deletedCarts = await prisma.cart.deleteMany({});
    return NextResponse.json(deletedCarts, { status: 200 });
  } catch (error) {
    console.error("Error deleting carts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
