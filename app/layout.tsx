import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSaans = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "BLUE STOCK | 모의 주식 거래 플랫폼",
  description: "실시간 주가 시뮬레이션 및 모의 투자 서비스",
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
