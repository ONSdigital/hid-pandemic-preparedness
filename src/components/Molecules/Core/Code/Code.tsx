import clsx from "clsx";
import { useRef, useEffect, useState, type FC } from "react";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
// import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
// import r from "react-syntax-highlighter/dist/esm/languages/prism/r";
// import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
// import yaml from "react-syntax-highlighter/dist/esm/languages/prism/yaml";

// import lightTheme from "react-syntax-highlighter/dist/esm/styles/prism/one-light";
// import darkTheme from "react-syntax-highlighter/dist/esm/styles/prism/one-dark";
import { CopyButton } from "@src/components/Molecules/Core/CopyButton/CopyButton";
import type { CodeProps, ToggleSwitchProps } from "./Code.interface";
import styles from "./Code.module.scss";

console.log(SyntaxHighlighter);

const ToggleSwitch: FC<ToggleSwitchProps> = (props) => {
  const sliderWidth = `calc(100% / ${props.languages.length})`;

  const sliderTransform = `translateX(calc(100% * ${props.selectedId})`;

  const handleLanguageSelection = (index: number) => {
    props.toggle(index);
  };

  return (
    <div className={clsx("text-center")}>
      <hr />

      <div className={clsx(styles["toggle"])}>
        <div
          className={clsx(styles["slider"])}
          style={{ width: sliderWidth, transform: sliderTransform }}
        />

        {props.languages.map((languageEl, index: number) => (
          <button
            key={languageEl._uid}
            onClick={() => handleLanguageSelection(index)}
            className={clsx(styles["button"], {
              [styles["active"]]: props.selectedId === index,
            })}
          >
            {languageEl.label || languageEl.language}
          </button>
        ))}
      </div>
      <hr />
    </div>
  );
};

export const Code: FC<CodeProps> = (props) => {
  // const theme = "light";
  // const colorTheme = theme === "light" ? lightTheme : darkTheme;
  const contentElement = useRef<HTMLDivElement>(null);

  const [selectedId, setSelectedId] = useState(0);

  const toggle = (option: number) => {
    setSelectedId(option);
  };

  const languages = props.languages;
  // const language = languages[selectedId].language;
  const code = languages[selectedId].code;

  // useEffect(() => {
  //   SyntaxHighlighter.registerLanguage("python", python);
  //   SyntaxHighlighter.registerLanguage("r", r);
  //   SyntaxHighlighter.registerLanguage("bash", bash);
  //   SyntaxHighlighter.registerLanguage("yaml", yaml);
  // }, []);
  return (
    <div>
      <h3>{props.title}</h3>

      <ToggleSwitch
        toggle={toggle}
        languages={languages}
        selectedId={selectedId}
      />

      <div className={clsx("text-end")}>
        <CopyButton contentElement={contentElement} />
      </div>

      {/* <SyntaxHighlighter
        // style={colorTheme}
        language={language.toLowerCase()}
        showLineNumbers={true}
        codeTagProps={{
          style: {
            fontFamily: "monospace",
            fontSize: "1em",
            background: "transparent",
          },
        }}
      >
        {code.trim()}
      </SyntaxHighlighter> */}

      {/* Required for copy functionality to work */}
      <div className={clsx("d-none")} ref={contentElement}>
        <pre>{code.trim()}</pre>
      </div>
    </div>
  );
};
