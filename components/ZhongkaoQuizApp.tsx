"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ZhongkaoPaper, ZhongkaoQuestion } from "@/lib/zhongkao-papers";

type QuizStep = "review" | "quiz" | "mistakes" | "result";

const steps: { id: QuizStep; label: string }[] = [
  { id: "review", label: "1. 复习" },
  { id: "quiz", label: "2. 答题" },
  { id: "mistakes", label: "3. 错题" },
  { id: "result", label: "4. 结果" }
];

type SpeakHandler = (key: string, text: string) => void;

function useBrowserSpeech() {
  const [playingKey, setPlayingKey] = useState<string | null>(null);
  const activeKey = useRef<string | null>(null);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    activeKey.current = null;
    setPlayingKey(null);
  }, []);

  const speak = useCallback<SpeakHandler>(
    (key, text) => {
      if (activeKey.current === key) {
        stop();
        return;
      }

      stop();

      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.82;
      utterance.onend = () => {
        if (activeKey.current === key) {
          activeKey.current = null;
          setPlayingKey(null);
        }
      };
      activeKey.current = key;
      setPlayingKey(key);
      window.speechSynthesis.speak(utterance);
    },
    [stop]
  );

  useEffect(() => stop, [stop]);

  return { playingKey, speak };
}

function SpeakButton({
  text,
  audioKey,
  isPlaying,
  onSpeak,
  label = "朗读"
}: {
  text: string;
  audioKey: string;
  isPlaying: boolean;
  onSpeak: SpeakHandler;
  label?: string;
}) {
  return (
    <button
      className={`speak-button ${isPlaying ? "is-playing" : ""}`}
      type="button"
      onClick={() => onSpeak(audioKey, text)}
      aria-label={isPlaying ? "暂停" : label}
      title={isPlaying ? "暂停" : label}
    >
      {isPlaying ? "||" : "▶"}
    </button>
  );
}

function rotateOptions(options: string[], seed: number) {
  const uniqueOptions = Array.from(new Set(options.filter(Boolean)));
  if (uniqueOptions.length === 0) {
    return uniqueOptions;
  }

  const offset = seed % uniqueOptions.length;
  return [...uniqueOptions.slice(offset), ...uniqueOptions.slice(0, offset)];
}

function prepareQuestions(questions: ZhongkaoQuestion[]) {
  return questions.map((question, index) => ({
    ...question,
    options: rotateOptions(question.options, index + 1)
  }));
}

