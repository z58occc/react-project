import React, { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import Quill from "quill";

const EditorQuill = forwardRef(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      ref.current?.enable(!readOnly);
    }, [ref, readOnly]);

    useEffect(() => {
      const container = containerRef.current;
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement("div")
      );
      const toolbarOptions = {
        container: [
          [{ header: [1, 2, 3] }],
          [{ size: ["small", false, "large", "huge"] }],
          ["bold", "italic", "underline", "strike", { align: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ color: [] }, { background: [] }],
          // 新增了一個 uploadImage 的功能
          ["link", { uploadImage: true }, "video"],
          ["clean"],
        ],
        handlers: {
          uploadImage: function () {
            let fileInput = document.createElement("input");
            fileInput.setAttribute("type", "file");
            fileInput.setAttribute("accept", "image/*");
            fileInput.click();

            fileInput.addEventListener("change", () => {
              const file = fileInput.files[0];
              const reader = new FileReader();
              reader.onloadend = async () => {
                let formData = new FormData();
                formData.append("files[0]", file, file.name);
                try {
                  // 上傳圖片的 API Demo
                  // const res = await uploadImageAPI(formData);
                  // const imageUrl = res.data.urls;
                  // imageUrl 是上傳後取得的圖片網址
                  const imageUrl = "https://muki.tw/images/cover.jpg";
                  let range = this.quill.getSelection();
                  quill.insertEmbed(range.index, "image", imageUrl);
                  // 取得剛插入的圖片並設置樣式 max-width = 100%
                  setTimeout(() => {
                    let img = this.quill.root.querySelector(
                      `img[src="${imageUrl}"]`
                    );
                    if (img) {
                      img.style.maxWidth = "100%";
                    }
                  }, 10);
                } catch (error) {
                  console.error("Response error:", error);
                }
              };
              reader.readAsArrayBuffer(file);
            });
          },
        },
      };

      const quill = new Quill(editorContainer, {
        theme: "snow",
        placeholder: "請輸入內容...",
        modules: {
          toolbar: toolbarOptions,
        },
      });

      ref.current = quill;

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      quill.on(Quill.events.TEXT_CHANGE, (delta, oldDelta, source) => {
        onTextChangeRef.current?.(quill.getContents(), delta, source, quill);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        ref.current = null;
        container.innerHTML = "";
      };
    }, [ref]);

    return <div ref={containerRef}></div>;
  }
);

EditorQuill.displayName = "EditorQuill";

export default EditorQuill;
