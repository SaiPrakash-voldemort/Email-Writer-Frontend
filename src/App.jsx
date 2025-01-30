/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./index.css";
import "./App.css";
import axios from "axios";

const App = () => {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [generatedReply, setGeneratedReply] = useState(
    "Reply will be shown here 😊"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleInputChange = (event) => {
    setEmailContent(event.target.value);
  };

  const handleToneChange = (event) => {
    setTone(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:8080/api/email/generate",
        { emailContent, tone }
      );
      setGeneratedReply(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data)
      );
    } catch (error) {
      setError("Failed to generate email reply. Please try again 😊");
      console.error(error);
    } finally {
      setLoading(false); // Stop the loader after the request completes
    }
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedReply).then(() => {
      setCopied(true); // Show feedback that the text was copied
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <>
      <div className="w-screen h-screen bg-slate-800 flex flex-wrap items-center justify-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl text-center m-2 p-2 font-bold text-white">
            Email Reply Generator
          </h1>
          <textarea
            className="rounded-lg m-2 p-1 border-black text-s font-semibold emailTextArea"
            rows="12"
            cols="50"
            placeholder="Enter your email here"
            onChange={handleInputChange}
          ></textarea>
          <div className="app">
            <label
              htmlFor="tone-select"
              className="text-lg font-semibold text-white"
            >
              Tone:
            </label>
            <select
              id="tone-select"
              value={tone}
              onChange={handleToneChange}
              className="ml-2 p-2 rounded-lg font-semibold toneTropBox bg-white"
            >
              <option value="" disabled>
                Select a tone
              </option>
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="friendly">Friendly</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            disabled={!emailContent || loading} // Disable button if no content or loading
            className={`p-2 rounded ${
              emailContent && !loading
                ? "bg-blue-500 text-white cursor-pointer"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            } w-1/3 m-2 p-2 font-semibold`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="loader border-2 border-white border-t-transparent rounded-full w-4 h-4 mr-2 animate-spin"></div>
                Submitting...
              </div>
            ) : (
              "Submit"
            )}
          </button>
          {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
        </div>

        <div
          className={`h-1/3 w-1/3 m-2 p-1 bg-white rounded-lg text-s  font-semibold 
        }`}
        >
          {generatedReply}
        </div>
      </div>
 
    </>
  );
};

export default App;

{/* <button
onClick={handleCopy}
disabled={
  !generatedReply || generatedReply === "Reply will be shown here 😊"
}
className={`mt-2 p-2 rounded ${
  generatedReply && generatedReply !== "Reply will be shown here 😊"
    ? "bg-green-500 text-white cursor-pointer"
    : "bg-gray-400 text-gray-700 cursor-not-allowed"
} w-1/4 font-semibold`}
>
{copied ? "Copied!" : "Copy to Clipboard"}
</button> */}