"use client";

import { useMemo, useState } from "react";
import type { Paper } from "@/lib/papers";

type QuizStep = "review" | "quiz" | "mistakes" | "result";

type QuizQuestion = {
  id: string;
  type: string;
  prompt: string;
  answer: string;
  options: string[];
  explanationEn: string;
  explanationZh: string;
};

const steps: { id: QuizStep; label: string }[] = [
  { id: "review", label: "1. 复习" },
  { id: "quiz", label: "2. 答题" },
  { id: "mistakes", label: "3. 错题" },
  { id: "result", label: "4. 结果" }
];

function rotateOptions(options: string[], seed: number) {
  const uniqueOptions = Array.from(new Set(options));
  if (uniqueOptions.length === 0) {
    return uniqueOptions;
  }

  const offset = seed % uniqueOptions.length;
  return [...uniqueOptions.slice(offset), ...uniqueOptions.slice(0, offset)];
}

function makeQuizQuestions(paper: Paper): QuizQuestion[] {
  const meanings = paper.words.map((word) => word.meaning);
  const wordQuestions = paper.words.map((word, index) => ({
    id: `word-${word.word}`,
    type: "词义选择",
    prompt: `${word.word} 的中文意思是？`,
    answer: word.meaning,
    options: rotateOptions([word.meaning, ...meanings.filter((meaning) => meaning !== word.meaning).slice(0, 3)], index),
    explanationEn: `${word.word} means ${word.meaning}.`,
    explanationZh: `记住这个词的核心意思：${word.word} = ${word.meaning}。`
  }));

  const blankQuestions = paper.blanks.slice(0, 6).map((blank, index) => ({
    id: `blank-${index}`,
    type: "语境填空",
    prompt: `${blank.sentenceBefore} ____ ${blank.sentenceAfter}`,
    answer: blank.answer,
    options: rotateOptions(
      [blank.answer, ...paper.words.map((word) => word.word).filter((word) => word !== blank.answer).slice(0, 3)],
      index + 2
    ),
    explanationEn: blank.explanationEn,
    explanationZh: blank.explanationZh
  }));

  const readingQuestions = paper.questions.slice(0, 4).map((question, index) => ({
    id: `reading-${index}`,
    type: "阅读理解",
    prompt: question.question,
    answer: question.answer,
    options: rotateOptions(
      [
        question.answer,
        question.studentAnswer,
        ...paper.questions
          .filter((item) => item.answer !== question.answer)
          .map((item) => item.answer)
          .slice(0, 2)
      ],
      index + 1
    ),
    explanationEn: question.explanationEn,
    explanationZh: question.explanationZh
  }));

  return [...wordQuestions, ...blankQuestions, ...readingQuestions];
}

