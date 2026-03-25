"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function LanguageToggle() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 font-semibold text-sm hover:bg-blue-100 transition-colors"
      aria-label="Toggle language"
    >
      <span className="text-base">{language === "ar" ? "🇸🇦" : "🇺🇸"}</span>
      <span>{t("language")}</span>
    </motion.button>
  );
}
