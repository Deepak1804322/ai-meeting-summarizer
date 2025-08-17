import 'dotenv/config';

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = process.env.GROQ_MODEL ?? 'llama-3.1-70b-versatile';

export async function summarizeWithGroq({ transcript, prompt }: { transcript: string; prompt: string; }) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('Missing GROQ_API_KEY');

  const MAX_CHARS = 40000;
  const clipped = transcript.length > MAX_CHARS ? transcript.slice(0, MAX_CHARS) + '\n\n[TRUNCATED]' : transcript;

  const sys =
    'You are a helpful assistant that rewrites transcripts into structured summaries.\n' +
    'Always be factual and concise. If asked to list action items, include owner and due date when present.';

  const user = `Instruction: ${prompt}\n\nTranscript:\n${clipped}`;

  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.3,
      messages: [
        { role: 'system', content: sys },
        { role: 'user', content: user }
      ]
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Groq error ${res.status}: ${text}`);
  }
  const data = await res.json();
  const content = data.choices?.[0]?.message?.content ?? '';
  return content.trim();
}
