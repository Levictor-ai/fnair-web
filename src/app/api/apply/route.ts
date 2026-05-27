import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const RECIPIENT = process.env.EMAIL_TO || "frontiernexusresearch@gmail.com";

interface ApplicationData {
  fullName: string;
  age: string;
  department: string;
  level: string;
  email: string;
  phone: string;
  areasOfInterest: string;
  pastParticipation: string[];
  currentSkills: string[];
  whyJoin: string;
  whatResearchMeans: string;
  problemOfInterest: string;
  weeklyHours: string;
  consistentWillingness: string[];
  challenges: string;
  conceptExplanation: string;
  finalCommitment: string;
}

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:10px 16px;background:#F9FAFB;border:1px solid #E5E7EB;width:35%;vertical-align:top;">
        <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#9CA3AF;font-weight:600;">${label}</p>
      </td>
      <td style="padding:10px 16px;border:1px solid #E5E7EB;border-left:none;vertical-align:top;">
        <p style="margin:0;font-size:14px;color:#111827;line-height:1.6;">${value || "<em style='color:#9CA3AF'>Not provided</em>"}</p>
      </td>
    </tr>
  `;
}

function section(title: string, content: string): string {
  return `
    <tr>
      <td colspan="2" style="padding:20px 0 8px;">
        <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#2563EB;font-weight:700;border-bottom:2px solid #2563EB;padding-bottom:6px;">${title}</p>
      </td>
    </tr>
    ${content}
    <tr><td colspan="2" style="padding:8px 0;"></td></tr>
  `;
}

function buildApplicationHtml(data: ApplicationData): string {
  const tagsStyle = `display:inline-block;background:#EFF6FF;color:#2563EB;border:1px solid #BFDBFE;border-radius:4px;padding:2px 8px;font-size:12px;margin:2px 2px 2px 0;font-weight:500;`;

  const chipList = (items: string[]) =>
    items.length > 0
      ? items.map((i) => `<span style="${tagsStyle}">${i}</span>`).join("")
      : "<em style='color:#9CA3AF'>None selected</em>";

  const commitmentColor = data.finalCommitment === "Yes" ? "#16A34A" : data.finalCommitment === "No" ? "#DC2626" : "#D97706";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Application – FNAIR</title>
</head>
<body style="margin:0;padding:0;background:#F9FAFB;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F9FAFB;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="660" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border:1px solid #E5E7EB;border-radius:8px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background:#000000;padding:28px 36px;">
              <p style="margin:0;font-size:12px;letter-spacing:2px;color:#9CA3AF;text-transform:uppercase;font-weight:600;">Frontier Nexus for Academic and Interdisciplinary Research</p>
              <h1 style="margin:8px 0 0;font-size:22px;color:#FFFFFF;font-weight:700;">New Membership Application</h1>
              <p style="margin:6px 0 0;font-size:13px;color:#6B7280;">Received on ${new Date().toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:36px;">
              <p style="margin:0 0 24px;font-size:14px;color:#4B5563;line-height:1.6;">
                A new membership application has been submitted through the FNAIR website. Review all five sections below.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0">

                ${section("Section A – Basic Information", `
                  ${row("Full Name", `<strong>${data.fullName}</strong>`)}
                  ${row("Age", data.age)}
                  ${row("Department / Discipline", data.department)}
                  ${row("Level / Year of Study", data.level)}
                  ${row("Email Address", `<a href="mailto:${data.email}" style="color:#2563EB;text-decoration:none;">${data.email}</a>`)}
                  ${row("Phone Number", data.phone)}
                `)}

                ${section("Section B – Academic Interests & Exposure", `
                  ${row("Areas of Interest", data.areasOfInterest)}
                  ${row("Past Participation", chipList(data.pastParticipation))}
                  ${row("Current Skills", chipList(data.currentSkills))}
                `)}

                ${section("Section C – Motivation & Scientific Thinking", `
                  ${row("Why Join FNAIR?", data.whyJoin)}
                  ${row("What Research Means to Them", data.whatResearchMeans)}
                  ${row("Problem of Interest", data.problemOfInterest)}
                `)}

                ${section("Section D – Commitment & Reliability", `
                  ${row("Weekly Hours Commitment", data.weeklyHours)}
                  ${row("Consistent Willingness", chipList(data.consistentWillingness))}
                  ${row("Potential Challenges", data.challenges || "None mentioned")}
                `)}

                ${section("Section E – Mini Intellectual Task & Final Commitment", `
                  ${row("Concept Explanation", data.conceptExplanation)}
                  ${row("Final Commitment", `<strong style="color:${commitmentColor};">${data.finalCommitment}</strong>`)}
                `)}

              </table>

              <!-- Reply CTA -->
              <div style="margin-top:24px;padding-top:24px;border-top:1px solid #E5E7EB;">
                <a href="mailto:${data.email}" style="display:inline-block;background:#2563EB;color:#FFFFFF;font-size:14px;font-weight:600;padding:12px 24px;border-radius:6px;text-decoration:none;">
                  Reply to ${data.fullName}
                </a>
              </div>
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
    const data = (await req.json()) as ApplicationData;

    if (!data.fullName || !data.email) {
      return NextResponse.json(
        { error: "Application data is incomplete." },
        { status: 400 }
      );
    }

    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_..." && process.env.RESEND_API_KEY.startsWith("re_")) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "FNAIR <onboarding@resend.dev>",
        to: [RECIPIENT],
        replyTo: data.email,
        subject: `New Application: ${data.fullName} (${data.department} · ${data.level})`,
        html: buildApplicationHtml(data),
      });
    } else {
      console.log("──────────────────────────────────────────────────");
      console.log("[FNAIR Application] Mock email (Resend not configured)");
      console.log(`  Applicant : ${data.fullName} <${data.email}>`);
      console.log(`  To        : ${RECIPIENT}`);
      console.log(`  Department: ${data.department} · ${data.level}`);
      console.log(`  Commitment: ${data.finalCommitment}`);
      console.log("──────────────────────────────────────────────────");
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[FNAIR Apply API] Error sending email:", err);
    return NextResponse.json(
      { error: "Failed to submit application. Please try again." },
      { status: 500 }
    );
  }
}
