import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

function getRedis() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  
  if (!url || !token) {
    throw new Error("Redis configuration is missing: KV_REST_API_URL and KV_REST_API_TOKEN are required");
  }
  
  return new Redis({ url, token });
}

export async function POST(req: Request) {
  try {
    const { type, email} = await req.json();

    if (!type || !email) {
      return NextResponse.json(
        { error: "All fields are required: deletionType, email, date" },
        { status: 400 }
      );
    }

    const redis = getRedis();

    const userData = {
      type,
      email,
      createdAt: new Date().toISOString()
    };

    await redis.lpush("user_requests", JSON.stringify(userData));

    return NextResponse.json({ success: true, message: 'Data saved successfully' });
  } catch (err) {
    console.error("Error saving data:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}