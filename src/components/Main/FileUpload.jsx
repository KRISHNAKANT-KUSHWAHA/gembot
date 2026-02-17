

import React from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const FileUpload = ({ children }) => {
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async function () {
      const typedArray = new Uint8Array(this.result);

      const pdf = await pdfjsLib.getDocument(typedArray).promise;

      let fullText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();

        const pageText = textContent.items.map((item) => item.str).join(" ");

        fullText += pageText + "\n\n";
      }

      // Store properly
      sessionStorage.setItem("uploadedFileText", fullText);

      alert("File uploaded successfully!");
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <label style={{ cursor: "pointer" }}>
      <input
        type="file"
        accept="application/pdf"
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />
      {children}
    </label>
  );
};

export default FileUpload;
