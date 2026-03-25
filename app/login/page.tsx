"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  const { t, isRTL } = useLanguage();
  const [userType, setUserType] = useState<"beneficiary" | "volunteer">(
    "beneficiary"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        if (userType === "beneficiary") {
          window.location.href = "/dashboard/beneficiary";
        } else {
          window.location.href = "/dashboard/volunteer";
        }
      }, 1000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Card */}
          <div className="bg-white rounded-3xl shadow-2xl border border-blue-50 overflow-hidden">
            {/* Header */}
            <div className="gradient-primary px-8 pt-8 pb-10 text-white text-center">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl"
              >
                🔐
              </motion.div>
              <h1 className="text-2xl font-black">{t("login")}</h1>
              <p className="text-blue-100 text-sm mt-1">{t("appName")}</p>
            </div>

            <div className="px-8 py-6 -mt-4">
              {/* User Type Toggle */}
              <div className="bg-slate-100 rounded-2xl p-1 flex mb-6">
                <button
                  onClick={() => setUserType("beneficiary")}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                    userType === "beneficiary"
                      ? "bg-white shadow-sm text-blue-700"
                      : "text-slate-500"
                  }`}
                >
                  🏥 {t("beneficiary")}
                </button>
                <button
                  onClick={() => setUserType("volunteer")}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                    userType === "volunteer"
                      ? "bg-white shadow-sm text-blue-700"
                      : "text-slate-500"
                  }`}
                >
                  🦺 {t("volunteer")}
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    {t("email")}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    dir="ltr"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 text-sm transition-all"
                    placeholder="example@email.com"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    {t("password")}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 text-sm transition-all"
                    placeholder="••••••••"
                  />
                  <div className="text-end mt-1">
                    <Link
                      href="#"
                      className="text-xs text-blue-600 hover:underline"
                    >
                      {t("forgotPassword")}
                    </Link>
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading || success}
                  className="w-full py-3.5 rounded-xl text-white font-bold text-base gradient-primary hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      {t("loading")}
                    </>
                  ) : success ? (
                    <>✅ {t("success")}</>
                  ) : (
                    t("loginBtn")
                  )}
                </motion.button>
              </form>

              {/* Register Link */}
              <p className="text-center text-sm text-slate-500 mt-5">
                {t("noAccount")}{" "}
                <Link
                  href="/register"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  {t("registerHere")}
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
