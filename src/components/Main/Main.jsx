import { useState, useContext, useEffect } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { getGeminiResponse } from "../../config/gemini";
import { ChatContext } from "../../context/context";

import FileUpload from "./FileUpload";
import VoiceInput from "./VoiceInput";

const Main = () => {
  const { activeChat, updateActiveChat } = useContext(ChatContext);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // load selected chat messages
  useEffect(() => {
    if (activeChat) {
      setMessages(activeChat.messages);
    } else {
      setMessages([]);
    }
  }, [activeChat]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    updateActiveChat(newMessages);

    setLoading(true);
    setInput("");

    try {
      // ✅ get file text directly from context or state (NOT localStorage)
      const fileText = sessionStorage.getItem("uploadedFileText");

      const isDocumentMode = fileText && fileText.trim().length > 20;

      const finalPrompt = isDocumentMode
        ? `
Answer ONLY using the uploaded document.

DOCUMENT:
${fileText}

QUESTION:
${input}

If answer not in document, reply exactly:
"The answer is not available in the uploaded file."
`
        : input;

      const result = await getGeminiResponse(finalPrompt);

      const botMessage = { sender: "gembot", text: result };
      const updatedMessages = [...newMessages, botMessage];

      setMessages(updatedMessages);
      updateActiveChat(updatedMessages);
    } catch (err) {
      const errorMessage = {
        sender: "gembot",
        text: "❌ Gemini error.",
      };

      const updatedMessages = [...newMessages, errorMessage];
      setMessages(updatedMessages);
      updateActiveChat(updatedMessages);
    }

    setLoading(false);
  };

  return (
    <div className="main">
      <div className="nav">
        <p>GemBot</p>
        <img src={assets.user_icon} alt="User" />
      </div>

      <div className="main-container">
        {messages.length === 0 && (
          <div className="container">
            <div className="greet">
              <p>
                <span>Hello, kk.</span>
              </p>
              <p>How can I help you today?</p>
            </div>

            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </div>
        )}

        {messages.length > 0 && (
          <div className="chat-box">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === "user" ? "user-message" : "bot-message"
                }
              >
                <p>{msg.text}</p>
              </div>
            ))}
            {loading && <div className="loader">GemBot is typing...</div>}
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter a prompt here"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />

            <div>
              <FileUpload>
                <img src={assets.gallery_icon} alt="Upload" />
              </FileUpload>

              <VoiceInput setInput={setInput}>
                <img src={assets.mic_icon} alt="Mic" />
              </VoiceInput>

              <img
                src={assets.send_icon}
                alt="Send"
                style={{ cursor: "pointer" }}
                onClick={handleSend}
              />
            </div>
          </div>

          <div className="bottom-info">
            <p>
              {loading ? "Gemini is thinking..." : "Ask anything you want!"}
            </p>
            <h4>made with ❤️ by Krishnakant</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
