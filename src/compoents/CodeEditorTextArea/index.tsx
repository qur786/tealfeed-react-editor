import { useRef, useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import type {
  ChangeEventHandler,
  KeyboardEventHandler,
  UIEventHandler,
} from "react";
import type { AvailableTheme } from "../utils";
import "./index.css";

interface CodeEditorTextAreaProps {
  theme: AvailableTheme;
  tabSize?: number;
  initialText?: string;
}

/**
 * `Main` part of the editor, where user can write code.
 *
 * @param {CodeEditorTextAreaProps} param0
 * @returns {JSX.Element}
 */
export function CodeEditorTextArea({
  theme,
  tabSize = 2,
  initialText = "",
}: CodeEditorTextAreaProps): JSX.Element {
  const [text, setText] = useState(initialText);
  const editorRef = useRef<HTMLDivElement>(null);

  const handleTextChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setText(event.target.value);
  };

  const handleEditorScroll: UIEventHandler<HTMLTextAreaElement> = (event) => {
    editorRef.current?.scrollTo({
      top: event.currentTarget.scrollTop,
    }); // On textarea scroll, scroll the highlight div to maintain the same visible content and to see the content.
  };

  const handleTabKeyInput: KeyboardEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    if (event.code === "Tab") {
      event.preventDefault(); // So, that text-area doesn't loose focus on tab press.

      event.currentTarget.setRangeText(
        " ".repeat(tabSize),
        event.currentTarget.selectionStart,
        event.currentTarget.selectionStart,
        "end",
      ); // Insert tab

      event.currentTarget.dispatchEvent(
        new Event("change", {
          bubbles: true,
        }),
      ); // Dispatching 'change' event, since due to 'event.preventDefault' call, it will kill the change event.
    }
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
        value={text}
        onScroll={handleEditorScroll}
        onChange={handleTextChange}
        onKeyDown={handleTabKeyInput}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        data-gramm={false}
        autoFocus
      />
    </div>
  );
}
