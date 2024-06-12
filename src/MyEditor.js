import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { debounce } from "throttle-debounce";
import { CustomText } from "./components/Extension";

const MyEditor = () => {
  const editorRef = useRef(null);
  const [editor, setEditor] = useState(null);
  const [videoSuggestions, setVideoSuggestions] = useState([]);
  const videoInputElRef = useRef(null);
  const videoSuggestionsElRef = useRef(null);

  useEffect(() => {
    const editorInstance = new Editor({
      element: editorRef.current,
      extensions: [StarterKit, CustomText],
      onTransaction(transaction) {
        console.log("transaction", editorInstance.getJSON());
      },
      content: `
        <p>This is still the text editor you're used to, but enriched with node views.</p>
        <node-view></node-view>
        <p>Did you see that? That's a JavaScript node view. We are really living in the future.</p>
      `,
    });

    setEditor(editorInstance);

    return () => {
      editorInstance.destroy();
    };
  }, []);

  useEffect(() => {
    const syncArrayToList = () => {
      const videoSuggestionsEl = videoSuggestionsElRef.current;
      if (videoSuggestionsEl) {
        videoSuggestionsEl.innerHTML = "";
        videoSuggestions.forEach((videoSuggestion) => {
          const buttonEl = document.createElement("button");
          const listItem = document.createElement("li");
          buttonEl.textContent = videoSuggestion.label;
          listItem.appendChild(buttonEl);
          videoSuggestionsEl.appendChild(listItem);
        });
      }
    };

    syncArrayToList();
  }, [videoSuggestions]);

  const videoInputEl_onInput = debounce(1000, async (event) => {
    const res = [
      {
        label: `suggestion ${Math.random().toString().slice(-2)}`,
        data: { link: "https://www.youtube.com/watch?v=m4L20t8Dvlg" },
      },
      {
        label: `suggestion ${Math.random().toString().slice(-2)}`,
        data: { link: "https://www.youtube.com/watch?v=m4L20t8Dvlg" },
      },
      {
        label: `suggestion ${Math.random().toString().slice(-2)}`,
        data: { link: "https://www.youtube.com/watch?v=m4L20t8Dvlg" },
      },
    ];
    setVideoSuggestions([...res]);
    console.warn("wakekeke", res);
  });

  useEffect(() => {
    const videoInputEl = videoInputElRef.current;
    if (videoInputEl) {
      videoInputEl.addEventListener("input", videoInputEl_onInput);
    }

    return () => {
      if (videoInputEl) {
        videoInputEl.removeEventListener("input", videoInputEl_onInput);
      }
    };
  }, []);

  return (
    <div>
      <div className="element" ref={editorRef}></div>
      <input id="video-input" ref={videoInputElRef} />
      <ul id="video-suggestions" ref={videoSuggestionsElRef}></ul>
    </div>
  );
};

export default MyEditor;