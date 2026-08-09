"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Paper, VocabWord } from "@/lib/papers";

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

type SpeakHandler = (key: string, text: string, audioUrl?: string) => void;

function useAudioPlayer() {
  const activeAudio = useRef<HTMLAudioElement | null>(null);
  const [playingKey, setPlayingKey] = useState<string | null>(null);

  const stopAudio = useCallback(() => {
    activeAudio.current?.pause();
    activeAudio.current = null;
    setPlayingKey(null);

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const speakWithBrowser = useCallback((text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.82;
    window.speechSynthesis.speak(utterance);
  }, []);

  const toggleSpeak = useCallback<SpeakHandler>(
    (key, text, audioUrl) => {
      if (playingKey === key) {
        stopAudio();
        return;
      }

      stopAudio();

      if (!audioUrl) {
        speakWithBrowser(text);
        return;
      }

      const audio = new Audio(audioUrl);
      activeAudio.current = audio;
      setPlayingKey(key);

      audio.addEventListener("ended", () => {
        if (activeAudio.current === audio) {
          activeAudio.current = null;
          setPlayingKey(null);
        }
      });

      audio.play().catch(() => {
        if (activeAudio.current === audio) {
          activeAudio.current = null;
          setPlayingKey(null);
        }
        speakWithBrowser(text);
      });
    },
    [playingKey, speakWithBrowser, stopAudio]
  );

  useEffect(() => stopAudio, [stopAudio]);

  return { playingKey, toggleSpeak };
}

function SpeakButton({
  text,
  audioUrl,
  audioKey,
  isPlaying,
  onSpeak,
  label = "朗读"
}: {
  text: string;
  audioUrl?: string;
  audioKey: string;
  isPlaying: boolean;
  onSpeak: SpeakHandler;
  label?: string;
}) {
  const buttonLabel = isPlaying ? "暂停" : label;

  return (
    <button
      className={`speak-button ${isPlaying ? "is-playing" : ""}`}
      type="button"
      onClick={() => onSpeak(audioKey, text, audioUrl)}
      aria-label={buttonLabel}
      title={buttonLabel}
    >
      {isPlaying ? "⏸" : "🔊"}
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

function HighlightedMaterial({
  paper,
  playingKey,
  onSpeak
}: {
  paper: Paper;
  playingKey: string | null;
  onSpeak: SpeakHandler;
}) {
  const wordMap = new Map(paper.words.map((word) => [word.word.toLowerCase(), word]));
  const parts = paper.reading.split(/(\b[\w']+\b)/g);

  return (
    <p className="quiz-reading">
      {parts.map((part, index) => {
        const normalized = part.toLowerCase().replace(/'s$/, "");
        const word = wordMap.get(normalized);
        if (word) {
          return (
            <span className="readable-word" key={`${part}-${index}`}>
              <strong>{part}</strong>
              <SpeakButton
                text={word.word}
                audioUrl={word.audioUrl}
                audioKey={`inline-${paper.id}-${word.word}`}
                isPlaying={playingKey === `inline-${paper.id}-${word.word}`}
                onSpeak={onSpeak}
                label={`朗读 ${word.word}`}
              />
            </span>
          );
        }

        return part;
      })}
    </p>
  );
}

function WordCard({
  paperId,
  word,
  playingKey,
  onSpeak
}: {
  paperId: string;
  word: VocabWord;
  playingKey: string | null;
  onSpeak: SpeakHandler;
}) {
  const audioKey = `card-${paperId}-${word.word}`;

  return (
    <article>
      <div className="word-card-head">
        <b>{word.word}</b>
        <SpeakButton
          text={word.word}
          audioUrl={word.audioUrl}
          audioKey={audioKey}
          isPlaying={playingKey === audioKey}
          onSpeak={onSpeak}
          label={`朗读 ${word.word}`}
        />
      </div>
      {word.phonetic ? <span className="phonetic">{word.phonetic}</span> : null}
      <span>{word.meaning}</span>
    </article>
  );
}

export function QuizApp({
  paper,
  onScoreChange
}: {
  paper: Paper;
  onScoreChange?: (score: { correct: number; answered: number }) => void;
}) {
  const questions = useMemo(() => makeQuizQuestions(paper), [paper]);
  const [step, setStep] = useState<QuizStep>("review");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const { playingKey, toggleSpeak } = useAudioPlayer();

  const current = questions[currentIndex];
  const selected = answers[current.id];
  const answeredCount = Object.keys(answers).length;
  const correctCount = questions.filter((question) => answers[question.id] === question.answer).length;
  const wrongQuestions = questions.filter((question) => answers[question.id] && answers[question.id] !== question.answer);

  useEffect(() => {
    onScoreChange?.({ correct: correctCount, answered: answeredCount });
  }, [answeredCount, correctCount, onScoreChange]);

  return (
    <main className="quiz-app compact-quiz">
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
              <div className="section-title-row">
                <h2>先读材料 / Read First</h2>
                <SpeakButton
                  text={paper.reading}
                  audioUrl={paper.readingAudioUrl}
                  audioKey={`reading-${paper.id}`}
                  isPlaying={playingKey === `reading-${paper.id}`}
                  onSpeak={toggleSpeak}
                  label="朗读整段材料"
                />
              </div>
              <HighlightedMaterial paper={paper} playingKey={playingKey} onSpeak={toggleSpeak} />

              <div className="helper-note">
                <b>Reading help / 阅读帮助</b>
                <span>Tap 🔊 to hear a word or the whole passage. Blue words are today's key words.</span>
                <span>点击 🔊 可以听单词或整段材料。蓝色词是今天的关键词。</span>
              </div>

              <div className="review-word-grid">
                {paper.words.map((word) => (
                  <WordCard key={word.word} paperId={paper.id} word={word} playingKey={playingKey} onSpeak={toggleSpeak} />
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
              <div className="section-title-row">
                <h2>{current.prompt}</h2>
                <SpeakButton
                  text={current.prompt}
                  audioKey={`question-${current.id}`}
                  isPlaying={playingKey === `question-${current.id}`}
                  onSpeak={toggleSpeak}
                  label="朗读题目"
                />
              </div>
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
                      <div className="section-title-row">
                        <h3>{question.prompt}</h3>
                        <SpeakButton
                          text={question.prompt}
                          audioKey={`mistake-${question.id}`}
                          isPlaying={playingKey === `mistake-${question.id}`}
                          onSpeak={toggleSpeak}
                          label="朗读错题题目"
                        />
                      </div>
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
              <li><b>1</b><span>Listen and read. 先听再读，圈出关键词。</span></li>
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
