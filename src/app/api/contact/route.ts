import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const RECIPIENT = process.env.EMAIL_TO || "levictor086@gmail.com";

function buildContactHtml(name: string, email: string, message: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Inquiry – FNAIR</title>
</head>
<body style="margin:0;padding:0;background:#F9FAFB;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F9FAFB;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border:1px solid #E5E7EB;border-radius:8px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background:#000000;padding:28px 36px;">
              <p style="margin:0;font-size:13px;letter-spacing:2px;color:#9CA3AF;text-transform:uppercase;font-weight:600;">Frontier Nexus for Academic and Interdisciplinary Research</p>
              <h1 style="margin:8px 0 0;font-size:22px;color:#FFFFFF;font-weight:700;">New Contact Inquiry</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:36px;">
              <p style="margin:0 0 24px;font-size:14px;color:#4B5563;line-height:1.6;">
                A new inquiry has been submitted through the FNAIR website contact form. Details are below.
              </p>
              <!-- Info grid -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td style="padding:12px 16px;background:#F9FAFB;border:1px solid #E5E7EB;border-radius:6px 6px 0 0;">
                    <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#9CA3AF;font-weight:600;">Sender Name</p>
                    <p style="margin:4px 0 0;font-size:16px;color:#000000;font-weight:600;">${name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;background:#F9FAFB;border:1px solid #E5E7EB;border-top:none;">
                    <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#9CA3AF;font-weight:600;">Email Address</p>
                    <p style="margin:4px 0 0;font-size:15px;color:#2563EB;font-weight:500;">
                      <a href="mailto:${email}" style="color:#2563EB;text-decoration:none;">${email}</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;background:#F9FAFB;border:1px solid #E5E7EB;border-top:none;border-radius:0 0 6px 6px;">
                    <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#9CA3AF;font-weight:600;">Message</p>
                    <p style="margin:8px 0 0;font-size:15px;color:#111827;line-height:1.7;white-space:pre-wrap;">${message}</p>
                  </td>
                </tr>
              </table>
              <!-- CTA -->
              <a href="mailto:${email}" style="display:inline-block;background:#2563EB;color:#FFFFFF;font-size:14px;font-weight:600;padding:12px 24px;border-radius:6px;text-decoration:none;">
                Reply to ${name}
              </a>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:20px 36px;border-top:1px solid #E5E7EB;background:#F9FAFB;">
              <p style="margin:0;font-size:12px;color:#9CA3AF;text-align:center;">
                © ${new Date().getFullYear()} Frontier Nexus for Academic and Interdisciplinary Research · FNAIR
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body as {
      name: string;
      email: string;
      message: string;
    };

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields (name, email, message) are required." },
        { status: 400 }
      );
    }

    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_..." && process.env.RESEND_API_KEY.startsWith("re_")) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "FNAIR <onboarding@resend.dev>",
        to: [RECIPIENT],
        replyTo: email,
        subject: `New Inquiry from ${name} – FNAIR`,
        html: buildContactHtml(name, email, message),
      });
    } else {
      console.log("──────────────────────────────────────────────────");
      console.log("[FNAIR Contact] Mock email (Resend not configured)");
      console.log(`  From   : ${name} <${email}>`);
      console.log(`  To     : ${RECIPIENT}`);
      console.log(`  Message: ${message}`);
      console.log("──────────────────────────────────────────────────");
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[FNAIR Contact API] Error sending email:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