function HighlightedMaterial({ paper }: { paper: Paper }) {
  const words = new Set(paper.words.map((word) => word.word.toLowerCase()));
  const parts = paper.reading.split(/(\b[\w']+\b)/g);

  return (
    <p className="quiz-reading">
      {parts.map((part, index) => {
        const normalized = part.toLowerCase().replace(/'s$/, "");
        if (words.has(normalized)) {
          return <strong key={`${part}-${index}`}>{part}</strong>;
        }

        return part;
      })}
    </p>
  );
}

export function QuizApp({ paper }: { paper: Paper }) {
  const questions = useMemo(() => makeQuizQuestions(paper), [paper]);
  const [step, setStep] = useState<QuizStep>("review");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const current = questions[currentIndex];
  const selected = answers[current.id];
  const answeredCount = Object.keys(answers).length;
  const correctCount = questions.filter((question) => answers[question.id] === question.answer).length;
  const wrongQuestions = questions.filter((question) => answers[question.id] && answers[question.id] !== question.answer);
  const progress = questions.length ? Math.round((answeredCount / questions.length) * 100) : 0;

  return (
    <main className="quiz-app">
      <section className="quiz-hero">
        <div>
          <h1>PET 词汇答题小程序</h1>
          <p>
            主题：{paper.topic}。先读材料，再练{" "}
            {paper.wordStudy.map((study) => study.word).join(" / ")} 等易混点。
          </p>
        </div>
        <div className="score-card">
          <span>当前得分</span>
          <strong>{correctCount}/{answeredCount}</strong>
          <div className="progress"><span style={{ width: `${progress}%` }} /></div>
        </div>
      </section>

      <section className="quiz-workspace">
        <div className="quiz-main-card">
          <div className="quiz-tabs" role="tablist" aria-label="Quiz steps">
            {steps.map((item) => (
              <button
                className={step === item.id ? "active" : ""}
                key={item.id}
                type="button"
                onClick={() => setStep(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {step === "review" ? (
            <section className="quiz-stage">
              <h2>先读材料</h2>
              <HighlightedMaterial paper={paper} />
              <div className="review-word-grid">
                {paper.words.map((word) => (
                  <article key={word.word}>
                    <b>{word.word}</b>
                    <span>{word.meaning}</span>
                  </article>
                ))}
              </div>
              <div className="quiz-actions">
                <button className="button primary" type="button" onClick={() => setStep("quiz")}>
                  开始答题
                </button>
              </div>
            </section>
          ) : null}

          {step === "quiz" ? (
            <section className="quiz-stage">
              <div className="question-meta">
                <span className="pill">{current.type}</span>
                <span>{currentIndex + 1} / {questions.length}</span>
              </div>
              <h2>{current.prompt}</h2>
              <div className="options">
                {current.options.map((option, optionIndex) => {
                  const isSelected = selected === option;
                  const isCorrect = selected && option === current.answer;
                  const isWrong = isSelected && option !== current.answer;

                  return (
                    <button
                      className={`option ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`}
                      key={`${current.id}-${option}-${optionIndex}`}
                      type="button"
                      onClick={() => setAnswers((previous) => ({ ...previous, [current.id]: option }))}
                    >
                      <span>{option}</span>
                      {isCorrect ? <b>正确</b> : null}
                      {isWrong ? <b>再想想</b> : null}
                    </button>
                  );
                })}
              </div>

              {selected ? (
                <div className="quiz-explanation">
                  <p><span className="correct-answer">正确答案：</span>{current.answer}</p>
                  <p><span className="english-note">Explanation:</span> {current.explanationEn}</p>
                  <p><span className="chinese-note">讲解：</span>{current.explanationZh}</p>
                </div>
              ) : null}

              <div className="quiz-actions">
                <button
                  className="button"
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))}
                >
                  上一题
                </button>
                <button
                  className="button primary"
                  type="button"
                  onClick={() => {
                    if (currentIndex === questions.length - 1) {
                      setStep("result");
                    } else {
                      setCurrentIndex((index) => Math.min(questions.length - 1, index + 1));
                    }
                  }}
                >
                  {currentIndex === questions.length - 1 ? "看结果" : "下一题"}
                </button>
              </div>
            </section>
          ) : null}

          {step === "mistakes" ? (
            <section className="quiz-stage">
              <h2>错题复盘</h2>
              {wrongQuestions.length === 0 ? (
                <p className="empty-state">目前还没有错题。做完几题后这里会自动整理。</p>
              ) : (
                <div className="mistake-list">
                  {wrongQuestions.map((question) => (
                    <article key={question.id}>
                      <span className="pill">{question.type}</span>
                      <h3>{question.prompt}</h3>
                      <p><span className="student-answer">你的答案：</span>{answers[question.id]}</p>
                      <p><span className="correct-answer">正确答案：</span>{question.answer}</p>
                      <p><span className="chinese-note">讲解：</span>{question.explanationZh}</p>
                    </article>
                  ))}
                </div>
              )}
            </section>
          ) : null}

          {step === "result" ? (
            <section className="quiz-stage result-stage">
              <h2>学习结果</h2>
              <div className="result-number">{correctCount}/{questions.length}</div>
              <p>
                已完成 {answeredCount} 题，正确 {correctCount} 题，错题 {wrongQuestions.length} 题。
              </p>
              <div className="quiz-actions">
                <button className="button" type="button" onClick={() => setStep("mistakes")}>
                  查看错题
                </button>
                <button
                  className="button primary"
                  type="button"
                  onClick={() => {
                    setAnswers({});
                    setCurrentIndex(0);
                    setStep("review");
                  }}
                >
                  重新开始
                </button>
              </div>
            </section>
          ) : null}
        </div>

        <aside className="quiz-side-stack">
          <section className="quiz-side">
            <h2>易混点</h2>
            {paper.wordStudy.map((study) => (
              <article className="confusion-card" key={study.word}>
                <b>{study.word}</b>
                <span>{study.note}</span>
              </article>
            ))}
          </section>

          <section className="quiz-side">
            <h2>学习节奏</h2>
            <ol className="rhythm-list">
              <li><b>1</b><span>读短文时先圈出关键词。</span></li>
              <li><b>2</b><span>选择题检查意思，填空题检查搭配。</span></li>
              <li><b>3</b><span>错题页只保留没掌握的点，方便复盘。</span></li>
              <li><b>4</b><span>{paper.creativePrompt}</span></li>
            </ol>
          </section>

          <section className="quiz-side">
            <h2>答题导航</h2>
            <div className="question-dots">
              {questions.map((question, index) => (
                <button
                  className={`${index === currentIndex ? "active" : ""} ${answers[question.id] === question.answer ? "done" : ""}`}
                  key={question.id}
                  type="button"
                  onClick={() => {
                    setCurrentIndex(index);
                    setStep("quiz");
                  }}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}
