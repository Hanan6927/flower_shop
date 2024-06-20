import { NextRequest, NextResponse } from "next/server";
import { createUserSchema } from "../validationSchema";
import prisma from "@/prisma/client";
import bcrypt from "bcryptjs";
import { signToken } from "@/app/utils/jwt";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = createUserSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        password: hashedPassword,
        email: body.email,
        role: "BUYER",
        phone: body.phone,
        address: body.address,
      },
    });
    const token = signToken({ userId: newUser.user_id, role: newUser.role });
    return NextResponse.json({ token }, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      include: { orders: true, cartItems: true },
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await prisma.order.deleteMany({}),
      await prisma.cart.deleteMany({}),
      await prisma.user.deleteMany({});

    return NextResponse.json(
      { message: "Users deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting flowers and categories:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
