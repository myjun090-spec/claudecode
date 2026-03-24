"use client";

import { useState, useEffect } from "react";

const sections = [
  { id: "hero", label: "소개", icon: "🏠" },
  { id: "prerequisites", label: "사전 준비", icon: "📋" },
  { id: "install", label: "설치하기", icon: "⚡" },
  { id: "first-run", label: "첫 실행", icon: "🚀" },
  { id: "ide", label: "IDE 연동", icon: "🔗" },
  { id: "errors", label: "오류 해결", icon: "🔧" },
  { id: "tips", label: "꿀팁 모음", icon: "💡" },
  { id: "faq", label: "자주 묻는 질문", icon: "❓" },
];

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-[60] bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center border border-gray-200"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`sidebar ${isOpen ? "open" : ""} w-64 bg-white border-r border-gray-100 h-screen sticky top-0 overflow-y-auto p-6 lg:translate-x-0`}
      >
        <div className="mb-8">
          <h2 className="text-lg font-bold gradient-text">Claude Code</h2>
          <p className="text-xs text-gray-400 mt-1">설치 & 시작 가이드</p>
        </div>

        <nav className="space-y-1">
          {sections.map(({ id, label, icon }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setIsOpen(false)}
              className={`nav-link block py-2 px-3 rounded-r-lg text-sm ${
                activeSection === id ? "active" : "text-gray-600"
              }`}
            >
              <span className="mr-2">{icon}</span>
              {label}
            </a>
          ))}
        </nav>

        <div className="mt-8 p-4 bg-gradient-to-br from-purple-50 to-green-50 rounded-xl">
          <p className="text-xs text-gray-500 leading-relaxed">
            이 가이드는 Claude Code를 처음 접하는 분들을 위해 만들어졌습니다.
          </p>
        </div>
      </aside>
    </>
  );
}
