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
    include: {
      flowers: true,
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
    // Deleting all flowers
    const deletedFlowers = await prisma.flower.deleteMany({});
    console.log("Deleted flowers:", deletedFlowers);

    // Deleting all categories
    const updatedCategory = await prisma.category.deleteMany({});
    console.log("Deleted categories:", updatedCategory);

    return NextResponse.json(
      { message: "All flowers and categories deleted successfully" },
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
