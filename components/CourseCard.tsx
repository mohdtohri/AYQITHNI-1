"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface CourseCardProps {
  titleKey: string;
  descKey: string;
  duration: string;
  lessonsCount: number;
  status: "not_started" | "enrolled" | "completed";
  icon: string;
  index: number;
}

export default function CourseCard({
  titleKey,
  descKey,
  duration,
  lessonsCount,
  status,
  icon,
  index,
}: CourseCardProps) {
  const { t } = useLanguage();

  const statusConfig = {
    not_started: {
      label: t("notStarted"),
      btnLabel: t("startCourse"),
      color: "bg-slate-100 text-slate-600",
      btnColor:
        "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:opacity-90",
    },
    enrolled: {
      label: t("enrolled"),
      btnLabel: t("continueCourse"),
      color: "bg-blue-100 text-blue-700",
      btnColor:
        "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:opacity-90",
    },
    completed: {
      label: t("completed"),
      btnLabel: t("viewCertificate"),
      color: "bg-emerald-100 text-emerald-700",
      btnColor:
        "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:opacity-90",
    },
  };

  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(30,64,175,0.15)" }}
      className="bg-white rounded-2xl p-5 card-shadow border border-blue-50 flex flex-col gap-4 cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-2xl flex-shrink-0 shadow-md">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-slate-800 text-sm leading-tight">
              {titleKey}
            </h3>
            {status === "completed" && (
              <span className="text-lg" title="Certified">
                🏅
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">{descKey}</p>
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          ⏱️ {duration} {t("duration")}
        </span>
        <span className="flex items-center gap-1">
          📚 {lessonsCount} {t("lessons")}
        </span>
        {status === "completed" && (
          <span className="flex items-center gap-1">🎓 {t("certificate")}</span>
        )}
      </div>

      {/* Progress bar (enrolled) */}
      {status === "enrolled" && (
        <div className="h-1.5 bg-blue-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "45%" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
          />
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${config.color}`}>
          {config.label}
        </span>
        <button
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 shadow-sm ${config.btnColor}`}
        >
          {config.btnLabel}
        </button>
      </div>
    </motion.div>
  );
}
