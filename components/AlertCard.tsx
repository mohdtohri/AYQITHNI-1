"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface AlertCardProps {
  name: string;
  condition: string;
  distance: number;
  time: string;
  severity: "low" | "medium" | "high";
  index: number;
  onRespond?: () => void;
  onIgnore?: () => void;
}

export default function AlertCard({
  name,
  condition,
  distance,
  time,
  severity,
  index,
  onRespond,
  onIgnore,
}: AlertCardProps) {
  const { t } = useLanguage();

  const severityConfig = {
    low: {
      color: "border-l-amber-400 bg-amber-50",
      badge: "bg-amber-100 text-amber-700",
      label: "⚠️",
    },
    medium: {
      color: "border-l-orange-500 bg-orange-50",
      badge: "bg-orange-100 text-orange-700",
      label: "🔶",
    },
    high: {
      color: "border-l-red-600 bg-red-50",
      badge: "bg-red-100 text-red-700",
      label: "🚨",
    },
  };

  const config = severityConfig[severity];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`rounded-2xl p-4 border-s-4 card-shadow ${config.color}`}
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl">{config.label}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-bold text-slate-800 text-sm">{name}</h4>
            <span className="text-xs text-slate-400">{time}</span>
          </div>
          <p className="text-xs text-slate-600 mb-2">{condition}</p>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span>📍 {distance} {t("meters")}</span>
            <span className={`px-2 py-0.5 rounded-full font-semibold ${config.badge}`}>
              {t("newAlert")}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <button
          onClick={onRespond}
          className="flex-1 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-bold hover:opacity-90 transition-opacity shadow-sm"
        >
          {t("respond")}
        </button>
        <button
          onClick={onIgnore}
          className="flex-1 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors"
        >
          {t("ignore")}
        </button>
      </div>
    </motion.div>
  );
}
