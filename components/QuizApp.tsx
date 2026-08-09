"use client";

import { useMemo, useState } from "react";
import type { Paper } from "@/lib/papers";

type QuizQuestion = {
  id: string;
  type: string;
  prompt: string;
  answer: string;
  options: string[];
  explanationEn: string;
  explanationZh: string;
};

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

export function QuizApp({ paper }: { paper: Paper }) {
  const questions = useMemo(() => makeQuizQuestions(paper), [paper]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const current = questions[currentIndex];
  const selected = answers[current.id];
  const answeredCount = Object.keys(answers).length;
  const correctCount = questions.filter((question) => answers[question.id] === question.answer).length;
  const progress = Math.round((answeredCount / questions.length) * 100);

  return (
    <main className="quiz-app">
      <section className="quiz-hero">
        <div>
          <p className="muted">Paper {paper.id} | {paper.topic}</p>
          <h1>PET 词汇答题小程序</h1>
          <p>每份 10 个单词，混合词义选择、语境填空和阅读理解。答完立刻看中英文讲解。</p>
        </div>
        <div className="score-card">
          <span>当前得分</span>
          <strong>{correctCount}/{questions.length}</strong>
          <div className="progress"><span style={{ width: `${progress}%` }} /></div>
        </div>
      </section>

      <section className="quiz-layout">
        <div className="quiz-panel">
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
              disabled={currentIndex === questions.length - 1}
              onClick={() => setCurrentIndex((index) => Math.min(questions.length - 1, index + 1))}
            >
              下一题
            </button>
          </div>
        </div>

        <aside className="quiz-side">
          <h2>今日 10 词</h2>
          <div className="mini-word-list">
            {paper.words.map((word) => (
              <button
                key={word.word}
                type="button"
                onClick={() => {
                  const target = questions.findIndex((question) => question.id === `word-${word.word}`);
                  if (target >= 0) {
                    setCurrentIndex(target);
                  }
                }}
              >
                <b>{word.word}</b>
                <span>{word.meaning}</span>
              </button>
            ))}
          </div>

          <h2>答题导航</h2>
          <div className="question-dots">
            {questions.map((question, index) => (
              <button
                className={`${index === currentIndex ? "active" : ""} ${answers[question.id] === question.answer ? "done" : ""}`}
                key={question.id}
                type="button"
                onClick={() => setCurrentIndex(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
