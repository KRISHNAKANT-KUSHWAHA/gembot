# 🤖 Gembot – AI-Powered Chat Assistant

Gembot is a modern AI-powered chatbot web application built using React and Google Gemini API.  
It provides real-time AI responses, voice input support, file upload functionality, and a clean chat interface similar to modern conversational AI platforms.

---

## 🚀 Tech Stack

### 🖥 Frontend
- React.js (Vite)
- Context API (State Management)
- CSS3 (Custom Styling)

### 🧠 AI Integration
- Google Generative AI (Gemini 2.5 Flash Model)

### 📦 Tools & Libraries
- @google/generative-ai
- pdfjs-dist (for PDF parsing)
- Vite
- Git & GitHub

---

## ✨ Features

- 💬 Real-time AI Chat using Gemini API
- 🧠 Streaming AI Responses
- 🎤 Voice Input Support
- 📂 File Upload (PDF/Text Processing)
- 📜 Chat History UI
- ⚡ Loading Animation
- 🎨 Clean and Modern UI
- 📱 Responsive Layout
- 🔄 Context-based State Management

---

## 📁 Folder Structure

```bash
gembot/
│
├── public/
│
├── src/
│   ├── assets/             # Icons and Images
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Main.jsx
│   │   ├── FileUpload.jsx
│   │   ├── VoiceInput.jsx
│   │
│   ├── context/
│   │   └── context.jsx     # Global Chat State
│   │
│   ├── gemini.js           # Gemini API Integration
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── Main.css
│
├── package.json
└── README.md


⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone <YOUR_GITHUB_REPO_LINK>
cd gembot

2️⃣ Install Dependencies
npm install

3️⃣ Run the Development Server
npm run dev


App will run at:

http://localhost:5173

🔐 Environment Variables (IMPORTANT)

⚠️ Your current project contains a hardcoded API key inside gemini.js.
This is a security risk and should be fixed immediately.

❌ Current (Not Secure)
const ai = new GoogleGenerativeAI("YOUR_API_KEY");

✅ Recommended Secure Setup

Create a .env file in the root folder:

VITE_GEMINI_API_KEY=your_api_key_here


Then update gemini.js:

const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);


🚨 Never push API keys to GitHub.

🧑‍💻 Usage Instructions

Open the application.

Type your query in the input box.

Click send or press Enter.

View AI-generated response.

Optionally:

🎤 Use voice input

📂 Upload a file for processing

📜 View previous chat entries

📸 Screenshots / Demo

Add screenshots here once available.

![Home Screen](./screenshots/home.png)
![Chat Screen](./screenshots/chat.png)


Live Demo: N/A

🛠 Future Enhancements

🔐 Move Gemini API to backend (Node.js/Express)

💾 Store chat history in MongoDB

🔎 Add prompt templates

🧾 Support for DOCX and image extraction

🌙 Dark Mode Toggle

👤 User Authentication (JWT)

📊 Chat Export (PDF/Markdown)

🚀 Deploy on Vercel/Render

🧠 Multi-model selection (Gemini / OpenAI / Claude)

📱 PWA Support

🤝 Contributing Guidelines

Contributions are welcome!

Steps:

Fork the repository

Create a new branch

git checkout -b feature-name


Commit your changes

git commit -m "Add feature"


Push the branch

git push origin feature-name


Open a Pull Request

Please ensure:

Code is clean and formatted

No API keys are committed

Proper commit messages are used

📜 License

This project is licensed under the MIT License.

👨‍💻 Author

Krishnakant Kushwaha
B.Tech IT Student | React Developer | MERN Stack Enthusiast

📧 Email: your-email@example.com

🔗 GitHub: https://github.com/KRISHNAKANT-KUSHWAHA

🔗 LinkedIn: Add Your LinkedIn URL

🌟 Why This Project Stands Out

Real-time streaming AI responses

Modern React architecture using Context API

Clean UI with modular component structure

Scalable for full-stack production deployment

Strong resume project for AI/Frontend roles

If you like this project, don’t forget to ⭐ the repository!
