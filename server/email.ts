import { Resend } from 'resend';
import 'dotenv/config';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.MAIL_FROM ?? 'no-reply@example.com';

export async function sendEmail({ to, subject, html }: { to: string[]; subject: string; html: string; }) {
  if (!process.env.RESEND_API_KEY) throw new Error('Missing RESEND_API_KEY');

  const resp = await resend.emails.send({
    from: FROM,
    to,
    subject,
    html
  });
  return resp;
}
