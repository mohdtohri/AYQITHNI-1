"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import CourseCard from "@/components/CourseCard";

type CourseStatus = "not_started" | "enrolled" | "completed";

const coursesData = [
  {
    titleKey: "course1Title" as const,
    descKey: "course1Desc" as const,
    duration: "3h",
    lessonsCount: 12,
    status: "completed" as CourseStatus,
    icon: "❤️‍🔥",
  },
  {
    titleKey: "course2Title" as const,
    descKey: "course2Desc" as const,
    duration: "2h",
    lessonsCount: 8,
    status: "enrolled" as CourseStatus,
    icon: "🧠",
  },
  {
    titleKey: "course3Title" as const,
    descKey: "course3Desc" as const,
    duration: "1.5h",
    lessonsCount: 6,
    status: "not_started" as CourseStatus,
    icon: "😵",
  },
  {
    titleKey: "course4Title" as const,
    descKey: "course4Desc" as const,
    duration: "4h",
    lessonsCount: 16,
    status: "not_started" as CourseStatus,
    icon: "🏥",
  },
  {
    titleKey: "course5Title" as const,
    descKey: "course5Desc" as const,
    duration: "2.5h",
    lessonsCount: 10,
    status: "not_started" as CourseStatus,
    icon: "💉",
  },
  {
    titleKey: "course6Title" as const,
    descKey: "course6Desc" as const,
    duration: "2h",
    lessonsCount: 9,
    status: "not_started" as CourseStatus,
    icon: "❤️",
  },
];

export default function CoursesPage() {
  const { t, isRTL } = useLanguage();
  const [filter, setFilter] = useState<"all" | "enrolled" | "completed" | "not_started">("all");

  const filtered = filter === "all" ? coursesData : coursesData.filter((c) => c.status === filter);

  const completedCount = coursesData.filter((c) => c.status === "completed").length;
  const enrolledCount = coursesData.filter((c) => c.status === "enrolled").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 pt-20 pb-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="gradient-primary rounded-3xl p-6 text-white mb-6 relative overflow-hidden"
        >
          <div className="absolute top-0 end-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <h1 className="text-2xl font-black mb-1">{t("coursesTitle")}</h1>
            <p className="text-blue-100 text-sm">{t("coursesSubtitle")}</p>

            {/* Progress */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { value: coursesData.length, label: isRTL ? "إجمالي" : "Total" },
                { value: enrolledCount, label: isRTL ? "مسجل" : "Enrolled" },
                { value: completedCount, label: isRTL ? "مكتمل" : "Done" },
              ].map((stat, i) => (
                <div key={i} className="bg-white/20 rounded-xl p-2.5 text-center">
                  <div className="text-xl font-black">{stat.value}</div>
                  <div className="text-xs text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Overall Progress Bar */}
        <div className="bg-white rounded-2xl p-4 card-shadow border border-blue-50 mb-5">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-semibold text-slate-700">
              {isRTL ? "التقدم الإجمالي" : "Overall Progress"}
            </span>
            <span className="font-bold text-blue-700">
              {Math.round((completedCount / coursesData.length) * 100)}%
            </span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(completedCount / coursesData.length) * 100}%` }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
            />
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>{completedCount} {isRTL ? "مكتملة" : "completed"}</span>
            <span>{coursesData.length} {isRTL ? "إجمالي" : "total"}</span>
          </div>
        </div>

        {/* Badges */}
        {completedCount > 0 && (
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-4 mb-5">
            <h3 className="font-bold text-amber-800 mb-3 text-sm">
              🏅 {isRTL ? "شهاداتي" : "My Badges"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {coursesData
                .filter((c) => c.status === "completed")
                .map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1, type: "spring" }}
                    className="flex items-center gap-1.5 bg-white rounded-xl px-3 py-1.5 shadow-sm border border-amber-100"
                  >
                    <span>{c.icon}</span>
                    <span className="text-xs font-bold text-amber-800">
                      {t(c.titleKey)}
                    </span>
                    <span className="text-amber-500">🏅</span>
                  </motion.div>
                ))}
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-hide">
          {(["all", "enrolled", "completed", "not_started"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                filter === f
                  ? "gradient-primary text-white shadow-md"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300"
              }`}
            >
              {f === "all" && (isRTL ? "الكل" : "All")}
              {f === "enrolled" && `📖 ${t("enrolled")}`}
              {f === "completed" && `✅ ${t("completed")}`}
              {f === "not_started" && `🔒 ${t("notStarted")}`}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((course, i) => (
            <CourseCard
              key={course.titleKey}
              titleKey={t(course.titleKey)}
              descKey={t(course.descKey)}
              duration={course.duration}
              lessonsCount={course.lessonsCount}
              status={course.status}
              icon={course.icon}
              index={i}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl p-10 text-center card-shadow">
            <div className="text-5xl mb-3">📚</div>
            <p className="text-slate-500 font-medium">
              {isRTL ? "لا توجد دورات في هذا التصنيف" : "No courses in this category"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
