/**
 * Email notification utilities.
 * Configure with your email provider (e.g. Resend, SendGrid) in API routes.
 */

export interface EmailOptions {
  to: string;
  subject: string;
  body: string;
  replyTo?: string;
}

export async function sendEmail(_options: EmailOptions): Promise<boolean> {
  // TODO: integrate with email provider
  return true;
}
