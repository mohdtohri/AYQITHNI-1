"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function EmergencyButton() {
  const { t } = useLanguage();
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [showConfirm, setShowConfirm] = useState(false);

  const handlePress = () => {
    if (state === "idle") {
      setShowConfirm(true);
    }
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    setState("sending");
    setTimeout(() => setState("sent"), 2500);
    setTimeout(() => setState("idle"), 7000);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <div className="relative flex flex-col items-center gap-4">
        {/* Pulse rings */}
        {state === "sending" && (
          <>
            <span className="absolute w-40 h-40 rounded-full bg-red-400/30 animate-ping" />
            <span className="absolute w-32 h-32 rounded-full bg-red-400/20 animate-ping delay-150" />
          </>
        )}
        {state === "sent" && (
          <>
            <span className="absolute w-40 h-40 rounded-full bg-green-400/30 animate-ping" />
          </>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePress}
          disabled={state !== "idle"}
          className={`relative z-10 w-32 h-32 rounded-full font-black text-white text-2xl shadow-2xl transition-all duration-300 flex flex-col items-center justify-center gap-1
            ${
              state === "idle"
                ? "bg-gradient-to-br from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 cursor-pointer pulse-ring"
                : state === "sending"
                ? "bg-gradient-to-br from-orange-500 to-red-600 cursor-not-allowed"
                : "bg-gradient-to-br from-green-500 to-emerald-600 cursor-not-allowed"
            }`}
          style={{
            boxShadow:
              state === "idle"
                ? "0 0 0 0 rgba(239,68,68,0.7), 0 10px 40px rgba(239,68,68,0.4)"
                : state === "sent"
                ? "0 10px 40px rgba(34,197,94,0.4)"
                : "0 10px 40px rgba(249,115,22,0.4)",
          }}
        >
          {state === "idle" && (
            <>
              <span className="text-3xl">🆘</span>
              <span>{t("sosButton")}</span>
            </>
          )}
          {state === "sending" && (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-3 border-white border-t-transparent rounded-full border-4"
              />
              <span className="text-xs mt-1">{t("sendingAlert")}</span>
            </>
          )}
          {state === "sent" && (
            <>
              <span className="text-3xl">✅</span>
              <span className="text-sm">{t("alertSent")}</span>
            </>
          )}
        </motion.button>

        <p className="text-sm text-slate-500 font-medium">
          {state === "idle" && t("holdForSOS")}
          {state === "sending" && t("sendingAlert")}
          {state === "sent" && t("helpOnTheWay")}
        </p>
      </div>

      {/* Confirm Modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={handleCancel}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            >
              <div className="text-center mb-4">
                <span className="text-5xl">🚨</span>
                <h3 className="text-xl font-bold text-slate-800 mt-3">
                  {t("emergencyAlert")}
                </h3>
                <p className="text-slate-500 text-sm mt-2">
                  {t("locationShared")}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
                >
                  {t("cancel")}
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
                >
                  {t("confirm")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
