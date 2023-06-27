import React, { useRef, useState, useEffect } from "react";
import { marked } from "marked";
import hljs from "highlight.js";
import DOMPurify from "dompurify";
import { InitialMarkdown } from "./InitialMarkdown.js";

function App() {
  const editorWrapRef = useRef(null);
  const previewWrapRef = useRef(null);
  const editorIconRef = useRef(null);
  const previewIconRef = useRef(null);

  const [markdown, setMarkdown] = useState(InitialMarkdown);

  // Markdown converter
  const getMarkdownPreview = () => {
    marked.use({ breaks: true, mangle: false, headerIds: false });
    return { __html: DOMPurify.sanitize(marked.parse(markdown)) };
  };

  useEffect(() => {
    // Highlight code blocks
    const codeBlocks = document.querySelectorAll("code");
    codeBlocks.forEach((code) => {
      hljs.highlightElement(code);
    });
  }, [markdown]);

  // Editor click icon
  const editorClick = () => {
    editorWrapRef.current.classList.toggle("maximized");
    previewWrapRef.current.classList.toggle("hide");

    if (editorWrapRef.current.classList.contains("maximized")) {
      editorIconRef.current.classList.replace(
        "fa-maximize",
        "fa-down-left-and-up-right-to-center"
      );
    } else {
      editorIconRef.current.classList.replace(
        "fa-down-left-and-up-right-to-center",
        "fa-maximize"
      );
    }
  };

  // Preview click icon
  const previewClick = () => {
    previewWrapRef.current.classList.toggle("maximized");
    editorWrapRef.current.classList.toggle("hide");

    if (previewWrapRef.current.classList.contains("maximized")) {
      previewIconRef.current.classList.replace(
        "fa-maximize",
        "fa-down-left-and-up-right-to-center"
      );
    } else {
      previewIconRef.current.classList.replace(
        "fa-down-left-and-up-right-to-center",
        "fa-maximize"
      );
    }
  };

  return (
    <div className="App">
      <div className="editorWrap" ref={editorWrapRef}>
        <div className="toolbar">
          <i className="fa-brands fa-free-code-camp"></i>
          Editor
          <i
            className="fa-solid fa-maximize"
            ref={editorIconRef}
            onClick={editorClick}
          ></i>
        </div>
        <textarea
          id="editor"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
        ></textarea>
      </div>
      <div className="converter"></div>
      <div className="previewWrap" ref={previewWrapRef}>
        <div className="toolbar">
          <i className="fa-brands fa-free-code-camp"></i>
          Previewer
          <i
            className="fa-solid fa-maximize"
            onClick={previewClick}
            ref={previewIconRef}
          ></i>
        </div>
        <div id="preview" dangerouslySetInnerHTML={getMarkdownPreview()}></div>
      </div>
    </div>
  );
}

export default App;
