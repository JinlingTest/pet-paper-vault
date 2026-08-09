"use client";

import { useMemo, useState } from "react";
import type { Paper } from "@/lib/papers";

type QuizStep = "review" | "quiz" | "mistakes" | "result";

type QuizQuestion = {
  id: string;
  part: string;
  type: string;
  prompt: string;
  answer: string;
  options: string[];
  explanationEn: string;
  explanationZh: string;
  judgementEn: string;
  judgementZh: string;
};

const steps: { id: QuizStep; label: string }[] = [
  { id: "review", label: "1. 复习" },
  { id: "quiz", label: "2. 答题" },
  { id: "mistakes", label: "3. 错题" },
  { id: "result", label: "4. 结果" }
];

function rotateOptions(options: string[], seed: number) {
  const uniqueOptions = Array.from(new Set(options.filter(Boolean)));
  if (uniqueOptions.length === 0) {
    return uniqueOptions;
  }

  const offset = seed % uniqueOptions.length;
  return [...uniqueOptions.slice(offset), ...uniqueOptions.slice(0, offset)];
}

function makeQuizQuestions(paper: Paper): QuizQuestion[] {
  const readingQuestions = paper.questions.map((question, index) => ({
    id: `part3-${index}`,
    part: `Part 3.${index + 1}`,
    type: "阅读理解 / Reading",
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
    explanationZh: question.explanationZh,
    judgementEn: "Go back to the reading text and find the exact sentence or detail.",
    judgementZh: "回到阅读材料，找到对应的原句或细节再判断。"
  }));

  const blankQuestions = paper.blanks.map((blank, index) => ({
    id: `part5-${index}`,
    part: `Part 5.${index + 1}`,
    type: "选词填空 / Fill in the Blanks",
    prompt: `${blank.sentenceBefore} ____ ${blank.sentenceAfter}`,
    answer: blank.answer,
    options: rotateOptions(
      [blank.answer, blank.studentAnswer, ...paper.words.map((word) => word.word).filter((word) => word !== blank.answer).slice(0, 3)],
      index + 2
    ),
    explanationEn: blank.explanationEn,
    explanationZh: blank.explanationZh,
    judgementEn: "Check the meaning first, then check grammar and collocation.",
    judgementZh: "先判断意思，再检查语法位置和固定搭配。"
  }));

  const correctionQuestions = paper.corrections.map((correction, index) => ({
    id: `part6-${index}`,
    part: `Part 6.${index + 1}`,
    type: "改错 / Correct the Mistakes",
    prompt: correction.prompt,
    answer: correction.answer,
    options: rotateOptions([correction.answer, correction.studentAnswer, correction.prompt], index + 3),
    explanationEn: correction.explanationEn,
    explanationZh: correction.explanationZh,
    judgementEn: "Compare the wrong sentence with the correct sentence and focus on the changed word.",
    judgementZh: "对比错误句和正确句，重点看被替换或删除的词。"
  }));

  return [...readingQuestions, ...blankQuestions, ...correctionQuestions];
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
            Topic / 主题：{paper.topic}。先读材料，再按打印试卷的 Part 3、Part 5、Part 6 顺序答题。
          </p>
        </div>
        <div className="score-card">
          <span>Current score / 当前得分</span>
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
              <h2>先读材料 / Read First</h2>
              <HighlightedMaterial paper={paper} />

              <div className="helper-note">
                <b>Reading help / 阅读帮助</b>
                <span>Blue words are today's key words. Read the sentence around each key word before answering.</span>
                <span>蓝色词是今天的关键词。答题前先读关键词前后的完整句子。</span>
              </div>

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
                  开始答题 / Start
                </button>
              </div>
            </section>
          ) : null}

          {step === "quiz" ? (
            <section className="quiz-stage">
              <div className="question-meta">
                <span className="pill">{current.part}</span>
                <span className="pill">{current.type}</span>
                <span>{currentIndex + 1} / {questions.length}</span>
              </div>
              <h2>{current.prompt}</h2>
              <div className="judgement-note">
                <b>Key judgement / 判断关键：</b>
                <span>{current.judgementEn}</span>
                <span>{current.judgementZh}</span>
              </div>

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
                      {isCorrect ? <b>正确 / Correct</b> : null}
                      {isWrong ? <b>再想想 / Try again</b> : null}
                    </button>
                  );
                })}
              </div>

              {selected ? (
                <div className="quiz-explanation">
                  <p><span className="correct-answer">Correct answer / 正确答案：</span>{current.answer}</p>
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
                  上一题 / Previous
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
                  {currentIndex === questions.length - 1 ? "看结果 / Result" : "下一题 / Next"}
                </button>
              </div>
            </section>
          ) : null}

          {step === "mistakes" ? (
            <section className="quiz-stage">
              <h2>错题复盘 / Mistake Review</h2>
              {wrongQuestions.length === 0 ? (
                <p className="empty-state">目前还没有错题。No mistakes yet.</p>
              ) : (
                <div className="mistake-list">
                  {wrongQuestions.map((question) => (
                    <article key={question.id}>
                      <span className="pill">{question.part}</span>
                      <span className="pill">{question.type}</span>
                      <h3>{question.prompt}</h3>
                      <p><span className="student-answer">Your answer / 你的答案：</span>{answers[question.id]}</p>
                      <p><span className="correct-answer">Correct answer / 正确答案：</span>{question.answer}</p>
                      <p><span className="english-note">Explanation:</span> {question.explanationEn}</p>
                      <p><span className="chinese-note">讲解：</span>{question.explanationZh}</p>
                    </article>
                  ))}
                </div>
              )}
            </section>
          ) : null}

          {step === "result" ? (
            <section className="quiz-stage result-stage">
              <h2>学习结果 / Result</h2>
              <div className="result-number">{correctCount}/{questions.length}</div>
              <p>
                Completed / 已完成：{answeredCount}；Correct / 正确：{correctCount}；Mistakes / 错题：{wrongQuestions.length}。
              </p>
              <div className="quiz-actions">
                <button className="button" type="button" onClick={() => setStep("mistakes")}>
                  查看错题 / Review
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
                  重新开始 / Restart
                </button>
              </div>
            </section>
          ) : null}
        </div>

        <aside className="quiz-side-stack">
          <section className="quiz-side">
            <h2>易混点 / Common Traps</h2>
            {paper.wordStudy.map((study) => (
              <article className="confusion-card" key={study.word}>
                <b>{study.word}</b>
                <span><strong>Collocations / 搭配：</strong>{study.collocations.join(", ")}</span>
                <span><strong>Similar words / 近义词：</strong>{study.similar.join(", ")}</span>
                <span><strong>Note / 英文提示：</strong>{study.note}</span>
                <span><strong>中文提示：</strong>看到这个词时，先判断它在句子里是表示意思、搭配，还是语法位置。</span>
              </article>
            ))}
          </section>

          <section className="quiz-side">
            <h2>学习节奏 / Study Rhythm</h2>
            <ol className="rhythm-list">
              <li><b>1</b><span>Read first. 先读材料，圈出关键词。</span></li>
              <li><b>2</b><span>Check meaning. 选择题先判断意思。</span></li>
              <li><b>3</b><span>Check collocation. 填空题检查搭配和语法位置。</span></li>
              <li><b>4</b><span>{paper.creativePrompt}</span></li>
            </ol>
          </section>

          <section className="quiz-side">
            <h2>答题导航 / Questions</h2>
            <div className="question-dots">
              {questions.map((question, index) => (
                <button
                  className={`${index === currentIndex ? "active" : ""} ${answers[question.id] === question.answer ? "done" : ""}`}
                  key={question.id}
                  type="button"
                  title={`${question.part} ${question.type}`}
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
