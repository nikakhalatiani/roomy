import { authOptions } from "@/lib/auth";
import { TPersonalDataValidator } from "@/lib/validators/personal-data-validator";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      image,
      username,
      dob,
      major,
      year,
      minor,
      morningPerson,
    }: TPersonalDataValidator = body;
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("You have to be logged in", { status: 401 });
    }

    await db.set(
      `user:personal_info:${session.user.id}`,
      JSON.stringify({
        username,
        dob,
        major,
        year,
        minor,
        morningPerson,
        image: `https://roomy-local-kiu.s3.eu-north-1.amazonaws.com/${session.user.id}`,
      })
    );

    return new Response("Data added successfully", { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request body", { status: 422 });
    }
    return new Response("Internal request", { status: 400 });
  }
}
