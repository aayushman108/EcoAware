import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email?.trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // In a real application, you would integrate with a service like:
    // 1. Mailchimp API
    // 2. SendGrid Marketing Lists
    // 3. Resend Audience
    // 4. Your own database (e.g., Prisma + PostgreSQL)

    // Example of Resend Audience integration (if they have one)
    // or simply sending a welcome email:
    
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

    if (apiKey) {
      const html = `
        <div style="margin:0;padding:24px;background:#f3f5f7;font-family:Inter,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:20px 24px;background:linear-gradient(135deg,#10b981 0%,#0ea5e9 100%);color:#ffffff;">
                <div style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;opacity:.95;">Envoware</div>
                <div style="font-size:24px;line-height:1.2;font-weight:700;margin-top:6px;">Welcome to the Movement!</div>
              </td>
            </tr>
            <tr>
              <td style="padding:24px;">
                <p style="margin:0 0 18px;font-size:16px;line-height:1.6;color:#334155;">
                  Hi there,
                </p>
                <p style="margin:0 0 18px;font-size:16px;line-height:1.6;color:#334155;">
                  Thanks for joining the Envoware community! We're excited to have you with us on this journey towards conscious living and sustainability.
                </p>
                <p style="margin:0 0 18px;font-size:16px;line-height:1.6;color:#334155;">
                  Starting next week, you'll receive our weekly digest featuring:
                </p>
                <ul style="margin:0 0 20px;padding:0 0 0 20px;font-size:15px;color:#475569;line-height:1.7;">
                  <li>Science-backed health and wellness tips</li>
                  <li>Nutritious recipes for a balanced lifestyle</li>
                  <li>Actionable environmental insights</li>
                </ul>
                <div style="margin-top:32px;padding-top:24px;border-top:1px solid #f1f5f9;text-align:center;">
                  <a href="https://envoware.netlify.app" style="display:inline-block;padding:12px 24px;background:#10b981;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">Visit Our Website</a>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 24px;background:#f8fafc;color:#94a3b8;font-size:12px;text-align:center;">
                © ${new Date().getFullYear()} Envoware. Made with 💚 for a greener future.
              </td>
            </tr>
          </table>
        </div>
      `;

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [email],
          subject: "Welcome to Envoware! 🌱",
          html,
        }),
      });
    }

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Return success
    return NextResponse.json({ 
      success: true, 
      message: "Successfully subscribed to the newsletter!" 
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
