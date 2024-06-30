import { CodeEditor } from "./compoents/CodeEditor";
import "./App.css";

export function App(): JSX.Element {
  return (
    <div className="main-container">
      <p className="heading">Custom Editor</p>
      <CodeEditor
        style={{
          width: "100%",
          height: 400,
          border: "1px solid black",
        }}
      />
    </div>
  );
}
