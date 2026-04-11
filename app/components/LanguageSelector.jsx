"use client";

import { useState, useEffect, useRef } from "react";
import { TbWorld as Globe } from "react-icons/tb";
import { IoChevronDownOutline as ChevronDown } from "react-icons/io5";
import { MdCheck as CheckIcon } from "react-icons/md";
import styles from "@/app/styles/languageSelector.module.css";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "ar", label: "العربية" },
  { code: "zh-CN", label: "中文 (简体)" },
  { code: "zh-TW", label: "中文 (繁體)" },
  { code: "pt", label: "Português" },
  { code: "ru", label: "Русский" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
  { code: "vi", label: "Tiếng Việt" },
  { code: "tl", label: "Filipino" },
  { code: "hi", label: "हिन्दी" },
  { code: "pl", label: "Polski" },
  { code: "nl", label: "Nederlands" },
  { code: "tr", label: "Türkçe" },
  { code: "sw", label: "Kiswahili" },
  { code: "uk", label: "Українська" },
];

function setGoogTransCookie(langCode) {
  const value = langCode === "en" ? "/en/en" : `/en/${langCode}`;
  document.cookie = `googtrans=${value};path=/`;
  document.cookie = `googtrans=${value};path=/;domain=${window.location.hostname}`;
}

function getGoogTransCookie() {
  const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
  if (!match) return null;
  const parts = match[1].split("/");
  return parts[2] || null;
}

function switchLanguage(langCode) {
  setGoogTransCookie(langCode);
  const select = document.querySelector(".goog-te-combo");
  if (!select) return false;
  select.value = langCode;
  select.dispatchEvent(new Event("change", { bubbles: true }));
  return true;
}

export default function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(LANGUAGES[0]);
  const wrapRef = useRef(null);

  useEffect(() => {
    const saved = getGoogTransCookie();
    if (saved && saved !== "en") {
      const match = LANGUAGES.find((l) => l.code === saved);
      if (match) setSelected(match);
    }
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleSelect = (lang) => {
    setSelected(lang);
    setOpen(false);

    if (!switchLanguage(lang.code)) {
      let tries = 0;
      const id = setInterval(() => {
        if (switchLanguage(lang.code) || ++tries > 20) clearInterval(id);
      }, 300);
    }
  };

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <button
        className={styles.trigger}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        type="button"
      >
        <Globe className={styles.globe} />
        <span className={styles.label}>{selected.label}</span>
        <ChevronDown className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`} />
      </button>

      {open && (
        <div className={styles.dropdown} role="listbox">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              role="option"
              aria-selected={selected.code === lang.code}
              className={`${styles.option} ${selected.code === lang.code ? styles.optionActive : ""}`}
              onClick={() => handleSelect(lang)}
              type="button"
            >
              <span>{lang.label}</span>
              {selected.code === lang.code && <CheckIcon className={styles.checkIcon} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
