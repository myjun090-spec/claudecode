import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Claude Code 설치 가이드 - 누구나 쉽게 시작하는 AI 코딩",
  description:
    "Windows, macOS, Linux에서 Claude Code를 쉽게 설치하고 시작하세요. 초보자를 위한 단계별 가이드와 오류 해결법을 제공합니다.",
  keywords: "Claude Code, 설치, 가이드, AI 코딩, Anthropic, 튜토리얼",
  openGraph: {
    title: "Claude Code 설치 가이드",
    description: "누구나 쉽게 시작하는 AI 코딩 도구 Claude Code 설치 가이드",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
