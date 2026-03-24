"use client";

import { useState, useCallback, useEffect } from "react";
import { type OS, getSteps } from "@/data/steps";

export default function Home() {
  const [selectedOS, setSelectedOS] = useState<OS | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [animKey, setAnimKey] = useState(0);

  const steps = selectedOS ? getSteps(selectedOS) : [];
  const totalSteps = steps.length;

  const goNext = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setDirection("forward");
      setCurrentStep((s) => s + 1);
      setAnimKey((k) => k + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep, totalSteps]);

  const goPrev = useCallback(() => {
    if (currentStep > 0) {
      setDirection("back");
      setCurrentStep((s) => s - 1);
      setAnimKey((k) => k + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep]);

  const goToOSSelect = useCallback(() => {
    setSelectedOS(null);
    setCurrentStep(0);
    setAnimKey((k) => k + 1);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        if (selectedOS) goNext();
      }
      if (e.key === "ArrowLeft") {
        if (selectedOS && currentStep > 0) goPrev();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedOS, goNext, goPrev, currentStep]);

  // OS Select Screen
  if (!selectedOS) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 bg-purple-50 rounded-full text-xs font-medium text-purple-600 mb-4 border border-purple-100">
            2025년 최신 가이드
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">Claude Code</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            AI 에이전틱 코딩 도구, 설치부터 실행까지
            <br />
            단계별로 안내합니다.
          </p>
        </div>

        {/* OS Cards */}
        <div className="w-full max-w-3xl">
          <h2 className="text-center text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
            사용하는 운영체제를 선택하세요
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {([
              {
                os: "windows" as OS,
                icon: "🪟",
                name: "Windows",
                desc: "Windows 10/11",
                tags: ["PowerShell", "winget", "WSL2"],
                color: "from-blue-50 to-indigo-50",
              },
              {
                os: "macos" as OS,
                icon: "🍎",
                name: "macOS",
                desc: "macOS 12+",
                tags: ["Homebrew", "Terminal", "Zsh"],
                color: "from-gray-50 to-slate-50",
              },
              {
                os: "linux" as OS,
                icon: "🐧",
                name: "Linux",
                desc: "Ubuntu, Debian 등",
                tags: ["nvm", "apt", "WSL2"],
                color: "from-orange-50 to-amber-50",
              },
            ]).map((item) => (
              <button
                key={item.os}
                onClick={() => setSelectedOS(item.os)}
                className={`os-card bg-gradient-to-br ${item.color} rounded-2xl p-8 text-center shadow-sm`}
              >
                <div className="text-6xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{item.desc}</p>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 bg-white/80 rounded-full text-gray-500 border border-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom info */}
        <div className="mt-12 text-center max-w-lg">
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { icon: "🤖", label: "AI 코딩 에이전트" },
              { icon: "💻", label: "터미널 기반" },
              { icon: "🌍", label: "크로스 플랫폼" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl mb-1">{item.icon}</div>
                <p className="text-xs text-gray-400">{item.label}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-300">
            Claude Code는 Anthropic의 제품입니다. 이 사이트는 비공식 가이드입니다.
          </p>
        </div>
      </div>
    );
  }

  // Step View
  const step = steps[currentStep];
  const osNames: Record<OS, string> = { windows: "Windows", macos: "macOS", linux: "Linux" };
  const osIcons: Record<OS, string> = { windows: "🪟", macos: "🍎", linux: "🐧" };
  const isLast = currentStep === totalSteps - 1;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={goToOSSelect}
            className="text-sm text-gray-400 hover:text-purple-600 transition-colors flex items-center gap-1"
          >
            ← OS 선택
          </button>
          <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
            <span>{osIcons[selectedOS]}</span>
            <span>{osNames[selectedOS]}</span>
          </div>
          <div className="flex-1" />
          <span className="text-xs text-gray-400">
            {currentStep + 1} / {totalSteps}
          </span>
        </div>

        {/* Progress bar */}
        <div className="max-w-3xl mx-auto px-4 pb-3">
          <div className="flex items-center gap-1">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentStep ? "forward" : "back");
                  setCurrentStep(i);
                  setAnimKey((k) => k + 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex-1 group"
              >
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i < currentStep
                      ? "bg-green-400"
                      : i === currentStep
                      ? "bg-purple-500"
                      : "bg-gray-200 group-hover:bg-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          {/* Step labels (small) */}
          <div className="flex mt-1.5">
            {steps.map((s, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentStep ? "forward" : "back");
                  setCurrentStep(i);
                  setAnimKey((k) => k + 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`flex-1 text-[10px] text-center truncate px-0.5 transition-colors ${
                  i === currentStep
                    ? "text-purple-600 font-semibold"
                    : i < currentStep
                    ? "text-green-500"
                    : "text-gray-300 hover:text-gray-400"
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Card content */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        <div
          key={animKey}
          className={direction === "forward" ? "card-enter" : "card-enter-reverse"}
        >
          {/* Step header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-purple-100 text-purple-600 text-xs font-bold">
                {currentStep + 1}
              </span>
              <h1 className="text-2xl lg:text-3xl font-bold">{step.title}</h1>
            </div>
            <p className="text-gray-500 text-sm ml-9">{step.subtitle}</p>
          </div>

          {/* Step body */}
          <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 mb-8">
            {step.content}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center gap-3 pb-12">
          <button
            onClick={goPrev}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all ${
              currentStep === 0
                ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                : "bg-white border border-gray-200 text-gray-600 hover:border-purple-300 hover:text-purple-600 shadow-sm"
            }`}
          >
            ← 이전
          </button>

          <div className="flex-1" />

          {!isLast ? (
            <button
              onClick={goNext}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl text-sm font-medium shadow-lg shadow-purple-200 hover:shadow-xl transition-all"
            >
              다음 →
            </button>
          ) : (
            <button
              onClick={goToOSSelect}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl text-sm font-medium shadow-lg shadow-green-200 hover:shadow-xl transition-all"
            >
              처음으로 돌아가기
            </button>
          )}
        </div>

        {/* Keyboard hint */}
        <div className="text-center text-xs text-gray-300 pb-6">
          ← → 방향키 또는 스페이스바로 탐색할 수 있습니다
        </div>
      </main>
    </div>
  );
}
