import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { createCategorySchema } from "../validationSchema";
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
    name: formData.get("name"),
    description: formData.get("description"),
    image_url: filename,
  };

  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const validation = createCategorySchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  try {
    // Save the file locally
    await writeFile(
      path.join(process.cwd(), "public/uploads/" + filename),
      buffer
    );

    // Create the new category
    const newCategory = await prisma.category.create({
      data: {
        name: body.name,
        description: body.description,
        image_url: `/uploads/${filename}`,
      },
      include: {
        flowers: true,
      },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(error, { status: 500 });
  }
};

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
