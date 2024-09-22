import React, { useState, useRef } from "react";
import EditorQuill from "./EditorQuill";
import "quill/dist/quill.snow.css";

export const Editor = ({setTempQuill}) => {
  const quillRef = useRef();

  const handleChange = (content, delta, source, editor) => {
    // 使用 setTimeout 取得增加 style 樣式的 HTML
    // 我將編輯器的語法用 console 印出來，使用時只要處理這段 HtmlContent 即可
    setTimeout(() => {
      setTempQuill(editor.root.innerHTML)
      
    }, 20);
  };

  return (
    <div className="mb-24">
      <EditorQuill ref={quillRef} onTextChange={handleChange} />
    </div>
  );
};

export default Editor;
