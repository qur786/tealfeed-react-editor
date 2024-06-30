import { themes } from "prism-react-renderer";

export const AvailableLanguage = [
  "markup",
  "jsx",
  "tsx",
  "swift",
  "kotlin",
  "objectivec",
  "js-extras",
  "reason",
  "rust",
  "graphql",
  "yaml",
  "go",
  "cpp",
  "markdown",
  "python",
] as const; // Ref: https://github.com/FormidableLabs/prism-react-renderer/blob/e35950e4f9520f33672e94b798eadfd426ef692d/packages/generate-prism-languages/index.ts#L9C1-L25C2

type TupleToUnion<T extends readonly unknown[]> = T[number];

export type AvailableLanguage = TupleToUnion<typeof AvailableLanguage>;
export type AvailableTheme = keyof typeof themes;
