"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import LanguageToggle from "./LanguageToggle";

export default function Navbar() {
  const { t, isRTL } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/dashboard/beneficiary", label: t("dashboard") },
    { href: "/profile", label: t("profile") },
    { href: "/pairing", label: t("pairing") },
    { href: "/courses", label: t("courses") },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">
                {isRTL ? "أ" : "A"}
              </span>
            </div>
            <span className="font-bold text-primary text-lg tracking-tight">
              {t("appName")}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <Link
              href="/login"
              className="hidden md:inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-blue-700 border border-blue-200 hover:bg-blue-50 transition-colors"
            >
              {t("login")}
            </Link>
            <Link
              href="/register"
              className="hidden md:inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-white gradient-primary hover:opacity-90 transition-opacity shadow-md"
            >
              {t("register")}
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-blue-50"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-blue-100"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-slate-700 hover:text-blue-700 font-medium py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-3 pt-2 border-t border-blue-100">
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center py-2 rounded-lg text-sm font-medium text-blue-700 border border-blue-200 hover:bg-blue-50"
                >
                  {t("login")}
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center py-2 rounded-lg text-sm font-semibold text-white gradient-primary"
                >
                  {t("register")}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
