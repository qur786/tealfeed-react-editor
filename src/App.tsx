import { CodeEditor } from "./compoents/CodeEditor";
import "./App.css";

export function App(): JSX.Element {
  const initialText = `
import React from "react";
import ReactDOM from "react-dom";

function App() {
  return (
    <h1>Hello world</h1>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
`;
  return (
    <div className="main-container">
      <p className="heading">Custom Editor</p>
      <CodeEditor
        style={{
          width: "100%",
          height: 400,
          border: "1px solid black",
        }}
        initialText={initialText}
      />
    </div>
  );
}
