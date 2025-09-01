// import { useState } from "react";
// import "./Main.css";
// import { assets } from "../../assets/assets";
// import { getGeminiResponse } from "../../config/gemini"; // ✅ Ensure this works

// const Main = () => {
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const userMessage = { sender: "user", text: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setLoading(true);
//     setInput("");

//     try {
//       const result = await getGeminiResponse(input);
//       const botMessage = { sender: "gembot", text: result };
//       setMessages((prev) => [...prev, botMessage]);
//     } catch (err) {
//       const errorMessage = {
//         sender: "gembot",
//         text: "❌ Gemini couldn't respond properly.",
//       };
//       setMessages((prev) => [...prev, errorMessage]);
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="main">
//       <div className="nav">
//         <p>GemBot</p>
//         <img src={assets.user_icon} alt="User" />
//       </div>

//       <div className="main-container">
//         {messages.length === 0 && (
//           <div className="container">
//             <div className="greet">
//               <p>
//                 <span>Hello, kk.</span>
//               </p>
//               <p>How can I help you today?</p>
//             </div>

//             <div className="cards">
//               <div className="card">
//                 <p>Suggest beautiful places to see on an upcoming road trip</p>
//                 <img src={assets.compass_icon} alt="" />
//               </div>
//               <div className="card">
//                 <p>Briefly summarize this concept: urban planning</p>
//                 <img src={assets.bulb_icon} alt="" />
//               </div>
//               <div className="card">
//                 <p>Brainstorm team bonding activities for our work retreat</p>
//                 <img src={assets.message_icon} alt="" />
//               </div>
//               <div className="card">
//                 <p>Improve the readability of the following code</p>
//                 <img src={assets.code_icon} alt="" />
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ✅ Chatbox showing conversation */}
//         {messages.length > 0 && (
//           <div className="chat-box">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={msg.sender === "user" ? "user-message" : "bot-message"}
//               >
//                 <p>{msg.text}</p>
//               </div>
//             ))}
//             {loading && <div className="loader">GemBot is typing...</div>}
//           </div>
//         )}

//         <div className="main-bottom">
//           <div className="search-box">
//             <input
//               type="text"
//               placeholder="Enter a prompt here"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSend()}
//             />
//             <div>
//               <img src={assets.gallery_icon} alt="Gallery" />
//               <img src={assets.mic_icon} alt="Mic" />
//               <img
//                 src={assets.send_icon}
//                 alt="Send"
//                 style={{ cursor: "pointer" }}
//                 onClick={handleSend}
//               />
//             </div>
//           </div>
//           <div className="bottom-info">
//             <p>{loading ? "Gemini is thinking..." : "Ask anything you want!"}</p>
//             <h4>made with ❤️ by Krishnakant</h4>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Main;


// src/components/Main/Main.jsx
import { useState, useContext, useEffect } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { getGeminiResponse } from "../../config/gemini";
import { ChatContext } from "../../context/context";

const Main = () => {
  const { activeChat, updateActiveChat } = useContext(ChatContext);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Load selected chat's messages
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
      const result = await getGeminiResponse(input);
      const botMessage = { sender: "gembot", text: result };
      const updatedMessages = [...newMessages, botMessage];
      setMessages(updatedMessages);
      updateActiveChat(updatedMessages);
    } catch (err) {
      const errorMessage = { sender: "gembot", text: "❌ Gemini error." };
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
        {/* ✅ Cards should still show when no messages */}
        {messages.length === 0 && (
          <div className="container">
            <div className="greet">
              <p><span>Hello, kk.</span></p>
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
              <div key={index} className={msg.sender === "user" ? "user-message" : "bot-message"}>
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
              <img src={assets.gallery_icon} alt="Gallery" />
              <img src={assets.mic_icon} alt="Mic" />
              <img
                src={assets.send_icon}
                alt="Send"
                style={{ cursor: "pointer" }}
                onClick={handleSend}
              />
            </div>
          </div>
          <div className="bottom-info">
            <p>{loading ? "Gemini is thinking..." : "Ask anything you want!"}</p>
            <h4>made with ❤️ by Krishnakant</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
