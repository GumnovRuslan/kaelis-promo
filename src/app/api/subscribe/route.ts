import { Redis } from "@upstash/redis";
import { Resend } from "resend";
import { NextResponse } from "next/server";

function getRedis() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  
  if (!url || !token) {
    throw new Error("Redis configuration is missing: KV_REST_API_URL and KV_REST_API_TOKEN are required");
  }
  
  return new Redis({ url, token });
}

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    throw new Error("Resend API key is missing: RESEND_API_KEY is required");
  }
  
  return new Resend(apiKey);
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const redis = getRedis();
    const resend = getResend();

    await redis.lpush("emails", email);

    const emailTo = process.env.EMAIL_TO;
    if (emailTo) {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: emailTo,
        subject: "Новый подписчик",
        text: `Новый email: ${email}`,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}