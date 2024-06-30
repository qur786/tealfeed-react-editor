import { useRef, useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import type { ChangeEventHandler, UIEventHandler } from "react";
import type { AvailableTheme } from "../utils";
import "./index.css";

interface CodeEditorTextAreaProps {
  theme: AvailableTheme;
}

export function CodeEditorTextArea({
  theme,
}: CodeEditorTextAreaProps): JSX.Element {
  const [text, setText] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);

  const handleTextChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setText(event.target.value);
  };

  const handleEditorScroll: UIEventHandler<HTMLTextAreaElement> = (event) => {
    editorRef.current?.scrollTo({
      top: event.currentTarget.scrollTop,
    });
  };
  return (
    <div className="container">
      <pre
        className="highlight editor"
        children={
          <Highlight code={text} language="tsx" theme={themes[theme]}>
            {({ style, tokens, getLineProps, getTokenProps }) => (
              <div
                ref={editorRef}
                style={{
                  ...style,
                  overflow: "auto",
                  height: "100%",
                  width: "100%",
                  padding: 0,
                  flexGrow: 1,
                  border: "1px solid black",
                }}
              >
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </div>
            )}
          </Highlight>
        }
      />
      <textarea
        className="textarea editor"
        onScroll={handleEditorScroll}
        value={text}
        onChange={handleTextChange}
        onKeyDown={(event) => {
          if (event.code === "Tab") {
            const e = event;
            const start = e.currentTarget.selectionStart;
            // e.currentTarget.selectionEnd =
            //   start + Number.parseInt(e.currentTarget.style.tabSize, 10);
            setText((prev) => {
              return prev.slice(0, start) + "\t" + prev.slice(start);
            });
            // event.currentTarget.setRangeText(
            //   "\t",

            //   event.currentTarget.selectionStart,

            //   event.currentTarget.selectionStart,

            //   "end",
            // );
            // setValue((value) => value.concat("\t"));
            return false;
          }
        }}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        data-gramm={false}
      />
    </div>
  );
}
