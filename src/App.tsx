import { CodeEditor } from "./compoents/CodeEditor";

export function App(): JSX.Element {
  return (
    <CodeEditor
      style={{
        width: "100%",
        height: 400,
        border: "1px solid black",
      }}
    />
  );
}
