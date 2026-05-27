import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { otp } = await req.json();

    if (!otp || typeof otp !== "string") {
      return NextResponse.json({ error: "Invalid OTP provided" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const storedHash = cookieStore.get("otp_hash")?.value;

    if (!storedHash) {
      return NextResponse.json({ error: "OTP expired or not requested" }, { status: 400 });
    }

    const secret = process.env.AUTH_SECRET || "default_secret";
    const expectedHash = crypto.createHmac("sha256", secret).update(otp).digest("hex");

    if (expectedHash === storedHash) {
      // Valid OTP. Set session cookie.
      // Session valid for 24 hours
      const sessionValue = crypto.randomBytes(16).toString("hex");
      cookieStore.set("admin_session", sessionValue, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
        path: "/",
      });

      // Clear the OTP cookie
      cookieStore.delete("otp_hash");

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Incorrect OTP" }, { status: 401 });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json({ error: "Failed to verify OTP" }, { status: 500 });
  }
}
