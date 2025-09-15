import type { FC } from "react";
import clsx from "clsx";
import type { Language } from "../Navbar.interface";
import styles from "../NavBar.module.scss";

interface MobileLanguageSelectorProps {
  isOpen: boolean;
  languages: Language[];
  selectedLanguage: Language;
  onLanguageSelect?: (language: Language) => void;
}

export const MobileLanguageSelector: FC<MobileLanguageSelectorProps> = ({
  isOpen,
  languages,
  selectedLanguage,
  onLanguageSelect,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles["mobile-language-overlay"]}>
      <div className={styles["mobile-language-selector"]}>
        <div className={styles["mobile-language-header"]}>Select language</div>
        {languages.map((language) => (
          <button
            key={language.id}
            type="button"
            className={clsx(
              styles["mobile-language-option"],
              selectedLanguage.id === language.id &&
                styles["mobile-language-option--selected"],
            )}
            onClick={() => onLanguageSelect?.(language)}
          >
            <span className={styles["mobile-language-flag"]}>
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
    </div>
  );
};
