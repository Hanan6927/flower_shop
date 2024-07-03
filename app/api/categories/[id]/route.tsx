export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Ensure the id is a valid integer
    const categoryId = parseInt(id, 10);
    if (isNaN(categoryId)) {
      return NextResponse.json(
        { error: "Invalid category ID" },
        { status: 400 }
      );
    }

    const category = await prisma.category.findUnique({
      where: { category_id: categoryId },
      include: {
        flowers: true, // Include the related flowers in the response
      },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile, unlink } from "fs/promises";
import prisma from "@/prisma/client";
import { createCategorySchema } from "../../validationSchema";

export const PUT = async (req: any, { params }: { params: { id: string } }) => {
  try {
    const id = params.id;

    // Ensure the id is a valid integer
    const category_id = parseInt(id, 10);
    if (isNaN(category_id)) {
      console.error("Invalid category ID");
      return NextResponse.json(
        { error: "Invalid category ID" },
        { status: 400 }
      );
    }

    const category = await prisma.category.findUnique({
      where: { category_id: category_id },
    });

    if (!category) {
      console.error("Category not found");
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("image_url");

    const body = {
      name: formData.get("name"),
      description: formData.get("description"),
      image_url: file
        ? Date.now() + file.name.replaceAll(" ", "_")
        : category.image_url,
    };

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(
        path.join(process.cwd(), "public/uploads/" + body.image_url),
        buffer
      );
      // Optionally delete the old image if a new one is uploaded
      if (category.image_url) {
        try {
          await unlink(path.join(process.cwd(), "public" + category.image_url));
        } catch (unlinkError) {
          console.error("Error deleting old image", unlinkError);
        }
      }
    }

    const validation = createCategorySchema.safeParse(body);

    if (!validation.success) {
      console.error("Validation failed", validation.error.errors);
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const updatedCategory = await prisma.category.update({
      where: { category_id: category_id },
      data: {
        name: body.name,
        description: body.description,
        image_url: `/uploads/${body.image_url}`,
      },
    });

    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    console.error("Error updating category:", error);
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
    const categoryId = parseInt(id, 10);
    if (isNaN(categoryId)) {
      return NextResponse.json(
        { error: "Invalid category ID" },
        { status: 400 }
      );
    }

    const category = await prisma.category.findUnique({
      where: { category_id: categoryId },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
    await prisma.flower.deleteMany({
      where: { category_id: categoryId },
    });
    const updatedCategory = await prisma.category.delete({
      where: { category_id: categoryId },
    });
    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
