import { useContext } from "react";
import { ChatContext } from "../../context/context";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";

// required for Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const FileUpload = ({ children }) => {
  const { activeChat, updateActiveChat } = useContext(ChatContext);

  const extractPdfText = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;

    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();

      content.items.forEach((item) => {
        text += item.str + " ";
      });
    }

    return text;
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file || !activeChat) return;

    let extractedText = "";

    // TXT FILE
    if (file.type === "text/plain") {
      extractedText = await file.text();
    }

    // PDF FILE
    else if (file.type === "application/pdf") {
      extractedText = await extractPdfText(file);
    }

    // UNSUPPORTED FILE
    else {
      alert("Only PDF and TXT files supported");
      return;
    }

    // ✅ store extracted file text
    localStorage.setItem("uploadedFileText", extractedText);

    // ✅ flag to indicate file uploaded
    localStorage.setItem("hasUploadedFile", "true");

    // UI message (same design)
    const newMessages = [
      ...activeChat.messages,
      {
        sender: "user",
        text: `📄 Uploaded file: ${file.name}`,
      },
      {
        sender: "gembot",
        text: "I have read your file. You can now ask questions from it.",
      },
    ];

    updateActiveChat(newMessages);
  };

  return (
    <label style={{ cursor: "pointer" }}>
      {children}
      <input type="file" hidden accept=".txt,.pdf" onChange={handleFile} />
    </label>
  );
};

export default FileUpload;
