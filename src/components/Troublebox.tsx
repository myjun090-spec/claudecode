"use client";

import { useState } from "react";
import type { ReactNode } from "react";

export interface TroubleItem {
  emoji: string;
  title: string;
  content: ReactNode;
}

export default function Troublebox({
  items,
  label,
}: {
  items: TroubleItem[];
  label?: string;
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="mt-5 pt-5 border-t border-dashed border-gray-200">
      <p className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
        <span className="inline-block w-4 h-4 rounded bg-orange-100 text-center leading-4 text-[10px]">!</span>
        {label || "이 단계에서 문제가 생겼나요?"}
      </p>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 overflow-hidden transition-colors hover:border-orange-200"
          >
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full px-4 py-3 flex items-center gap-2.5 text-left text-sm hover:bg-orange-50/50 transition-colors"
            >
              <span className="text-base">{item.emoji}</span>
              <span className="flex-1 font-medium text-gray-700">{item.title}</span>
              <span
                className={`text-[10px] text-gray-400 transition-transform duration-200 ${
                  openIdx === i ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIdx === i ? "max-h-[1200px]" : "max-h-0"
              }`}
            >
              <div className="px-4 pb-4 pt-1 border-t border-gray-100 bg-gray-50/50">
                {item.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
