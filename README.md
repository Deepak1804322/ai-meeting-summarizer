# ai-meeting-summarizer

# AI Meeting Summarizer

An AI-powered full-stack web application that allows users to upload meeting transcripts, generate summaries using AI, edit them, and share via email.

## 🚀 Features

- Upload `.txt` transcript or paste meeting notes directly.
- Add custom summarization instructions (e.g., "Highlight only action items").
- Generate structured summaries using **Groq AI**.
- Edit the generated summary before finalizing.
- Share the final summary via email with multiple recipients.
- Simple UI (built with Vite + React + Tailwind).

## 🛠️ Tech Stack

- **Frontend:** React + Vite + Tailwind  
- **Backend:** Node.js + Express + TypeScript  
- **AI Service:** Groq (Llama 3 model)  
- **Email Service:** Resend  
- **Deployment:** Vercel / Render / Netlify / Heroku  

## 📸 Screenshots

1. Home Page (Empty)  
2. Transcript Uploaded  
3. Custom Instruction Added  
4. Summary Generated  
5. Edited Summary  
6. Email Recipients Added  
7. Email Sent  
8. Email Received in Inbox  

(Add screenshots in `assets/` folder and link them here like below)

![Home](assets/screenshot1.png)  
![Transcript](assets/screenshot2.png)  

## ⚡ How to Run Locally

### 1. Clone Repository
```bash
git clone https://github.com/your-username/ai-meeting-summarizer.git
cd ai-meeting-summarizer
```

### 2. Setup Backend
```bash
cd server
npm install
copy .env.example .env
notepad .env   # Add your Groq & Resend API keys
npm run dev
```
Backend runs on: `http://localhost:8080`

### 3. Setup Frontend
```bash
cd ../web
npm install
npm run dev
```
Frontend runs on: `http://localhost:5173`

## 📧 Example Output (Email Received)

**Summary**
- The team is planning a product launch for next month  
- Discussions are underway to finalize the launch details  

**Key Decisions**
- The launch date needs to be finalized by Friday  

**Action Items**
- Charlie: Draft the press release and share by Wednesday  
- Marketing team: Prepare social media content (no due date specified)  

## 🎥 Demo

### Option 1: GIF inside README
![Demo](assets/demo.gif)

### Option 2: Video Thumbnail linked to full video
[![Watch Demo](assets/video-thumbnail.png)](https://drive.google.com/your-video-link-here)

---
