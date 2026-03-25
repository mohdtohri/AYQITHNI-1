"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface SensorData {
  heartRate: number;
  motion: "still" | "walking" | "running";
  status: "normal" | "warning" | "critical";
}

function generateSensorData(): SensorData {
  const heartRate = Math.floor(Math.random() * 40) + 60; // 60-100
  const motions: SensorData["motion"][] = ["still", "walking", "running"];
  const motion = motions[Math.floor(Math.random() * motions.length)];
  const status: SensorData["status"] =
    heartRate > 95 ? "warning" : heartRate > 105 ? "critical" : "normal";
  return { heartRate, motion, status };
}

const motionEmoji: Record<SensorData["motion"], string> = {
  still: "🧘",
  walking: "🚶",
  running: "🏃",
};

export default function SensorDisplay() {
  const { t } = useLanguage();
  const [data, setData] = useState<SensorData>(generateSensorData());
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateSensorData());
      setTick((p) => p + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const statusColor = {
    normal: "text-emerald-600 bg-emerald-50 border-emerald-200",
    warning: "text-amber-600 bg-amber-50 border-amber-200",
    critical: "text-red-600 bg-red-50 border-red-200",
  };

  const statusLabel = {
    normal: t("normal"),
    warning: t("warning"),
    critical: t("critical"),
  };

  const hrColor =
    data.status === "normal"
      ? "text-emerald-600"
      : data.status === "warning"
      ? "text-amber-600"
      : "text-red-600";

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Heart Rate */}
      <motion.div
        key={`hr-${tick}`}
        initial={{ scale: 0.97 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-2xl p-4 card-shadow border border-blue-50"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">❤️</span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            {t("heartRate")}
          </span>
        </div>
        <div className={`text-3xl font-black ${hrColor}`}>
          {data.heartRate}
          <span className="text-sm font-semibold text-slate-400 ms-1">
            {t("bpm")}
          </span>
        </div>
        {/* Mini heartbeat bar */}
        <div className="mt-3 flex items-end gap-0.5 h-8">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ height: Math.random() * 28 + 4 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className={`w-1 rounded-full ${
                data.status === "normal"
                  ? "bg-emerald-400"
                  : data.status === "warning"
                  ? "bg-amber-400"
                  : "bg-red-400"
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* Motion */}
      <motion.div
        key={`motion-${tick}`}
        initial={{ scale: 0.97 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-2xl p-4 card-shadow border border-blue-50"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">📡</span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            {t("motionStatus")}
          </span>
        </div>
        <div className="text-4xl mb-2">{motionEmoji[data.motion]}</div>
        <div className="text-sm font-semibold text-slate-700 capitalize">
          {data.motion}
        </div>
      </motion.div>

      {/* Status */}
      <div className="col-span-2 bg-white rounded-2xl p-4 card-shadow border border-blue-50">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-500">
            {t("healthStatus")}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColor[data.status]}`}
          >
            {statusLabel[data.status]}
          </span>
        </div>
        <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            animate={{
              width:
                data.status === "normal"
                  ? "40%"
                  : data.status === "warning"
                  ? "70%"
                  : "95%",
              backgroundColor:
                data.status === "normal"
                  ? "#10b981"
                  : data.status === "warning"
                  ? "#f59e0b"
                  : "#ef4444",
            }}
            transition={{ duration: 0.8 }}
            className="h-full rounded-full"
          />
        </div>
        <p className="text-xs text-slate-400 mt-2">
          {t("lastUpdate")}: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}
