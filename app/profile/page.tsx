"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import type { TranslationKey } from "@/lib/translations";
import Navbar from "@/components/Navbar";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const conditionOptions = [
  { key: "epilepsy", emoji: "🧠" },
  { key: "fainting", emoji: "😵" },
  { key: "diabetes", emoji: "💉" },
  { key: "heartDisease", emoji: "❤️" },
];

const emergencyContactsDefault = [
  { name: "Khalid Al-Ali", relation: "Brother", phone: "+966501234567" },
  { name: "Noura Al-Ali", relation: "Mother", phone: "+966509876543" },
];

export default function ProfilePage() {
  const { t, isRTL } = useLanguage();
  const [editing, setEditing] = useState(false);
  const [bloodType, setBloodType] = useState("O+");
  const [selectedConditions, setSelectedConditions] = useState<string[]>(["epilepsy"]);
  const [medications, setMedications] = useState(
    isRTL ? "كاربامازيبين 200mg - مرتين يومياً" : "Carbamazepine 200mg - twice daily"
  );
  const [allergies, setAllergies] = useState(isRTL ? "البنسلين" : "Penicillin");
  const [contacts] = useState(emergencyContactsDefault);
  const [saved, setSaved] = useState(false);

  const toggleCondition = (key: string) => {
    setSelectedConditions((prev) =>
      prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key]
    );
  };

  const handleSave = () => {
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

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
          <div className="relative z-10 flex items-center gap-5">
            <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center text-4xl flex-shrink-0">
              👤
            </div>
            <div>
              <h1 className="text-2xl font-black">
                {isRTL ? "محمد العلي" : "Mohammed Al-Ali"}
              </h1>
              <p className="text-blue-100 text-sm">
                {isRTL ? "مستفيد • مسجل منذ 2024" : "Beneficiary • Member since 2024"}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-white/20 px-3 py-0.5 rounded-full text-xs font-bold">
                  🩸 {bloodType}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 mb-4 text-center text-emerald-700 font-semibold text-sm"
          >
            ✅ {t("success")}
          </motion.div>
        )}

        {/* Blood Type */}
        <div className="bg-white rounded-2xl p-5 card-shadow border border-blue-50 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              🩸 {t("bloodType")}
            </h2>
            <button
              onClick={() => setEditing(!editing)}
              className="text-xs text-blue-600 font-semibold bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"
            >
              {editing ? t("save") : t("edit")}
            </button>
          </div>
          {editing ? (
            <div className="grid grid-cols-4 gap-2">
              {bloodTypes.map((bt) => (
                <button
                  key={bt}
                  onClick={() => setBloodType(bt)}
                  className={`py-2 rounded-xl text-sm font-bold transition-all ${
                    bloodType === bt
                      ? "gradient-primary text-white shadow-md"
                      : "bg-slate-100 text-slate-700 hover:bg-blue-50"
                  }`}
                >
                  {bt}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-lg">
                {bloodType}
              </div>
              <p className="text-slate-600 text-sm">
                {isRTL ? `فصيلة الدم: ${bloodType}` : `Blood type: ${bloodType}`}
              </p>
            </div>
          )}
        </div>

        {/* Conditions */}
        <div className="bg-white rounded-2xl p-5 card-shadow border border-blue-50 mb-4">
          <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            🏥 {t("conditions")}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {conditionOptions.map(({ key, emoji }) => {
              const isSelected = selectedConditions.includes(key);
              return (
                <button
                  key={key}
                  onClick={() => toggleCondition(key)}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-start ${
                    isSelected
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-slate-100 bg-slate-50 text-slate-600 hover:border-blue-200"
                  }`}
                >
                  <span className="text-xl">{emoji}</span>
                  <span className="text-sm font-semibold">
                    {t(key as TranslationKey)}
                  </span>
                  {isSelected && <span className="ms-auto text-blue-500">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Medications */}
        <div className="bg-white rounded-2xl p-5 card-shadow border border-blue-50 mb-4">
          <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            💊 {t("medications")}
          </h2>
          <textarea
            value={medications}
            onChange={(e) => setMedications(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 text-sm resize-none"
          />
        </div>

        {/* Allergies */}
        <div className="bg-white rounded-2xl p-5 card-shadow border border-blue-50 mb-4">
          <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            ⚠️ {t("allergies")}
          </h2>
          <input
            type="text"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 text-sm"
          />
        </div>

        {/* Emergency Contacts */}
        <div className="bg-white rounded-2xl p-5 card-shadow border border-blue-50 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              📞 {t("emergencyContacts")}
            </h2>
            <button className="text-xs text-blue-600 font-semibold bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
              + {t("addContact")}
            </button>
          </div>
          <div className="space-y-3">
            {contacts.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
              >
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center text-white font-bold text-sm">
                  {c.name[0]}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-800 text-sm">{c.name}</p>
                  <p className="text-xs text-slate-500">
                    {c.relation} • {c.phone}
                  </p>
                </div>
                <button className="text-slate-400 hover:text-red-500 text-lg">
                  ×
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          className="w-full py-4 rounded-2xl text-white font-bold text-base gradient-primary hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20"
        >
          💾 {t("save")}
        </motion.button>
      </div>
    </div>
  );
}
