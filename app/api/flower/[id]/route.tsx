import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createFlowerSchema } from "../../validationSchema";
import path from "path";
import { unlink, writeFile } from "fs/promises";

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

export const PUT = async (req: any, { params }: { params: { id: string } }) => {
  try {
    const id = params.id;

    // Ensure the id is a valid integer
    const flower_id = parseInt(id, 10);
    if (isNaN(flower_id)) {
      console.error("Invalid flower ID");
      return NextResponse.json({ error: "Invalid flower ID" }, { status: 400 });
    }

    const flower = await prisma.flower.findUnique({
      where: { flower_id: flower_id },
    });

    if (!flower) {
      console.error("Flower not found");
      return NextResponse.json({ error: "Flower not found" }, { status: 404 });
    }

    const formData = await req.formData();
    const file = formData.get("image_url");

    const body = {
      category_id: parseInt(formData.get("category_id")),
      flower_name: formData.get("flower_name"),
      description: formData.get("description"),
      price: parseFloat(formData.get("price")),
      image_url: file
        ? Date.now() + file.name.replaceAll(" ", "_")
        : flower.image_url,
    };

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(
        path.join(process.cwd(), "public/uploads/" + body.image_url),
        buffer
      );
      // Optionally delete the old image if a new one is uploaded
      if (flower.image_url) {
        try {
          await unlink(path.join(process.cwd(), "public" + flower.image_url));
        } catch (unlinkError) {
          console.error("Error deleting old image", unlinkError);
        }
      }
    }

    const validation = createFlowerSchema.safeParse(body);

    if (!validation.success) {
      console.error("Validation failed", validation.error.errors);
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    // Start a transaction
    const result = await prisma.$transaction(async (prisma) => {
      const updatedFlower = await prisma.flower.update({
        where: { flower_id: flower_id },
        data: {
          category_id: body.category_id,
          name: body.flower_name,
          description: body.description,
          price: body.price,
          image_url: `/uploads/${body.image_url}`,
        },
      });

      // Updating the category to include the new flower
      const updatedCategory = await prisma.category.update({
        where: { category_id: body.category_id },
        data: {
          flowers: {
            connect: { flower_id: updatedFlower.flower_id }, // Connecting the new flower to the category
          },
        },
      });

      return updatedFlower;
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error updating flower:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error, stack: error },
      { status: 500 }
    );
  }
};

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
