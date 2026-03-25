import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "ايقظني | AYQITHNI - Smart Emergency Alert System",
  description:
    "نظام تنبيه ذكي لحالات الإغماء والصرع | Smart Alert System for Fainting & Seizure Events",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
