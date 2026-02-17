const VoiceInput = ({ setInput, children }) => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const startListening = () => {
    if (!SpeechRecognition) {
      alert("Voice not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      setInput(event.results[0][0].transcript);
    };

    recognition.start();
  };

  return (
    <span onClick={startListening} style={{ cursor: "pointer" }}>
      {children}
    </span>
  );
};

export default VoiceInput;
