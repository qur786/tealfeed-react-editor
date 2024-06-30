import { useId } from "react";
import type { DetailedHTMLProps } from "react";
import "./index.css";

export interface SelectInputProps {
  label: string;
  selectProps: DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >;
  options: Record<string, string>; // label => value dictionary
}

export function SelectInput({
  label,
  selectProps,
  options,
}: SelectInputProps): JSX.Element {
  const selectID = useId();
  return (
    <div className="select-container">
      <label htmlFor={selectID}>{label}</label>
      <select id={selectID} {...selectProps}>
        {Object.entries(options).map(([label, value]) => (
          <option value={value} key={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
