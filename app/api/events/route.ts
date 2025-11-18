import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponseCode } from "@/app/constants/apiResponseCodes";
import Event from "@/database/event.model";
import connectDB from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    let event;

    try {
      event = Object.fromEntries(formData.entries());
    } catch (e) {
      return NextResponse.json(
        { message: "Invalid JSON data format" },
        { status: ApiResponseCode.INVALID_FORMAT }
      );
    }

    const file = formData.get("image") as File;

    if (!file)
      return NextResponse.json(
        { message: "Image file is required" },
        { status: ApiResponseCode.INVALID_FORMAT }
      );

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { message: "Invalid file type. Only images are allowed" },
        { status: ApiResponseCode.INVALID_FORMAT }
      );
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { message: "File size exceeds 5MB limit" },
        { status: ApiResponseCode.INVALID_FORMAT }
      );
    }

    const tags = JSON.parse(formData.get("tags") as string);
    const agenda = JSON.parse(formData.get("agenda") as string);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "image", folder: "DevEvent" },
          (error, results) => {
            if (error) return reject(error);

            resolve(results);
          }
        )
        .end(buffer);
    });

    if (
      !uploadResult ||
      typeof uploadResult !== "object" ||
      !("secure_url" in uploadResult)
    ) {
      throw new Error("Invalid Cloudinary upload response");
    }
    event.image = (uploadResult as { secure_url: string }).secure_url;

    const createdEvent = await Event.create({
      ...event,
      tags: tags,
      agenda: agenda,
    });

    return NextResponse.json(
      { message: "Event created successfully", event: createdEvent },
      { status: ApiResponseCode.CREATED }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "Event Creation Failed",
        error: e instanceof Error ? e.message : "Unknown",
      },
      { status: ApiResponseCode.UNKNOWN }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const events = await Event.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { message: "Events fetched successfully", events },
      { status: ApiResponseCode.DONE }
    );
  } catch (e) {
    return NextResponse.json(
      {
        message: "Event fetching failed",
        error: e instanceof Error ? e.message : "Unknown",
      },
      { status: ApiResponseCode.UNKNOWN }
    );
  }
}

// a route that accepts a slug as input -> returns the event details
