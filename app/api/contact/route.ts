import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Run on the Node.js runtime — nodemailer is not Edge-compatible.
export const runtime = "nodejs";

type ContactPayload = {
  fullName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  // Honeypot — should always be empty for real users.
  company?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Bot trap: if the hidden field is filled, pretend success and drop it.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const fullName = body.fullName?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const subject = body.subject?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!fullName || !email || !phone || !subject || !message) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 400 }
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  const to = process.env.CONTACT_TO || "info@revamp180.com";
  const from = process.env.CONTACT_FROM || SMTP_USER;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("Contact form: SMTP environment variables are not configured.");
    return NextResponse.json(
      { error: "Email service is not configured. Please try again later." },
      { status: 500 }
    );
  }

  const port = Number(SMTP_PORT) || 465;

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465, // true for 465, false for 587/STARTTLS
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const safe = {
    fullName: escapeHtml(fullName),
    email: escapeHtml(email),
    phone: escapeHtml(phone),
    subject: escapeHtml(subject),
    message: escapeHtml(message).replace(/\n/g, "<br/>"),
  };

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#1a1a2e">
      <div style="background:linear-gradient(135deg,#080B78,#00004D);padding:24px;border-radius:12px 12px 0 0">
        <h2 style="color:#fff;margin:0;font-size:18px">New enquiry from revamp180.com</h2>
        <p style="color:#C0BAFF;margin:6px 0 0;font-size:13px">${safe.subject}</p>
      </div>
      <div style="border:1px solid #e5e5f0;border-top:none;border-radius:0 0 12px 12px;padding:24px">
        <p style="margin:0 0 8px"><strong>Name:</strong> ${safe.fullName}</p>
        <p style="margin:0 0 8px"><strong>Email:</strong> ${safe.email}</p>
        <p style="margin:0 0 8px"><strong>Phone:</strong> ${safe.phone}</p>
        <hr style="border:none;border-top:1px solid #e5e5f0;margin:16px 0"/>
        <p style="margin:0 0 6px"><strong>Message</strong></p>
        <p style="margin:0;line-height:1.6;color:#333">${safe.message}</p>
      </div>
    </div>
  `;

  const text =
    `New enquiry from revamp180.com\n\n` +
    `Subject: ${subject}\n` +
    `Name: ${fullName}\n` +
    `Email: ${email}\n` +
    `Phone: ${phone}\n\n` +
    `Message:\n${message}\n`;

  try {
    await transporter.sendMail({
      from: `"Revamp 180° Website" <${from}>`,
      to,
      replyTo: `"${fullName}" <${email}>`,
      subject: `[Contact] ${subject} — ${fullName}`,
      text,
      html,
    });
  } catch (err) {
    console.error("Contact form: failed to send email", err);
    return NextResponse.json(
      { error: "Could not send your message. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
