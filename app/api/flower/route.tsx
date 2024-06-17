import { NextRequest, NextResponse } from "next/server";
import { createFlowerSchema } from "../validationSchema";
import prisma from "@/prisma/client";
import multer from "multer";



export async function POST(request: NextRequest) {

  const body = await request.json();
  const validation = createFlowerSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  try {
    // Start a transaction
    const result = await prisma.$transaction(async (prisma) => {
      const newFlower = await prisma.flower.create({
        data: {
          category_id: body.category_id,
          name: body.flower_name,
          description: body.description,
          price: body.price,
          image_url: body.image_url,
        },
      });

      // Updating the category to include the new flower
      const updatedCategory = await prisma.category.update({
        where: { category_id: body.category_id },
        data: {
          flowers: {
            connect: { flower_id: newFlower.category_id }, // Connecting the new flower to the category
          },
        },
        include: {
          flowers: true, // Including the flowers in the response
        },
      });

      return { newFlower, updatedCategory };
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error creating flower and updating category:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function GET(request: NextRequest) {
  const flowers = await prisma.flower.findMany();
  return NextResponse.json(flowers, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  try {
    const updatetedFlowers = await prisma.flower.deleteMany({});
    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    console.error("Error fetching flowers:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

