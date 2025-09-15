import { RiGlobalLine } from "@remixicon/react";
import type { FC } from "react";
import { useState } from "react";
import clsx from "clsx";

import type { Language } from "../Navbar.interface";
import styles from "../NavBar.module.scss";

interface NavBarLanguageSelectorProps {
  languages: Language[];
  selectedLanguage: Language;
  onLanguageSelect?: (language: Language) => void; // eslint-disable-line no-unused-vars
  onToggle?: () => void;
}

export const NavBarLanguageSelector: FC<NavBarLanguageSelectorProps> = ({
  languages,
  selectedLanguage,
  onLanguageSelect,
  onToggle,
}) => {
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const toggleLanguageDropdown = () => {
    if (onToggle) {
      onToggle();
    } else {
      setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
    }
  };

  return (
    <div className={styles["language-selector"]}>
      <button
        type="button"
        className={styles["language-button"]}
        onClick={toggleLanguageDropdown}
      >
        <span className={styles["language-icon"]}>
          <RiGlobalLine />
        </span>
        <span className={styles["language-text"]}>Language</span>
      </button>

      {isLanguageDropdownOpen && (
        <div className={styles["language-dropdown"]}>
          <div className={styles["language-dropdown-header"]}>
            Select language
          </div>
          {languages.map((language) => (
            <button
              key={language.id}
              type="button"
              className={clsx(
                styles["language-option"],
                selectedLanguage.id === language.id &&
                  styles["language-option--selected"],
              )}
              onClick={() => {
                onLanguageSelect?.(language);
                setIsLanguageDropdownOpen(false);
              }}
            >
              <span className={styles["language-flag"]}>
                <img
                  src={`/flags/${language.id === "en" ? "gb" : language.id}.svg`}
                  alt={`${language.label} flag`}
                  className={styles["flag-icon"]}
                />
              </span>
              {language.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
