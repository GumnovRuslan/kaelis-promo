import { Redis } from "@upstash/redis";
import { Resend } from "resend";
import { NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    // сохраняем email в список
    await redis.lpush("emails", email);

    // отправляем уведомление тебе на почту
    await resend.emails.send({
      from: "onboarding@resend.dev", // лучше подключить домен в Resend
      to: `${process.env.EMAIL_TO}`,
      subject: "Новый подписчик",
      text: `Новый email: ${email}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}