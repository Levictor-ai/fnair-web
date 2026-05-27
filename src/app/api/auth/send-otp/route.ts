import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import crypto from "crypto";
import { cookies } from "next/headers";

const ADMIN_EMAIL = "frontiernexusresearch@gmail.com";

export async function POST(req: NextRequest) {
  try {
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Hash the OTP with the secret
    const secret = process.env.AUTH_SECRET || "default_secret";
    const hash = crypto.createHmac("sha256", secret).update(otp).digest("hex");

    // Set HTTP-only cookie with 3 minutes expiration (180 seconds)
    const cookieStore = await cookies();
    cookieStore.set("otp_hash", hash, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 180,
      path: "/",
    });

    // Send the OTP via email
    if (process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes("...")) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "FNAIR Admin <onboarding@resend.dev>",
        to: [ADMIN_EMAIL],
        subject: "Your FNAIR Dashboard Login Code",
        html: `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2>FNAIR Admin Dashboard Login</h2>
            <p>Your one-time password (OTP) is:</p>
            <h1 style="font-size: 32px; letter-spacing: 4px; color: #2563EB;">${otp}</h1>
            <p>This code will expire in exactly 3 minutes.</p>
            <p>If you didn't request this code, you can safely ignore this email.</p>
          </div>
        `,
      });
    } else {
      console.log("──────────────────────────────────────────────────");
      console.log("[FNAIR Admin] Mock OTP email (Resend not configured)");
      console.log(`  To  : ${ADMIN_EMAIL}`);
      console.log(`  OTP : ${otp}`);
      console.log("──────────────────────────────────────────────────");
    }

    return NextResponse.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
