"use client";

import { useState } from "react";
import { PrintButton } from "@/components/PrintButton";
import { ZhongkaoFullPaper } from "@/components/ZhongkaoPaperView";
import { ZhongkaoQuizApp } from "@/components/ZhongkaoQuizApp";
import type { ZhongkaoPaper } from "@/lib/zhongkao-papers";

type Mode = "paper" | "quiz";

export function ZhongkaoPaperModeSwitcher({ paper }: { paper: ZhongkaoPaper }) {
  const [mode, setMode] = useState<Mode>("paper");

  return (
    <>
      <div className="screen-only mode-switcher" aria-label="Zhongkao paper mode switcher">
        <div className="segmented">
          <button className={mode === "paper" ? "active" : ""} type="button" onClick={() => setMode("paper")}>
            ????
          </button>
          <button className={mode === "quiz" ? "active" : ""} type="button" onClick={() => setMode("quiz")}>
            ???????
          </button>
        </div>
        {mode === "paper" ? <PrintButton /> : null}
      </div>

      {mode === "paper" ? <ZhongkaoFullPaper paper={paper} /> : <ZhongkaoQuizApp paper={paper} />}
    </>
  );
}