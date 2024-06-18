import { NextRequest, NextResponse } from "next/server";
import { createUserSchema } from "../validationSchema";
import prisma from "@/prisma/client";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = createUserSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  try {
    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        email: body.email,
        role: "BUYER",
        phone: body.phone,
        address: body.address,
      },
    });
    return NextResponse.json(newUser, { status: 201 });
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
