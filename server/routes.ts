import { Router } from 'express';
import multer from 'multer';
import { z } from 'zod';
import { summarizeWithGroq } from './llm.js';
import { sendEmail } from './email.js';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });
export const router = Router();

const SummarizeSchema = z.object({
  prompt: z.string().min(1),
  transcript: z.string().optional()
});

router.post('/summarize', upload.single('file'), async (req, res) => {
  try {
    let transcript = '';
    const prompt = (req.body?.prompt ?? '').toString();

    const parsed = SummarizeSchema.safeParse({ prompt, transcript: req.body?.transcript });
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

    if (req.file) {
      const text = req.file.buffer.toString('utf8');
      transcript = text;
    } else {
      transcript = (req.body?.transcript ?? '').toString();
    }

    if (!transcript.trim()) return res.status(400).json({ error: 'Transcript is required (file or text)' });

    const summary = await summarizeWithGroq({ transcript, prompt });
    res.json({ summary });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message ?? 'Server error' });
  }
});

const EmailSchema = z.object({
  to: z.string().min(3), // comma-separated
  subject: z.string().min(1),
  html: z.string().min(1)
});

router.post('/send-email', async (req, res) => {
  try {
    const parsed = EmailSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

    const to = req.body.to.split(',').map((s: string) => s.trim()).filter(Boolean);
    const { subject, html } = req.body;

    const resp = await sendEmail({ to, subject, html });
    res.json({ ok: true, id: resp.data?.id ?? null });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message ?? 'Server error' });
  }
});
