"use client"

import { useEffect, useRef, useState } from "react";
import 'quill/dist/quill.snow.css'; // Import Quill's snow theme styles

// Import the type for Quill
import type QuillType from 'quill';

const QuillEditor = () => {
  const editorRef = useRef(null); // Reference for the editor container
  const [quill, setQuill] = useState<QuillType | null>(null); // Correctly typed Quill instance

  useEffect(() => {
    const initializeQuill = async () => {
      if (editorRef.current) {  // Ensure editorRef is not null
        const { default: Quill } = await import('quill'); // Dynamically import Quill
        const quillInstance = new Quill(editorRef.current as HTMLElement, {
          theme: 'snow', // Theme options: 'snow' or 'bubble'
          placeholder: 'Write something...',
        });
        setQuill(quillInstance); // Store the Quill instance in state
      }
    };

    if (typeof window !== 'undefined') {
      initializeQuill(); // Only initialize when the window is available
    }
  }, []);

  return (
    <div>
      {/* Set the reference for the editor container */}
      <div ref={editorRef} style={{ height: "300px" }} />
    </div>
  );
};

export default QuillEditor;
