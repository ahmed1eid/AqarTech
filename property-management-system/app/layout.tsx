import { Cairo } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "@/lib/ThemeRegistry";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-cairo",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${cairo.variable} font-sans`}>
        {/* ThemeRegistry ضروري لربط MUI مع Next.js ومنع أخطاء الـ Hydration */}
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}