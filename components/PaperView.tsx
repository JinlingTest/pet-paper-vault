import type { Paper } from "@/lib/papers";

function HighlightedReading({ paper }: { paper: Paper }) {
  const words = new Set(paper.words.map((item) => item.word.toLowerCase()));
  const parts = paper.reading.split(/(\b[\w']+\b)/g);

  return (
    <p className="reading">
      {parts.map((part, index) => {
        const normalized = part.toLowerCase().replace(/'s$/, "");
        if (words.has(normalized)) {
          return (
            <strong className="keyword" key={`${part}-${index}`}>
              {part}
            </strong>
          );
        }

        return part;
      })}
    </p>
  );
}

export function StudentPaper({ paper }: { paper: Paper }) {
  return (
    <main className="page">
      <h1>{paper.title}</h1>
      <p className="muted">
        Version: {paper.version} | Date: {paper.date} | Level: B1 Preliminary / PET
      </p>
      <div className="meta">
        <span>Name: <span className="line" /></span>
        <span>Date: <span className="line" /></span>
        <span>Score: <span className="line" /></span>
      </div>

      <h2>Part 1: Key Words</h2>
      <ul className="word-grid">
        {paper.words.map((word, index) => (
          <li key={word.word}>
            {index + 1}. {word.word} {word.phonetic ? <span className="phonetic">{word.phonetic}</span> : null} - {word.meaning}
          </li>
        ))}
      </ul>

      <h2>Part 2: Reading</h2>
      <HighlightedReading paper={paper} />

      <h2>Part 3: Comprehension Questions</h2>
      <ol className="question compact">
        {paper.questions.map((item) => (
          <li key={item.question}>
            {item.question}
            <span className="answer-space" />
          </li>
        ))}
      </ol>

      <h2>Part 4: Word Study</h2>
      {paper.wordStudy.map((study) => (
        <section key={study.word}>
          <h3>{study.word}</h3>
          <p>Collocations: {study.collocations.join(", ")}</p>
          <p>Similar words: {study.similar.join(", ")}</p>
          <p className="muted">{study.note}</p>
        </section>
      ))}

      <h2>Part 5: Fill in the Blanks</h2>
      <p className="bank">Word bank: {paper.words.map((word) => word.word).join(" / ")}</p>
      <ol className="question compact">
        {paper.blanks.map((blank, index) => (
          <li key={`${blank.answer}-${index}`}>
            {blank.sentenceBefore} <span className="line" /> {blank.sentenceAfter}
          </li>
        ))}
      </ol>

      <h2>Part 6: Correct the Mistakes</h2>
      <ol className="question compact">
        {paper.corrections.map((correction) => (
          <li key={correction.prompt}>
            {correction.prompt}
            <span className="answer-space" />
          </li>
        ))}
      </ol>

      <h2>Part 7: Creative Extension</h2>
      <p>{paper.creativePrompt}</p>
      <span className="answer-space" />
      <span className="answer-space" />
    </main>
  );
}

export function AnswerKey({ paper }: { paper: Paper }) {
  return (
    <section className="page">
      <h1>Answer Key</h1>

      <h2>Part 3: Comprehension Questions</h2>
      <ol className="compact">
        {paper.questions.map((item) => (
          <li key={item.question}>{item.answer}</li>
        ))}
      </ol>

      <h2>Part 5: Fill in the Blanks</h2>
      <table>
        <tbody>
          <tr>
            <th>Number</th>
            <th>Answer</th>
          </tr>
          {paper.blanks.map((blank, index) => (
            <tr key={`${blank.answer}-${index}`}>
              <td>{index + 1}</td>
              <td>{blank.answer}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Part 6: Correct the Mistakes</h2>
      <ol className="compact">
        {paper.corrections.map((correction) => (
          <li key={correction.prompt}>
            <span className="correct-answer">{correction.answer}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function StudentMistakes({ paper }: { paper: Paper }) {
  return (
    <section className="page">
      <h1>Student Sample With Mistakes</h1>
      <p className="muted">This page simulates a student's answers. Some answers are wrong or unnatural.</p>

      <h2>Part 3: Comprehension Questions</h2>
      <ol className="compact">
        {paper.questions.map((item) => (
          <li key={item.question}>
            {item.question}
            <br />
            <span className="student-answer">{item.studentAnswer}</span>
          </li>
        ))}
      </ol>

      <h2>Part 5: Fill in the Blanks</h2>
      <table>
        <tbody>
          <tr>
            <th>Number</th>
            <th>Student answer</th>
          </tr>
          {paper.blanks.map((blank, index) => (
            <tr key={`${blank.studentAnswer}-${index}`}>
              <td>{index + 1}</td>
              <td><span className="student-answer">{blank.studentAnswer}</span></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Part 6: Correct the Mistakes</h2>
      <ol className="compact">
        {paper.corrections.map((correction) => (
          <li key={correction.prompt}>
            <span className="student-answer">{correction.studentAnswer}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function TeacherReview({ paper }: { paper: Paper }) {
  return (
    <section className="page">
      <h1>Error Review and Explanation / 错题讲解</h1>

      <h2>Part 3: Comprehension / 阅读理解</h2>
      {paper.questions.map((item, index) => (
        <section key={item.question}>
          <p>
            <strong>Q{index + 1}</strong> Student answer / 学生答案:{" "}
            <span className="student-answer">{item.studentAnswer}</span>
          </p>
          <p className="explain">
            <span className="tag">{item.tag}</span>
            <span className="english-note">Problem:</span> {item.explanationEn}
            <br />
            <span className="chinese-note">问题：</span>{item.explanationZh}
            <br />
            Correct / 正确答案: <span className="correct-answer">{item.answer}</span>
          </p>
        </section>
      ))}

      <h2>Part 5: Fill in the Blanks / 选词填空</h2>
      <table>
        <tbody>
          <tr>
            <th>Number</th>
            <th>Student answer<br />学生答案</th>
            <th>Correct answer<br />正确答案</th>
            <th>Why / 讲解</th>
          </tr>
          {paper.blanks.map((blank, index) => (
            <tr key={`${blank.answer}-${index}`}>
              <td>{index + 1}</td>
              <td><span className="student-answer">{blank.studentAnswer}</span></td>
              <td><span className="correct-answer">{blank.answer}</span></td>
              <td>
                <span className="english-note">{blank.explanationEn}</span>
                <br />
                <span className="chinese-note">{blank.explanationZh}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Part 6: Correct the Mistakes / 改错</h2>
      <ol className="compact">
        {paper.corrections.map((correction) => (
          <li key={correction.prompt}>
            <span className="correct-answer">{correction.answer}</span>
            <p className="explain">
              <span className="tag">{correction.tag}</span>
              <span className="english-note">{correction.explanationEn}</span>
              <br />
              <span className="chinese-note">{correction.explanationZh}</span>
            </p>
          </li>
        ))}
      </ol>

      <h2>More Example Sentences / 更多例句</h2>
      <ul className="compact">
        {paper.examples.map((example) => (
          <li key={example.en}>
            <span className="english-note">{example.en}</span>
            <br />
            <span className="chinese-note">{example.zh}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function FullPaper({ paper }: { paper: Paper }) {
  return (
    <>
      <StudentPaper paper={paper} />
      <AnswerKey paper={paper} />
      <StudentMistakes paper={paper} />
      <TeacherReview paper={paper} />
    </>
  );
}
