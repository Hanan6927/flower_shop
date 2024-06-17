import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createFlowerSchema } from "../../validationSchema";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Ensure the id is a valid integer
    const flowerId = parseInt(id, 10);
    if (isNaN(flowerId)) {
      return NextResponse.json(
        { error: "Invalid category ID" },
        { status: 400 }
      );
    }

    const flower = await prisma.flower.findUnique({
      where: { flower_id: flowerId },
    });

    if (!flower) {
      return NextResponse.json({ error: "Flower not found" }, { status: 404 });
    }

    return NextResponse.json(flower, { status: 200 });
  } catch (error) {
    console.error("Error fetching flower:", error);
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
    const flower_id = parseInt(id, 10);
    if (isNaN(flower_id)) {
      return NextResponse.json({ error: "Invalid flower ID" }, { status: 400 });
    }

    const flower = await prisma.flower.findUnique({
      where: { flower_id: flower_id },
    });

    if (!flower) {
      return NextResponse.json({ error: "Flower not found" }, { status: 404 });
    }

    const body = await request.json();
    const validation = createFlowerSchema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    const updatedFlower = await prisma.flower.update({
      where: { flower_id: flower_id },
      data: {
        category_id: body.category_id,
        name: body.flower_name,
        description: body.description,
        price: body.price,
        image_url: body.image_url,
      },
    });
    return NextResponse.json(updatedFlower  , { status: 200 });
  } catch (error) {
    console.error("Error fetching category:", error);
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
    const flower_id = parseInt(id, 10);
    if (isNaN(flower_id)) {
      return NextResponse.json({ error: "Invalid flower ID" }, { status: 400 });
    }

    const flower = await prisma.flower.delete({
      where: { flower_id: flower_id },
    });
    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
