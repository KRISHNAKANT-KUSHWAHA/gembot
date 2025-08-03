import { useState } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { getGeminiResponse } from "../../config/gemini"; // ✅ Ensure this is correct

const Main = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSend = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResponse("Thinking...");

    try {
      const result = await getGeminiResponse(input);
      console.log("Gemini result:", result);
      setResponse(result);
    } catch (err) {
      setResponse("❌ Gemini couldn't respond properly.");
    }

    setLoading(false);
    setInput(""); // clear input
  };
  

  return (
    <div className="main">
      <div className="nav">
        <p>GemBot</p>
        <img src={assets.user_icon} alt="User" />
      </div>

      <div className="main-container">
        {/* ✅ Hide container if there's a response */}
        {!response && (
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

        {/* ✅ Show Gemini response instead */}
        {response && (
          <div className="response-box">
            <h3>GemBot</h3>
            <p>{response}</p>
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
          <p className="bottom-info">
            {loading ? "Gemini is thinking..." : "Ask anything you want!"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
