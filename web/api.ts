const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

export async function summarize({ transcript, prompt, file }: { transcript?: string; prompt: string; file?: File | null; }) {
  if (file) {
    const form = new FormData();
    form.append('prompt', prompt);
    form.append('file', file);
    const res = await fetch(`${API_URL}/api/summarize`, { method: 'POST', body: form });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  } else {
    const res = await fetch(`${API_URL}/api/summarize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transcript, prompt })
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }
}

export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string; }) {
  const res = await fetch(`${API_URL}/api/send-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ to, subject, html })
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
