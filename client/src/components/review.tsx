import { useState, useEffect } from 'react';
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios';
import './review.css';

function Review() {
  const [code, setCode] = useState(`Write code Here`);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false); // 👈 Loading state

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    setLoading(true); // Show loading
    try {
      const response = await axios.post('https://byteguardian.onrender.com/ai/get-review', { code });
      setReview(response.data);
    } catch (error) {
      setReview("❌ Error: Failed to fetch review.");
    }
    setLoading(false); // Hide loading
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira Code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
              }}
            />
          </div>
          <div onClick={reviewCode} className="review">Review</div>
        </div>

        <div className="right">
          {loading ? ( // 👈 Show loading text while waiting for response
            <div className="loading">
            <div className="ui-abstergo">
  <div className="abstergo-loader">
    <div></div>
    <div></div>
    <div></div>
  </div>
  <div className="ui-text">
    Reviewing
    <div className="ui-dot"></div>
    <div className="ui-dot"></div>
    <div className="ui-dot"></div>
  </div>
</div>
            </div>
          ) : (
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          )}
        </div>
      </main>
    </>
  );
}

export default Review;
