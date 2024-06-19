import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createCartSchema } from "../../validationSchema";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Ensure the id is a valid integer
    const cartId = parseInt(id, 10);
    if (isNaN(cartId)) {
      return NextResponse.json({ error: "Invalid cart ID" }, { status: 400 });
    }

    const cart = await prisma.cart.findUnique({
      where: { cart_id: cartId },
    });

    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Ensure the id is a valid integer
    const cartId = parseInt(id, 10);
    if (isNaN(cartId)) {
      return NextResponse.json({ error: "Invalid cart ID" }, { status: 400 });
    }

    const cart = await prisma.cart.findUnique({
      where: { cart_id: cartId },
    });

    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    const body = await request.json();
    const validation = createCartSchema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    const updatedCart = await prisma.cart.update({
      where: { cart_id: cartId },
      data: {
        user_id: body.user_id,
        flower_id: body.flower_id,
        quantity: body.quantity,
      },
    });
    return NextResponse.json(updatedCart, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Ensure the id is a valid integer
    const cartId = parseInt(id, 10);
    if (isNaN(cartId)) {
      return NextResponse.json({ error: "Invalid cart ID" }, { status: 400 });
    }

    const cart = await prisma.cart.findUnique({
      where: { cart_id: cartId },
    });

    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    const deleteCart = await prisma.cart.delete({
      where: { cart_id: cartId },
    });
    return NextResponse.json(
      { message: "Cart deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
