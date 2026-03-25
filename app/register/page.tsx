"use client";

import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";

function RegisterForm() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const defaultType =
    (searchParams.get("type") as "beneficiary" | "volunteer") || "beneficiary";

  const [userType, setUserType] = useState<"beneficiary" | "volunteer">(
    defaultType
  );
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
    }, 1800);
  };

  const steps = ["📋", "👤", "🔐"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-4 pt-24 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg"
        >
          <div className="bg-white rounded-3xl shadow-2xl border border-blue-50 overflow-hidden">
            {/* Header */}
            <div className="gradient-primary px-8 pt-8 pb-10 text-white text-center">
              <div className="flex justify-center gap-4 mb-5">
                {steps.map((s, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-lg"
                  >
                    {s}
                  </div>
                ))}
              </div>
              <h1 className="text-2xl font-black">{t("register")}</h1>
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
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    {t("fullName")}
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 text-sm"
                    placeholder={t("fullName")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    {t("email")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    dir="ltr"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 text-sm"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    {t("phone")}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    dir="ltr"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 text-sm"
                    placeholder="+966 5X XXX XXXX"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      {t("password")}
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      {t("confirmPassword")}
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

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
                    t("registerBtn")
                  )}
                </motion.button>
              </form>

              <p className="text-center text-sm text-slate-500 mt-5">
                {t("alreadyHaveAccount")}{" "}
                <Link
                  href="/login"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  {t("loginHere")}
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-blue-50" />}>
      <RegisterForm />
    </Suspense>
  );
}
