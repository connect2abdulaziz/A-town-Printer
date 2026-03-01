import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const DEFAULT_FROM =
  process.env.EMAIL_FROM ?? "A-Town Printers <onboarding@resend.dev>";

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail(options: EmailOptions): Promise<{ ok: boolean; error?: string }> {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set; skipping email.");
    return { ok: false, error: "RESEND_API_KEY not set" };
  }
  try {
    const { error } = await resend.emails.send({
      from: DEFAULT_FROM,
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
    });
    if (error) {
      console.error("Resend error:", error);
      return { ok: false, error: String(error.message ?? error) };
    }
    return { ok: true };
  } catch (err) {
    console.error("Send email error:", err);
    return { ok: false, error: err instanceof Error ? err.message : "Failed to send" };
  }
}

export interface QuoteSubmissionData {
  name: string;
  email: string;
  phone?: string;
  category?: string;
  message: string;
  quantity?: string;
  product?: string;
}

const EMAIL_STYLES = {
  primary: "#0c1929",
  accent: "#c2410c",
  accentHover: "#9a3412",
  background: "#faf9f7",
  card: "#ffffff",
  border: "#e2e8f0",
  text: "#0c1929",
  textMuted: "#64748b",
  fontSans: "Poppins, system-ui, -apple-system, sans-serif",
  fontDisplay: "Playfair Display, Georgia, serif",
} as const;

function emailWrapper(content: string, title: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:${EMAIL_STYLES.background};font-family:${EMAIL_STYLES.fontSans};color:${EMAIL_STYLES.text};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${EMAIL_STYLES.background};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:${EMAIL_STYLES.card};border-radius:12px;border:1px solid ${EMAIL_STYLES.border};box-shadow:0 4px 6px rgba(12,25,41,0.06);overflow:hidden;">
          <tr>
            <td style="background:linear-gradient(135deg, ${EMAIL_STYLES.primary} 0%, #132238 100%);padding:28px 32px;text-align:center;">
              <h1 style="margin:0;font-family:${EMAIL_STYLES.fontDisplay};font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;">A-Town Printers</h1>
              <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.8);">Professional Printing Services</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px;background-color:${EMAIL_STYLES.background};border-top:1px solid ${EMAIL_STYLES.border};font-size:12px;color:${EMAIL_STYLES.textMuted};text-align:center;">
              A-Town Printers &middot; London &middot; Fast turnaround, reliable service
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function quoteToHtml(data: QuoteSubmissionData): string {
  const rows = [
    ["Name", data.name],
    ["Email", `<a href="mailto:${data.email}" style="color:${EMAIL_STYLES.accent};text-decoration:none;">${data.email}</a>`],
    ["Phone", data.phone || "—"],
    ["Service category", data.category || "—"],
    ["Estimated quantity", data.quantity || "—"],
    ["Product interest", data.product || "—"],
  ];
  const trs = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:10px 16px 10px 0;vertical-align:top;font-weight:600;color:${EMAIL_STYLES.textMuted};font-size:13px;width:140px;">${label}</td><td style="padding:10px 0;font-size:15px;">${value}</td></tr>`
    )
    .join("");
  const messageHtml = data.message.replace(/\n/g, "<br>");
  const content = `
    <h2 style="margin:0 0 8px;font-family:${EMAIL_STYLES.fontDisplay};font-size:22px;color:${EMAIL_STYLES.primary};">New quote request</h2>
    <p style="margin:0 0 24px;font-size:15px;color:${EMAIL_STYLES.textMuted};">Someone submitted a quote request from your website.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:24px;">
      ${trs}
    </table>
    <div style="background-color:${EMAIL_STYLES.background};border:1px solid ${EMAIL_STYLES.border};border-radius:8px;padding:16px;margin-bottom:24px;">
      <p style="margin:0 0 6px;font-size:12px;font-weight:600;color:${EMAIL_STYLES.textMuted};text-transform:uppercase;letter-spacing:0.04em;">Project details</p>
      <p style="margin:0;font-size:15px;line-height:1.5;">${messageHtml}</p>
    </div>
    <p style="margin:0;font-size:14px;color:${EMAIL_STYLES.textMuted};">
      Reply to this email to respond directly to the customer.
    </p>
  `;
  return emailWrapper(content, `Quote from ${data.name}`);
}

function confirmationToHtml(name: string): string {
  const content = `
    <h2 style="margin:0 0 8px;font-family:${EMAIL_STYLES.fontDisplay};font-size:22px;color:${EMAIL_STYLES.primary};">We've received your request</h2>
    <p style="margin:0 0 20px;font-size:16px;line-height:1.5;color:${EMAIL_STYLES.text};">
      Hi ${name},
    </p>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:${EMAIL_STYLES.text};">
      Thank you for requesting a quote. We've received your details and our team will get back to you within <strong>24 hours</strong> with pricing and next steps.
    </p>
    <div style="background-color:${EMAIL_STYLES.background};border-left:4px solid ${EMAIL_STYLES.accent};border-radius:0 8px 8px 0;padding:16px 20px;">
      <p style="margin:0;font-size:14px;color:${EMAIL_STYLES.textMuted};">
        Need something urgently? Reply to this email or give us a call — we're here to help.
      </p>
    </div>
    <p style="margin:24px 0 0;font-size:15px;color:${EMAIL_STYLES.text};">
      Thanks,<br>
      <strong style="color:${EMAIL_STYLES.primary};">The A-Town Printers Team</strong>
    </p>
  `;
  return emailWrapper(content, "Quote request received");
}

export async function sendQuoteNotificationEmails(data: QuoteSubmissionData): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL ?? process.env.NOTIFY_EMAIL;
  if (adminEmail) {
    const { ok, error } = await sendEmail({
      to: adminEmail,
      subject: `New quote request from ${data.name}`,
      html: quoteToHtml(data),
      replyTo: data.email,
    });
    if (!ok) console.error("Quote notification email failed:", error);
  } else {
    console.warn("ADMIN_EMAIL or NOTIFY_EMAIL not set; skipping admin notification.");
  }

  const { ok, error } = await sendEmail({
    to: data.email,
    subject: "We received your quote request – A-Town Printers",
    html: confirmationToHtml(data.name),
  });
  if (!ok) console.error("Quote confirmation email failed:", error);
}
