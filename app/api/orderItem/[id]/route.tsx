import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createOrderItemSchema } from "../../validationSchema";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Ensure the id is a valid integer
    const orderItemId = parseInt(id, 10);
    if (isNaN(orderItemId)) {
      return NextResponse.json(
        { error: "Invalid orderItem ID" },
        { status: 400 }
      );
    }

    const orderItem = await prisma.orderItem.findUnique({
      where: { order_item_id: orderItemId },
    });

    if (!orderItem) {
      return NextResponse.json(
        { error: "Order item not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(orderItem, { status: 200 });
  } catch (error) {
    console.error("Error fetching order item:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export const PUT = async (req: any, { params }: { params: { id: string } }) => {
  try {
    const id = params.id;

    // Ensure the id is a valid integer
    const orderItemId = parseInt(id, 10);
    if (isNaN(orderItemId)) {
      console.error("Invalid order item ID");
      return NextResponse.json(
        { error: "Invalid order item ID" },
        { status: 400 }
      );
    }

    const orderItem = await prisma.orderItem.findUnique({
      where: { order_item_id: orderItemId },
    });

    if (!orderItem) {
      console.error("Order item not found");
      return NextResponse.json({ error: "Flower not found" }, { status: 404 });
    }
    const body = await req.json();
    const validation = createOrderItemSchema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    const updatedOrderItem = await prisma.orderItem.update({
      where: { order_item_id: orderItemId },
      data: {
        order_id: body.order_id,
        flower_id: body.flower_id,
        quantity: body.quantity || 1, // Default quantity to 1 if not provided
        price: body.price,
      },
      include: {
        order: true, // Include related order
        flower: true, // Include related flower
      },
    });
    const updatedFlower = await prisma.flower.update({
      where: { flower_id: body.flower_id },
      data: {
        orderItems: {
          connect: { order_item_id: updatedOrderItem.order_item_id }, // Connecting the new flower to the category
        },
      },
      include: {
        orderItems: true, // Including the flowers in the response
      },
    });
    return NextResponse.json(updatedOrderItem, { status: 201 });
  } catch (error) {
    console.error("Error updating order item:", error);
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
      const orderItemId = parseInt(id, 10);
      if (isNaN(orderItemId)) {
        return NextResponse.json(
          { error: "Invalid order item ID" },
          { status: 400 }
        );
      }
      
      const orderItem = await prisma.orderItem.findUnique({
        where: { order_item_id: orderItemId },
      });
  
      if (!orderItem) {
        return NextResponse.json(
          { error: "Order item not found" },
          { status: 404 }
        );
      }
      const updatedOrderItem= await prisma.orderItem.delete({
        where: { order_item_id: orderItemId },
      });
      return NextResponse.json(updatedOrderItem, { status: 200 });
    } catch (error) {
      console.error("Error fetching order item:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