function HighlightedReading({
  paper,
  playingKey,
  onSpeak
}: {
  paper: ZhongkaoPaper;
  playingKey: string | null;
  onSpeak: SpeakHandler;
}) {
  const stopWords = new Set(["the", "and", "for", "from", "with", "around"]);
  const phraseWords = new Set(
    paper.phrases.flatMap((phrase) =>
      phrase.phrase
        .replace("sb", "")
        .split(/\s+/)
        .map((word) => word.toLowerCase())
        .filter((word) => word.length > 2 && !stopWords.has(word))
    )
  );
  const parts = paper.reading.split(/(\b[\w']+\b)/g);

  return (
    <p className="quiz-reading">
      {parts.map((part, index) => {
        const normalized = part.toLowerCase().replace(/'s$/, "");
        if (phraseWords.has(normalized)) {
          return (
            <strong className="readable-word" key={`${part}-${index}`}>
              {part}
            </strong>
          );
        }

        return part;
      })}
      <SpeakButton
        text={paper.reading}
        audioKey={`reading-${paper.id}`}
        isPlaying={playingKey === `reading-${paper.id}`}
        onSpeak={onSpeak}
        label="朗读整段短文"
      />
    </p>
  );
}

export function ZhongkaoQuizApp({ paper }: { paper: ZhongkaoPaper }) {
  const questions = useMemo(() => prepareQuestions(paper.questions), [paper.questions]);
  const [step, setStep] = useState<QuizStep>("review");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const { playingKey, speak } = useBrowserSpeech();

  const current = questions[currentIndex];
  const selected = answers[current.id];
  const answeredCount = Object.keys(answers).length;
  const correctCount = questions.filter((question) => answers[question.id] === question.answer).length;
  const wrongQuestions = questions.filter((question) => answers[question.id] && answers[question.id] !== question.answer);

  function chooseAnswer(question: ZhongkaoQuestion, answer: string) {
    setAnswers((previous) => ({ ...previous, [question.id]: answer }));
  }

  return (
    <main className="quiz-app compact-quiz">
      <section className="quiz-workspace">
        <div className="quiz-main-card">
          <div className="quiz-tabs" role="tablist" aria-label="中考练习步骤">
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
              <div className="question-meta">
                <span className="pill">{paper.level}</span>
                <span className="pill">{paper.focus}</span>
              </div>
              <div className="section-title-row">
                <h2>主题短文阅读</h2>
              </div>
              <HighlightedReading paper={paper} playingKey={playingKey} onSpeak={speak} />

              <div className="helper-note">
                <b>听读模仿</b>
                <span>{paper.speakingTask}</span>
              </div>

              <div className="review-word-grid phrase-grid">
                {paper.phrases.map((phrase, index) => (
                  <article key={phrase.phrase}>
                    <div className="word-card-head">
                      <b>{phrase.phrase}</b>
                      <SpeakButton
                        text={`${phrase.phrase}. ${phrase.example}`}
                        audioKey={`phrase-${paper.id}-${index}`}
                        isPlaying={playingKey === `phrase-${paper.id}-${index}`}
                        onSpeak={speak}
                        label={`朗读 ${phrase.phrase}`}
                      />
                    </div>
                    <span>{phrase.meaning}</span>
                    <p>{phrase.example}</p>
                    <small>{phrase.note}</small>
                  </article>
                ))}
              </div>

              <div className="grammar-box">
                <h3>语法小机关：{paper.grammarPoint.title}</h3>
                <p>{paper.grammarPoint.explanation}</p>
                <ul>
                  {paper.grammarPoint.examples.map((example) => (
                    <li key={example}>{example}</li>
                  ))}
                </ul>
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
                <span className="pill">{current.part}</span>
                <span className="pill">{current.type}</span>
                <span>
                  {currentIndex + 1} / {questions.length}
                </span>
              </div>
              <div className="section-title-row">
                <h2>{current.prompt}</h2>
                <SpeakButton
                  text={current.prompt}
                  audioKey={`question-${current.id}`}
                  isPlaying={playingKey === `question-${current.id}`}
                  onSpeak={speak}
                  label="朗读题目"
                />
              </div>
              <div className="judgement-note">
                <b>判断关键</b>
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
                      onClick={() => chooseAnswer(current, option)}
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
                  <p>
                    <span className="correct-answer">正确答案：</span>
                    {current.answer}
                  </p>
                  <p>
                    <span className="english-note">Explanation: </span>
                    {current.explanationEn}
                  </p>
                  <p>
                    <span className="chinese-note">讲解：</span>
                    {current.explanationZh}
                  </p>
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
                <p className="empty-state">目前还没有错题。做题后这里会显示需要复盘的地方。</p>
              ) : (
                <div className="mistake-list">
                  {wrongQuestions.map((question) => (
                    <article key={question.id}>
                      <span className="pill">{question.part}</span>
                      <span className="pill">{question.type}</span>
                      <h3>{question.prompt}</h3>
                      <p>
                        <span className="student-answer">你的答案：</span>
                        {answers[question.id]}
                      </p>
                      <p>
                        <span className="correct-answer">正确答案：</span>
                        {question.answer}
                      </p>
                      <p>
                        <span className="chinese-note">讲解：</span>
                        {question.explanationZh}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </section>
          ) : null}

          {step === "result" ? (
            <section className="quiz-stage result-stage">
              <h2>学习结果</h2>
              <div className="result-number">
                {correctCount}/{questions.length}
              </div>
              <p>
                已完成 {answeredCount} 题，错题 {wrongQuestions.length} 题。先把错题讲解看懂，比多刷一套更值。
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
            <h2>今日路线</h2>
            <ol className="rhythm-list">
              <li>
                <b>1</b>
                <span>读词块：先看意思，再听例句。</span>
              </li>
              <li>
                <b>2</b>
                <span>读短文：抓人物、时间、地点和原因。</span>
              </li>
              <li>
                <b>3</b>
                <span>看语法：只抓今天这一个小机关。</span>
              </li>
              <li>
                <b>4</b>
                <span>{paper.writingPrompt}</span>
              </li>
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
