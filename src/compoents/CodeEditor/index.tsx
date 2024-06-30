import { useState } from "react";
import { themes } from "prism-react-renderer";
import { AvailableTheme, AvailableLanguage } from "../utils";
import { SelectInput } from "../SelectInput";
import { CodeEditorTextArea } from "../CodeEditorTextArea";
import type { CSSProperties } from "react";
import type { SelectInputProps } from "../SelectInput";
import "./index.css";

interface CodeEditorProps {
  style: CSSProperties;
}

export function CodeEditor({ style = {} }: CodeEditorProps): JSX.Element {
  const [theme, setTheme] = useState<AvailableTheme>("vsDark");
  const [language, setLanguage] = useState<AvailableLanguage>("tsx");

  const handleThemeSelect: SelectInputProps["selectProps"]["onChange"] = (
    event,
  ) => {
    setTheme(event.currentTarget.value as AvailableTheme);
  };

  const handleLanguageSelect: SelectInputProps["selectProps"]["onChange"] = (
    event,
  ) => {
    setLanguage(event.currentTarget.value as AvailableLanguage);
  };

  return (
    <div className="main" style={style}>
      <div className="header">
        <SelectInput
          label="Select theme:"
          selectProps={{
            value: theme,
            onChange: handleThemeSelect,
          }}
          options={Object.keys(themes).reduce(
            (acc, ele) => ({ ...acc, [ele]: ele }),
            {},
          )}
        />
        <SelectInput
          label="Select language:"
          selectProps={{
            value: language,
            onChange: handleLanguageSelect,
          }}
          options={AvailableLanguage.reduce(
            (acc, ele) => ({ ...acc, [ele]: ele }),
            {},
          )}
        />
      </div>
      <CodeEditorTextArea theme={theme} />
    </div>
  );
}
