"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";

const mockPaired = [
  {
    id: 1,
    name: "Khalid Al-Rashid",
    role: "volunteer",
    status: "online",
    distance: 200,
    avatar: "K",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: 2,
    name: "Noura Hassan",
    role: "family",
    status: "offline",
    distance: null,
    avatar: "N",
    color: "from-purple-500 to-indigo-600",
  },
];

const mockPending = [
  {
    id: 3,
    name: "Ahmed Al-Qahtani",
    role: "volunteer",
    code: "AHQ-2024",
  },
];

export default function PairingPage() {
  const { t, isRTL } = useLanguage();
  const [paired, setPaired] = useState(mockPaired);
  const [pending, setPending] = useState(mockPending);
  const [code, setCode] = useState("");
  const [myCode] = useState("MHA-7391");
  const [codeCopied, setCodeCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"paired" | "pending" | "add">("paired");

  const handleAccept = (id: number) => {
    const req = pending.find((p) => p.id === id);
    if (req) {
      setPaired((prev) => [
        ...prev,
        {
          id: req.id,
          name: req.name,
          role: req.role,
          status: "online",
          distance: 300,
          avatar: req.name[0],
          color: "from-blue-500 to-blue-700",
        },
      ]);
      setPending((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleReject = (id: number) => {
    setPending((prev) => prev.filter((p) => p.id !== id));
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(myCode).then(() => {
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    }).catch(() => {
      // Fallback: select the code text for manual copy
      const el = document.createElement("textarea");
      el.value = myCode;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    });
  };

  const handleAddPairing = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      setCode("");
      setActiveTab("pending");
    }
  };

  const roleLabel = (role: string) => {
    if (role === "volunteer") return isRTL ? "متطوع" : "Volunteer";
    if (role === "family") return isRTL ? "عائلة" : "Family";
    return role;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 pt-20 pb-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="gradient-primary rounded-3xl p-6 text-white mb-6"
        >
          <h1 className="text-2xl font-black mb-1">{t("pairingTitle")}</h1>
          <p className="text-blue-100 text-sm">
            {isRTL
              ? "ربط حسابك مع متطوعين وأشخاص موثوقين"
              : "Connect your account with volunteers and trusted persons"}
          </p>

          {/* My Code */}
          <div className="mt-4 bg-white/20 rounded-2xl p-4">
            <p className="text-blue-100 text-xs mb-2 font-medium">{t("myCode")}</p>
            <div className="flex items-center gap-3">
              <code className="text-2xl font-black tracking-widest">{myCode}</code>
              <button
                onClick={handleCopyCode}
                className={`px-4 py-1.5 rounded-xl text-sm font-bold transition-all ${
                  codeCopied
                    ? "bg-emerald-400/30 text-emerald-100"
                    : "bg-white/20 hover:bg-white/30"
                }`}
              >
                {codeCopied ? "✅" : `📋 ${t("shareCode")}`}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tab Bar */}
        <div className="bg-white rounded-2xl p-1 flex gap-1 mb-6 card-shadow">
          {(["paired", "pending", "add"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 relative ${
                activeTab === tab
                  ? "gradient-primary text-white shadow-sm"
                  : "text-slate-500 hover:text-blue-600"
              }`}
            >
              {tab === "paired" && `🔗 ${t("pairedWith")} (${paired.length})`}
              {tab === "pending" && (
                <>
                  ⏳ {t("pendingRequests")}
                  {pending.length > 0 && (
                    <span className="absolute -top-1 -end-1 w-4 h-4 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center font-black">
                      {pending.length}
                    </span>
                  )}
                </>
              )}
              {tab === "add" && `➕ ${t("addPairing")}`}
            </button>
          ))}
        </div>

        {/* Paired Tab */}
        {activeTab === "paired" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            {paired.length > 0 ? (
              paired.map((person, i) => (
                <motion.div
                  key={person.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-4 card-shadow border border-blue-50 flex items-center gap-4"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${person.color} flex items-center justify-center text-white text-xl font-black flex-shrink-0 shadow-md`}
                  >
                    {person.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className="font-bold text-slate-800 text-sm truncate">{person.name}</h4>
                      <span
                        className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          person.status === "online" ? "bg-emerald-500 animate-pulse" : "bg-slate-300"
                        }`}
                      />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">
                        {roleLabel(person.role)}
                      </span>
                      {person.distance && (
                        <span>📍 {person.distance} {t("meters")}</span>
                      )}
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-red-500 text-xl transition-colors">
                    ×
                  </button>
                </motion.div>
              ))
            ) : (
              <div className="bg-white rounded-2xl p-10 text-center card-shadow">
                <div className="text-5xl mb-3">🔗</div>
                <p className="text-slate-500 font-medium">
                  {isRTL ? "لم تتم إضافة أي إقران بعد" : "No pairings added yet"}
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Pending Tab */}
        {activeTab === "pending" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            <AnimatePresence>
              {pending.length > 0 ? (
                pending.map((req, i) => (
                  <motion.div
                    key={req.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl p-4 card-shadow border border-amber-100"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                        {req.name[0]}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-800 text-sm">{req.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span>{roleLabel(req.role)}</span>
                          <span>•</span>
                          <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-600">
                            {req.code}
                          </code>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAccept(req.id)}
                        className="flex-1 py-2 rounded-xl gradient-primary text-white text-sm font-bold"
                      >
                        ✓ {t("acceptRequest")}
                      </button>
                      <button
                        onClick={() => handleReject(req.id)}
                        className="flex-1 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50"
                      >
                        ✗ {t("rejectRequest")}
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="bg-white rounded-2xl p-10 text-center card-shadow">
                  <div className="text-5xl mb-3">⏳</div>
                  <p className="text-slate-500 font-medium">
                    {isRTL ? "لا توجد طلبات معلقة" : "No pending requests"}
                  </p>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Add Tab */}
        {activeTab === "add" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="bg-white rounded-2xl p-5 card-shadow border border-blue-50">
              <h3 className="font-bold text-slate-800 mb-2">
                🔗 {t("addPairing")}
              </h3>
              <p className="text-slate-500 text-sm mb-5">
                {isRTL
                  ? "أدخل رمز الشخص الذي تريد إقرانه معك"
                  : "Enter the code of the person you want to pair with"}
              </p>
              <form onSubmit={handleAddPairing} className="flex gap-3">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder={t("pairingCode")}
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 text-sm font-mono tracking-widest uppercase"
                  maxLength={8}
                />
                <button
                  type="submit"
                  disabled={!code.trim()}
                  className="px-5 py-3 rounded-xl gradient-primary text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isRTL ? "إرسال" : "Send"}
                </button>
              </form>
            </div>

            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
              <h4 className="font-bold text-blue-800 mb-2 text-sm">
                💡 {isRTL ? "كيف يعمل؟" : "How does it work?"}
              </h4>
              <ul className="text-blue-700 text-xs space-y-1.5">
                {[
                  isRTL ? "شارك رمزك الخاص مع من تريد إقرانه" : "Share your code with whom you want to pair",
                  isRTL ? "اطلب منه إدخال رمزك في التطبيق" : "Ask them to enter your code in the app",
                  isRTL ? "قبل طلب الإقران ليكتمل الاتصال" : "Accept the pairing request to complete connection",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-black">{i + 1}.</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
