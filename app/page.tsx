"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.15 } },
};

export default function LandingPage() {
  const { t, isRTL } = useLanguage();

  const stats = [
    { value: "12,400+", label: t("activeUsers"), icon: "👥" },
    { value: "3,200+", label: t("trainedVolunteers"), icon: "🦺" },
    { value: "8,900+", label: t("emergenciesHandled"), icon: "🚑" },
    { value: "47", label: t("citiesCovered"), icon: "🏙️" },
  ];

  const features = [
    {
      icon: "💓",
      title: t("feature1Title"),
      desc: t("feature1Desc"),
      color: "from-red-500 to-rose-600",
    },
    {
      icon: "🔔",
      title: t("feature2Title"),
      desc: t("feature2Desc"),
      color: "from-amber-500 to-orange-600",
    },
    {
      icon: "🦺",
      title: t("feature3Title"),
      desc: t("feature3Desc"),
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: "📋",
      title: t("feature4Title"),
      desc: t("feature4Desc"),
      color: "from-blue-600 to-indigo-700",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background */}
        <div className="absolute inset-0 gradient-primary opacity-[0.07]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59,130,246,0.18), transparent)",
          }}
        />

        {/* Floating blobs */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 start-10 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-32 end-10 w-80 h-80 bg-cyan-200/30 rounded-full blur-3xl"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center gap-6"
          >
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-semibold"
            >
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              {t("appTagline")}
            </motion.div>

            {/* Title */}
            <motion.div variants={fadeUp} className="space-y-2">
              <h1
                className="text-7xl md:text-8xl font-black tracking-tight"
                style={{
                  background:
                    "linear-gradient(135deg, #1e40af 0%, #3b82f6 40%, #06b6d4 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {isRTL ? "ايقظني" : "AYQITHNI"}
              </h1>
              <p className="text-xl md:text-2xl font-semibold text-slate-600">
                {t("heroSubtitle")}
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="max-w-2xl text-base md:text-lg text-slate-500 leading-relaxed"
            >
              {t("heroDescription")}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
            >
              <Link
                href="/register?type=beneficiary"
                className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl text-white font-bold text-base gradient-primary hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/30"
              >
                <span>🏥</span>
                {t("iAmBeneficiary")}
              </Link>
              <Link
                href="/register?type=volunteer"
                className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl text-blue-700 font-bold text-base bg-white border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all"
              >
                <span>🦺</span>
                {t("iAmVolunteer")}
              </Link>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-2 text-slate-400 text-sm"
            >
              <Link href="#features" className="hover:text-blue-600 transition-colors">
                {t("learnMore")} ↓
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated device mockup */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 start-1/2 -translate-x-1/2 hidden lg:block opacity-20"
        >
          <div className="w-48 h-80 bg-gradient-to-b from-blue-300 to-blue-600 rounded-3xl border-4 border-blue-400/50" />
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-b from-white to-blue-50/50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-5 text-center card-shadow border border-blue-50"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-black text-primary">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 mt-1 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-3">
              {t("featuresTitle")}
            </h2>
            <div className="w-16 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl p-6 card-shadow border border-blue-50 flex gap-4 items-start"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl shadow-lg flex-shrink-0`}
                >
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg mb-1">
                    {f.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-3">
              {isRTL ? "كيف يعمل التطبيق؟" : "How does it work?"}
            </h2>
            <div className="w-16 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: "📱",
                title: isRTL ? "سجل وأنشئ ملفك" : "Register & Create Profile",
                desc: isRTL
                  ? "أنشئ ملفك الطبي الكامل مع بياناتك الصحية"
                  : "Create your full medical profile with health data",
              },
              {
                step: "02",
                icon: "🔗",
                title: isRTL ? "تواصل مع المتطوعين" : "Connect with Volunteers",
                desc: isRTL
                  ? "اربط حسابك مع متطوعين ومساعدين موثوقين"
                  : "Link your account with trusted volunteers and helpers",
              },
              {
                step: "03",
                icon: "🛡️",
                title: isRTL ? "احصل على الحماية" : "Get Protected",
                desc: isRTL
                  ? "عند الحاجة يتم التنبيه تلقائياً للمساعدة الفورية"
                  : "When needed, alerts are sent automatically for immediate help",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white rounded-2xl p-6 card-shadow text-center"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <div
                  className="text-5xl font-black mb-2 opacity-10"
                  style={{ color: "#1e40af" }}
                >
                  {item.step}
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              {isRTL ? "انضم إلى شبكة الأمان اليوم" : "Join the Safety Network Today"}
            </h2>
            <p className="text-blue-100 mb-8 text-lg">
              {isRTL
                ? "سواء كنت مريضاً أو متطوعاً، معاً نبني مجتمعاً أكثر أماناً"
                : "Whether you're a patient or a volunteer, together we build a safer community"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="px-8 py-4 bg-white text-blue-700 rounded-2xl font-bold text-base hover:bg-blue-50 transition-colors shadow-lg"
              >
                {t("getStarted")}
              </Link>
              <Link
                href="/login"
                className="px-8 py-4 border-2 border-white/50 text-white rounded-2xl font-bold text-base hover:bg-white/10 transition-colors"
              >
                {t("login")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">أ</span>
              </div>
              <div>
                <div className="text-white font-bold">{t("appName")}</div>
                <div className="text-xs">{t("footerDesc")}</div>
              </div>
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="hover:text-white transition-colors">
                {t("privacyPolicy")}
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                {t("terms")}
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                {t("contact")}
              </Link>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-6 pt-6 text-center text-xs">
            © 2024 {t("appName")} — {t("rights")}
          </div>
        </div>
      </footer>
    </div>
  );
}
