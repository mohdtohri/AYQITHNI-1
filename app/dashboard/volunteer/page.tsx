"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import AlertCard from "@/components/AlertCard";

const mockAlerts = [
  { name: "Ahmad Al-Rashid", condition: "Epilepsy - Seizure", distance: 150, time: "2m ago", severity: "high" as const },
  { name: "Fatima Al-Dosari", condition: "Fainting Episode", distance: 380, time: "8m ago", severity: "medium" as const },
  { name: "Khalid Al-Mutairi", condition: "Low Blood Sugar", distance: 620, time: "15m ago", severity: "low" as const },
];

export default function VolunteerDashboard() {
  const { t, isRTL } = useLanguage();
  const [status, setStatus] = useState<"available" | "busy">("available");
  const [alerts, setAlerts] = useState(mockAlerts);
  const [activeTab, setActiveTab] = useState<"alerts" | "stats" | "training">("alerts");

  const volunteerName = isRTL ? "سارة الحربي" : "Sara Al-Harbi";

  const handleRespond = (index: number) => {
    const newAlerts = [...alerts];
    newAlerts.splice(index, 1);
    setAlerts(newAlerts);
  };

  const handleIgnore = (index: number) => {
    const newAlerts = [...alerts];
    newAlerts.splice(index, 1);
    setAlerts(newAlerts);
  };

  const certifications = [
    { name: "CPR Certified", icon: "❤️‍🔥", date: "2024-01", valid: true },
    { name: "First Aid Level 2", icon: "🏥", date: "2023-09", valid: true },
    { name: "Seizure Response", icon: "🧠", date: "2024-03", valid: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50/30">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 pt-20 pb-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-6 text-white mb-6 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0f766e 0%, #06b6d4 100%)" }}
        >
          <div className="absolute top-0 end-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-teal-100 text-sm">{t("welcomeBack")}</p>
                <h1 className="text-2xl font-black">{volunteerName}</h1>
              </div>
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
                🦺
              </div>
            </div>
            {/* Status Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setStatus(s => s === "available" ? "busy" : "available")}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
                  status === "available"
                    ? "bg-emerald-400/30 text-emerald-100 border border-emerald-400/50"
                    : "bg-amber-400/30 text-amber-100 border border-amber-400/50"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${status === "available" ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
                {status === "available" ? t("available") : t("busy")}
              </button>
              <span className="text-teal-100 text-sm">
                {isRTL ? "وقت الاستجابة: 4 دقائق" : "Response time: 4 min"}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { icon: "🚑", value: alerts.length, label: t("activeCases"), color: "text-red-600" },
            { icon: "✅", value: "23", label: t("casesHandled"), color: "text-emerald-600" },
            { icon: "🎓", value: "2", label: t("certifications"), color: "text-blue-600" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-4 card-shadow text-center border border-blue-50"
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className={`text-xl font-black ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Tab Bar */}
        <div className="bg-white rounded-2xl p-1 flex gap-1 mb-6 card-shadow">
          {(["alerts", "stats", "training"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                activeTab === tab
                  ? "text-white shadow-sm"
                  : "text-slate-500 hover:text-teal-600"
              }`}
              style={
                activeTab === tab
                  ? { background: "linear-gradient(135deg, #0f766e, #06b6d4)" }
                  : {}
              }
            >
              {tab === "alerts" && `🚨 ${t("activeCases")}`}
              {tab === "stats" && `📊 ${isRTL ? "الإحصائيات" : "Stats"}`}
              {tab === "training" && `🎓 ${t("trainingStatus")}`}
            </button>
          ))}
        </div>

        {/* Alerts Tab */}
        {activeTab === "alerts" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <AnimatePresence>
              {alerts.length > 0 ? (
                alerts.map((alert, i) => (
                  <AlertCard
                    key={`${alert.name}-${i}`}
                    {...alert}
                    index={i}
                    onRespond={() => handleRespond(i)}
                    onIgnore={() => handleIgnore(i)}
                  />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-2xl p-10 text-center card-shadow"
                >
                  <div className="text-5xl mb-3">✨</div>
                  <p className="text-slate-500 font-medium">
                    {isRTL ? "لا توجد تنبيهات نشطة حالياً" : "No active alerts right now"}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Stats Tab */}
        {activeTab === "stats" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="bg-white rounded-2xl p-5 card-shadow border border-blue-50">
              <h3 className="font-bold text-slate-800 mb-4">
                {isRTL ? "أداء هذا الشهر" : "This Month's Performance"}
              </h3>
              {[
                { label: isRTL ? "معدل الاستجابة" : "Response Rate", value: 94, color: "bg-emerald-500" },
                { label: isRTL ? "التقييم العام" : "Overall Rating", value: 97, color: "bg-blue-500" },
                { label: isRTL ? "نسبة الإتمام" : "Completion Rate", value: 89, color: "bg-cyan-500" },
              ].map((item, i) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-slate-600 font-medium">{item.label}</span>
                    <span className="font-bold text-slate-800">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                      className={`h-full rounded-full ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: isRTL ? "هذا الأسبوع" : "This Week", value: "7", sub: isRTL ? "حالات" : "cases" },
                { label: isRTL ? "هذا الشهر" : "This Month", value: "23", sub: isRTL ? "حالات" : "cases" },
                { label: isRTL ? "متوسط التقييم" : "Avg Rating", value: "4.9", sub: "⭐" },
                { label: isRTL ? "وقت الاستجابة" : "Response Time", value: "4", sub: t("minutes") },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 card-shadow border border-blue-50 text-center">
                  <div className="text-2xl font-black text-blue-700">{item.value}</div>
                  <div className="text-xs text-slate-500">{item.sub}</div>
                  <div className="text-xs font-medium text-slate-600 mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Training Tab */}
        {activeTab === "training" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <h3 className="font-bold text-slate-800">{t("certifications")}</h3>
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-4 card-shadow border border-blue-50 flex items-center gap-4"
              >
                <div className="text-3xl">{cert.icon}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800 text-sm">{cert.name}</h4>
                  <p className="text-xs text-slate-500">
                    {isRTL ? "تاريخ الإصدار:" : "Issued:"} {cert.date}
                  </p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  cert.valid ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                }`}>
                  {cert.valid ? (isRTL ? "سارية" : "Valid") : (isRTL ? "تنتهي قريباً" : "Expiring")}
                </span>
              </motion.div>
            ))}
            <Link
              href="/courses"
              className="block w-full py-3.5 rounded-2xl text-center font-bold text-white gradient-primary mt-2 shadow-lg shadow-blue-500/20"
            >
              {isRTL ? "استعرض الدورات التدريبية" : "Browse Training Courses"}
            </Link>
          </motion.div>
        )}
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 glass border-t border-blue-100 px-4 py-3">
        <div className="max-w-2xl mx-auto flex justify-around">
          {[
            { href: "/dashboard/volunteer", icon: "🏠", label: t("dashboard") },
            { href: "/pairing", icon: "🔗", label: t("pairing") },
            { href: "/courses", icon: "📚", label: t("courses") },
            { href: "/profile", icon: "👤", label: t("profile") },
          ].map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="flex flex-col items-center gap-1 text-slate-500 hover:text-teal-700 transition-colors"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
