import type { ZhongkaoPaper, ZhongkaoQuestion } from "@/lib/zhongkao-papers";

function sampleWrongAnswer(question: ZhongkaoQuestion) {
  return question.options.find((option) => option !== question.answer) ?? "I am not sure.";
}

function HighlightedReading({ paper }: { paper: ZhongkaoPaper }) {
  const phraseWords = new Set(
    paper.phrases.flatMap((phrase) =>
      phrase.phrase
        .replace("sb", "")
        .split(/\s+/)
        .map((word) => word.toLowerCase())
        .filter((word) => word.length > 2 && !["the", "and", "for", "from", "with", "around"].includes(word))
    )
  );
  const parts = paper.reading.split(/(\b[\w']+\b)/g);

  return (
    <p className="reading">
      {parts.map((part, index) => {
        const normalized = part.toLowerCase().replace(/'s$/, "");
        if (phraseWords.has(normalized)) {
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

export function ZhongkaoStudentPaper({ paper }: { paper: ZhongkaoPaper }) {
  return (
    <main className="page">
      <h1>{paper.title}</h1>
      <p className="muted">
        Date: {paper.date} | Level: {paper.level} | Focus: {paper.focus}
      </p>
      <div className="meta">
        <span>Name: <span className="line" /></span>
        <span>Date: <span className="line" /></span>
        <span>Score: <span className="line" /></span>
      </div>

      <h2>Part 1: ??????</h2>
      <ul className="word-grid">
        {paper.phrases.map((phrase, index) => (
          <li key={phrase.phrase}>
            {index + 1}. {phrase.phrase} - {phrase.meaning}
            <br />
            <span className="muted">{phrase.example}</span>
          </li>
        ))}
      </ul>

      <h2>Part 2: ????</h2>
      <p className="bank">{paper.speakingTask}</p>

      <h2>Part 3: ??????</h2>
      <HighlightedReading paper={paper} />

      <h2>Part 4: ?????</h2>
      <section>
        <h3>{paper.grammarPoint.title}</h3>
        <p>{paper.grammarPoint.explanation}</p>
        <ul className="compact">
          {paper.grammarPoint.examples.map((example) => (
            <li key={example}>{example}</li>
          ))}
        </ul>
      </section>

      <h2>Part 5: ?? / ?? / ????</h2>
      <ol className="question compact">
        {paper.questions.map((question) => (
          <li key={question.id}>
            <strong>{question.type}</strong> {question.prompt}
            <div className="option-lines">
              {question.options.map((option) => (
                <span key={option}>? {option}</span>
              ))}
            </div>
          </li>
        ))}
      </ol>

      <h2>Part 6: ???</h2>
      <p>{paper.writingPrompt}</p>
      <span className="answer-space" />
      <span className="answer-space" />
    </main>
  );
}

export function ZhongkaoAnswerKey({ paper }: { paper: ZhongkaoPaper }) {
  return (
    <section className="page">
      <h1>??? / Answer Key</h1>
      <table>
        <tbody>
          <tr>
            <th>Number</th>
            <th>Part</th>
            <th>Answer</th>
          </tr>
          {paper.questions.map((question, index) => (
            <tr key={question.id}>
              <td>{index + 1}</td>
              <td>{question.part}</td>
              <td><span className="correct-answer">{question.answer}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export function ZhongkaoStudentMistakes({ paper }: { paper: ZhongkaoPaper }) {
  return (
    <section className="page">
      <h1>?????? / Student Sample With Mistakes</h1>
      <p className="muted">???????????????????????</p>
      <ol className="compact">
        {paper.questions.map((question, index) => (
          <li key={question.id}>
            <strong>Q{index + 1}</strong> {question.prompt}
            <br />
            <span className="student-answer">Student answer: {sampleWrongAnswer(question)}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function ZhongkaoTeacherReview({ paper }: { paper: ZhongkaoPaper }) {
  return (
    <section className="page">
      <h1>???? / Error Review</h1>
      {paper.questions.map((question, index) => (
        <section key={question.id}>
          <h2>
            Q{index + 1}: {question.type}
          </h2>
          <p>
            <span className="student-answer">?????</span>
            {sampleWrongAnswer(question)}
          </p>
          <p className="explain">
            <span className="tag">{question.part}</span>
            <span className="chinese-note">?????</span>
            {question.judgementZh}
            <br />
            <span className="english-note">Explanation: </span>
            {question.explanationEn}
            <br />
            <span className="chinese-note">?????</span>
            {question.explanationZh}
            <br />
            Correct answer: <span className="correct-answer">{question.answer}</span>
          </p>
        </section>
      ))}
    </section>
  );
}

export function ZhongkaoFullPaper({ paper }: { paper: ZhongkaoPaper }) {
  return (
    <>
      <ZhongkaoStudentPaper paper={paper} />
      <ZhongkaoAnswerKey paper={paper} />
      <ZhongkaoStudentMistakes paper={paper} />
      <ZhongkaoTeacherReview paper={paper} />
    </>
  );
}