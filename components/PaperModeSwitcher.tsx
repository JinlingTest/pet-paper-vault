"use client";

import { useState } from "react";
import { FullPaper } from "@/components/PaperView";
import { PrintButton } from "@/components/PrintButton";
import { QuizApp } from "@/components/QuizApp";
import type { Paper } from "@/lib/papers";

type Mode = "paper" | "quiz";

export function PaperModeSwitcher({ paper }: { paper: Paper }) {
  const [mode, setMode] = useState<Mode>("paper");
  const [score, setScore] = useState({ correct: 0, answered: 0 });

  return (
    <>
      <div className="screen-only mode-switcher" aria-label="Paper mode switcher">
        <div className="segmented">
          <button
            className={mode === "paper" ? "active" : ""}
            type="button"
            onClick={() => setMode("paper")}
          >
            打印试卷
          </button>
          <button
            className={mode === "quiz" ? "active" : ""}
            type="button"
            onClick={() => setMode("quiz")}
          >
            <span>词汇答题小程序</span>
            {mode === "quiz" ? <small>· 得分 {score.correct}/{score.answered}</small> : null}
          </button>
        </div>
        {mode === "paper" ? <PrintButton /> : null}
      </div>

      {mode === "paper" ? (
        <FullPaper paper={paper} />
      ) : (
        <QuizApp paper={paper} onScoreChange={setScore} />
      )}
    </>
  );
}
