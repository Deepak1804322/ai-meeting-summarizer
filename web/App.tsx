import React, { useState } from 'react';
import { summarize, sendEmail } from './api';

export default function App() {
  const [transcript, setTranscript] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState('Summarize in bullet points with sections: Summary, Key Decisions, Action Items (Owner, Due Date).');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailTo, setEmailTo] = useState('');
  const [emailSubject, setEmailSubject] = useState('Meeting Summary');
  const [status, setStatus] = useState('');

  async function onGenerate() {
    try {
      setLoading(true);
      setStatus('');
      const { summary } = await summarize({ transcript, prompt, file });
      setSummary(summary);
    } catch (e: any) {
      setStatus(e?.message ?? 'Failed to generate summary');
    } finally {
      setLoading(false);
    }
  }

  async function onSend() {
    try {
      setLoading(true);
      setStatus('');
      const html = summary.replace(/\n/g, '<br/>');
      await sendEmail({ to: emailTo, subject: emailSubject, html });
      setStatus('Email sent ✅');
    } catch (e: any) {
      setStatus(e?.message ?? 'Failed to send email');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: '24px auto', padding: 16, fontFamily: 'system-ui, sans-serif' }}>
      <h1>AI Meeting Summarizer</h1>

      <section style={{ marginTop: 16, padding: 12, border: '1px solid #ddd' }}>
        <h3>1) Transcript</h3>
        <p>Upload a .txt file or paste text below.</p>
        <input type="file" accept=".txt" onChange={e => setFile(e.target.files?.[0] ?? null)} />
        <textarea
          placeholder="Paste transcript here..."
          value={transcript}
          onChange={e => setTranscript(e.target.value)}
          rows={10}
          style={{ width: '100%', marginTop: 8 }}
        />
      </section>

      <section style={{ marginTop: 16, padding: 12, border: '1px solid #ddd' }}>
        <h3>2) Custom Instruction</h3>
        <input
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          style={{ width: '100%', padding: 8 }}
        />
        <button onClick={onGenerate} disabled={loading} style={{ marginTop: 12 }}> {loading ? 'Generating...' : 'Generate Summary'} </button>
      </section>

      <section style={{ marginTop: 16, padding: 12, border: '1px solid #ddd' }}>
        <h3>3) Editable Summary</h3>
        <textarea
          value={summary}
          onChange={e => setSummary(e.target.value)}
          rows={16}
          style={{ width: '100%' }}
        />
      </section>

      <section style={{ marginTop: 16, padding: 12, border: '1px solid #ddd' }}>
        <h3>4) Share via Email</h3>
        <input placeholder="recipient1@example.com, recipient2@example.com" value={emailTo} onChange={e => setEmailTo(e.target.value)} style={{ width: '100%', padding: 8 }} />
        <input placeholder="Subject" value={emailSubject} onChange={e => setEmailSubject(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 8 }} />
        <button onClick={onSend} disabled={loading || !summary} style={{ marginTop: 12 }}>Send Email</button>
        {status && <p style={{ marginTop: 8 }}>{status}</p>}
      </section>

      <footer style={{ marginTop: 24, color: '#666' }}>
        <small>Tip: Edit the summary above before sending.</small>
      </footer>
    </div>
  );
}
