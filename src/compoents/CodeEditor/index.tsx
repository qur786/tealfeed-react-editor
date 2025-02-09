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
  initialText?: string;
}

/**
 * Editor component with `theme` and `language` selection for user.
 *
 * @param {CodeEditorProps} param0
 * @returns {JSX.Element}
 */
export function CodeEditor({
  style = {},
  initialText,
}: CodeEditorProps): JSX.Element {
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
        {/* Select inputs to select theme and language of the editor. */}
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
      <CodeEditorTextArea theme={theme} initialText={initialText} />
    </div>
  );
}
