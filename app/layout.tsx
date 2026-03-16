import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSaans = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "프로필 | 디자인 및 개발 솔루션",
  description: "사용자의 일상을 바꾸는 기술적인 솔루션을 제공하는 프로필 사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${notoSaans.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
