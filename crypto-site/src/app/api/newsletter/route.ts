import { NextResponse } from "next/server";

/**
 * Newsletter sign-up endpoint.
 * Connects to Buttondown (https://buttondown.com) when BUTTONDOWN_API_KEY is set.
 * To use another provider (Beehiiv, ConvertKit, Mailchimp), replace the fetch() below.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: { email?: unknown; company?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real people never fill in the hidden "company" field.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ message: "Thanks — you're subscribed." });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email || email.length > 254 || !EMAIL.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (!apiKey) {
    // Honest failure: don't pretend to subscribe someone when nothing is connected.
    return NextResponse.json({ error: "Newsletter sign-ups aren't open yet. Please check back soon." }, { status: 503 });
  }

  try {
    const res = await fetch("https://api.buttondown.com/v1/subscribers", {
      method: "POST",
      headers: { Authorization: `Token ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ email_address: email, tags: ["website"] }),
      cache: "no-store",
    });
    if (res.ok) return NextResponse.json({ message: "Almost done — check your inbox to confirm your subscription." });
    const text = await res.text();
    if (res.status === 400 && /already|exists/i.test(text)) {
      return NextResponse.json({ message: "You're already subscribed. Thanks!" });
    }
    console.error("Newsletter provider error", res.status, text.slice(0, 300));
    return NextResponse.json({ error: "We couldn't subscribe you right now. Please try again later." }, { status: 502 });
  } catch (err) {
    console.error("Newsletter request failed", err);
    return NextResponse.json({ error: "We couldn't subscribe you right now. Please try again later." }, { status: 502 });
  }
}
