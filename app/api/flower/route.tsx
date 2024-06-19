import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { createFlowerSchema } from "../validationSchema";
import prisma from "@/prisma/client";

// Helper function to handle Multer with Promises
function runMiddleware(req: any, res: any, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export const POST = async (req: any, res: any) => {
  const formData = await req.formData();

  const file = formData.get("image_url");
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = Date.now() + file.name.replaceAll(" ", "_");
  const body = {
    category_id: parseInt(formData.get("category_id")),
    flower_name: formData.get("flower_name"),
    description: formData.get("description"),
    price: parseInt(formData.get("price")),
    image_url: filename,
  };

  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const validation = createFlowerSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  try {
    // Save the file locally
    await writeFile(
      path.join(process.cwd(), "public/uploads/" + filename),
      buffer
    );

    // Start a transaction
    const result = await prisma.$transaction(async (prisma) => {
      const newFlower = await prisma.flower.create({
        data: {
          category_id: body.category_id,
          name: body.flower_name,
          description: body.description,
          price: body.price,
          image_url: `/uploads/${filename}`,
        },
        include: {
          orderItems: true,
          cartItems: true,
        },
      });

      // Updating the category to include the new flower
      const updatedCategory = await prisma.category.update({
        where: { category_id: body.category_id },
        data: {
          flowers: {
            connect: { flower_id: newFlower.flower_id }, // Connecting the new flower to the category
          },
        },
      });

      return { newFlower };
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error creating flower and updating category:", error);
    return NextResponse.json(error, { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  const flowers = await prisma.flower.findMany({
    include: {
      orderItems: true,
      cartItems: true,
    },
  });
  return NextResponse.json(flowers, { status: 200 });
};

export const DELETE = async (req: NextRequest) => {
  try {
    const deletedFlowers = await prisma.flower.deleteMany({});
    return NextResponse.json(deletedFlowers, { status: 200 });
  } catch (error) {
    console.error("Error deleting flowers:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
