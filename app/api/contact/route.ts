import { NextResponse } from "next/server";

interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validatePayload(payload: ContactPayload) {
  const { name, email, subject, message } = payload;

  if (!name?.trim()) return "Name is required";
  if (!email?.trim()) return "Email is required";
  if (!EMAIL_REGEX.test(email)) return "Please enter a valid email address";
  if (!subject?.trim()) return "Subject is required";
  if (!message?.trim()) return "Message is required";
  if (message.trim().length < 10) {
    return "Message must be at least 10 characters";
  }

  return null;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const validationError = validatePayload(body);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

    if (!apiKey) {
      return NextResponse.json(
        { error: "Server is missing RESEND_API_KEY." },
        { status: 500 },
      );
    }

    if (!toEmail) {
      return NextResponse.json(
        { error: "Server is missing CONTACT_TO_EMAIL." },
        { status: 500 },
      );
    }

    const subjectLine = `New Contact Message: ${body.subject}`;
    const escapedMessage = body.message
      ?.replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br/>");
    const escapedName = body.name
      ?.replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    const escapedSubject = body.subject
      ?.replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    const escapedEmail = body.email
      ?.replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    const html = `
      <div style="margin:0;padding:24px;background:#f3f5f7;font-family:Inter,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="padding:20px 24px;background:linear-gradient(135deg,#10b981 0%,#0ea5e9 100%);color:#ffffff;">
              <div style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;opacity:.95;">EcoAware</div>
              <div style="font-size:24px;line-height:1.2;font-weight:700;margin-top:6px;">New Contact Form Submission</div>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;">
              <p style="margin:0 0 18px;font-size:14px;color:#475569;">
                You received a new message from your website contact form.
              </p>
              <div style="margin-top:12px;border:1px solid #dbeafe;background:#f8fbff;border-radius:12px;padding:14px 16px;">
                <div style="font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px;">Name</div>
                <div style="font-size:15px;line-height:1.6;color:#1e293b;">${escapedName}</div>
              </div>

              <div style="margin-top:12px;border:1px solid #dbeafe;background:#f8fbff;border-radius:12px;padding:14px 16px;">
                <div style="font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px;">Email</div>
                <div style="font-size:15px;line-height:1.6;">
                  <a href="mailto:${escapedEmail}" style="color:#0284c7;text-decoration:none;">${escapedEmail}</a>
                </div>
              </div>

              <div style="margin-top:12px;border:1px solid #dbeafe;background:#f8fbff;border-radius:12px;padding:14px 16px;">
                <div style="font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px;">Subject</div>
                <div style="font-size:15px;line-height:1.6;color:#1e293b;">${escapedSubject}</div>
              </div>

              <div style="margin-top:12px;border:1px solid #dbeafe;background:#f8fbff;border-radius:12px;padding:14px 16px;">
                <div style="font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px;">Message</div>
                <div style="font-size:15px;line-height:1.65;color:#1e293b;">${escapedMessage}</div>
              </div>

              <div style="margin-top:20px;font-size:12px;color:#94a3b8;">
                Sent via EcoAware contact form.
              </div>
            </td>
          </tr>
        </table>
      </div>
    `;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: body.email,
        subject: subjectLine,
        html,
      }),
    });

    if (!resendResponse.ok) {
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unexpected server error. Please try again." },
      { status: 500 },
    );
  }
}
