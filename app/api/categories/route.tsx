import { NextRequest, NextResponse } from "next/server";
import { createCategorySchema } from "../validationSchema";
import prisma from "@/prisma/client";
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createCategorySchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const newCategory = await prisma.category.create({
    data: {
      name: body.name,
      description: body.description,
    },
  });

  return NextResponse.json(newCategory, { status: 201 });
}

export async function GET(request: NextRequest) {
  const categories = await prisma.category.findMany({
    include: {
      flowers: true, // Include the related flowers in the response
    },
  });
  return NextResponse.json(categories, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  try {
    const updatedCategory = await prisma.category.deleteMany({});
    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
