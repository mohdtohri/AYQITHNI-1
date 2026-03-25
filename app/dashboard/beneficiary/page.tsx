"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import EmergencyButton from "@/components/EmergencyButton";
import SensorDisplay from "@/components/SensorDisplay";

const mockVolunteers = [
  { name: "Ahmed Hassan", distance: 120, status: "available", rating: 4.9, cert: "CPR" },
  { name: "Sara Al-Qahtani", distance: 340, status: "available", rating: 4.7, cert: "FA" },
  { name: "Mohammed Al-Otaibi", distance: 520, status: "busy", rating: 4.8, cert: "CPR" },
];

export default function BeneficiaryDashboard() {
  const { t, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState<"overview" | "volunteers" | "sensors">("overview");

  const userName = isRTL ? "محمد العلي" : "Mohammed Al-Ali";

  const quickLinks = [
    { href: "/profile", icon: "🏥", label: t("myProfile"), color: "from-blue-500 to-blue-700" },
    { href: "/pairing", icon: "🔗", label: t("myPairing"), color: "from-cyan-500 to-teal-600" },
    { href: "/courses", icon: "📚", label: t("myCourses"), color: "from-indigo-500 to-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 pt-20 pb-24">

        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="gradient-primary rounded-3xl p-6 text-white mb-6 relative overflow-hidden"
        >
          <div className="absolute top-0 end-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 start-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-blue-100 text-sm">{t("welcomeBack")}</p>
                <h1 className="text-2xl font-black">{userName}</h1>
              </div>
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
                👤
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-blue-100 text-sm font-medium">{t("active")}</span>
              <span className="text-blue-200">•</span>
              <span className="text-blue-100 text-sm">
                {isRTL ? "آخر تسجيل دخول: اليوم" : "Last login: Today"}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Tab Bar */}
        <div className="bg-white rounded-2xl p-1 flex gap-1 mb-6 card-shadow">
          {(["overview", "volunteers", "sensors"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                activeTab === tab
                  ? "gradient-primary text-white shadow-sm"
                  : "text-slate-500 hover:text-blue-600"
              }`}
            >
              {tab === "overview" && (isRTL ? "نظرة عامة" : "Overview")}
              {tab === "volunteers" && t("nearbyVolunteers")}
              {tab === "sensors" && (isRTL ? "أجهزة الاستشعار" : "Sensors")}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Emergency Button */}
            <div className="bg-white rounded-3xl p-8 card-shadow border border-red-50 flex flex-col items-center">
              <h2 className="text-lg font-black text-slate-800 mb-2">
                {t("emergency")}
              </h2>
              <p className="text-slate-500 text-sm mb-6 text-center">
                {t("pressForHelp")}
              </p>
              <EmergencyButton />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: "🦺", value: "3", label: isRTL ? "متطوعون قريبون" : "Nearby", color: "text-blue-600" },
                { icon: "💓", value: "72", label: t("bpm"), color: "text-emerald-600" },
                { icon: "🔗", value: "2", label: isRTL ? "مقترنون" : "Paired", color: "text-cyan-600" },
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

            {/* Quick Links */}
            <div className="grid grid-cols-3 gap-3">
              {quickLinks.map((link, i) => (
                <Link key={i} href={link.href}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    className={`bg-gradient-to-br ${link.color} rounded-2xl p-4 text-white text-center card-shadow`}
                  >
                    <div className="text-2xl mb-2">{link.icon}</div>
                    <div className="text-xs font-bold leading-tight">{link.label}</div>
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Activity */}
            <div className="bg-white rounded-2xl p-5 card-shadow border border-blue-50">
              <h3 className="font-bold text-slate-800 mb-4">
                {isRTL ? "آخر الأنشطة" : "Recent Activity"}
              </h3>
              <div className="space-y-3">
                {[
                  { icon: "✅", text: isRTL ? "تم إغلاق تنبيه الطوارئ" : "Emergency alert closed", time: isRTL ? "منذ ساعتين" : "2h ago", color: "text-emerald-600" },
                  { icon: "🔗", text: isRTL ? "تم إقران مستخدم جديد" : "New pairing established", time: isRTL ? "أمس" : "Yesterday", color: "text-blue-600" },
                  { icon: "📚", text: isRTL ? "أكملت دورة CPR" : "Completed CPR course", time: isRTL ? "3 أيام" : "3 days ago", color: "text-purple-600" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`text-xl ${item.color}`}>{item.icon}</div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-700 font-medium">{item.text}</p>
                    </div>
                    <span className="text-xs text-slate-400">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Volunteers Tab */}
        {activeTab === "volunteers" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <h2 className="font-bold text-slate-800">{t("nearbyVolunteers")}</h2>
            {mockVolunteers.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-4 card-shadow border border-blue-50 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center text-xl text-white font-bold flex-shrink-0">
                  {v.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="font-bold text-slate-800 text-sm">{v.name}</h4>
                    <span className={`w-2 h-2 rounded-full ${v.status === "available" ? "bg-emerald-500" : "bg-amber-400"}`} />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>📍 {v.distance} {t("meters")}</span>
                    <span>⭐ {v.rating}</span>
                    <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-semibold">{v.cert}</span>
                  </div>
                </div>
                <div className="text-xs text-slate-400 font-medium">
                  {v.status === "available" ? t("available") : t("busy")}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Sensors Tab */}
        {activeTab === "sensors" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="font-bold text-slate-800 mb-4">
              {isRTL ? "بيانات أجهزة الاستشعار" : "Sensor Data"}
            </h2>
            <SensorDisplay />
          </motion.div>
        )}
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 glass border-t border-blue-100 px-4 py-3">
        <div className="max-w-2xl mx-auto flex justify-around">
          {[
            { href: "/dashboard/beneficiary", icon: "🏠", label: t("dashboard") },
            { href: "/profile", icon: "👤", label: t("profile") },
            { href: "/pairing", icon: "🔗", label: t("pairing") },
            { href: "/courses", icon: "📚", label: t("courses") },
          ].map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="flex flex-col items-center gap-1 text-slate-500 hover:text-blue-700 transition-colors"
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
