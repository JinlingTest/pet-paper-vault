import Link from "next/link";
import { papers } from "@/lib/papers";
import { getVaultStatus } from "@/lib/vault-status";

const topicZh: Record<string, string> = {
  "001": "???????",
  "002": "???????",
  "003": "??????"
};

export const metadata = {
  title: "PET/B1 ??????"
};

export default function B1Home() {
  const status = getVaultStatus();
  const latestPaper = papers[papers.length - 1];

  return (
    <main className="shell">
      <div className="topbar">
        <div className="brand">
          <h1>PET/B1 ??????</h1>
          <p>10 ??????????????????????????????????</p>
        </div>
        <div className="button-row">
          <Link className="button" href="/">
            ????
          </Link>
          <Link className="button primary" href={`/papers/${latestPaper.id}`}>
            ?????
          </Link>
        </div>
      </div>

      <section className="stats" aria-label="PET vault status">
        <div className="stat">
          <strong>{status.currentPaperCount}</strong>
          <span>?????</span>
        </div>
        <div className="stat">
          <strong>{status.usedWordCount}</strong>
          <span>?????</span>
        </div>
        <div className="stat">
          <strong>{status.targetPaperCount}</strong>
          <span>??????</span>
        </div>
        <div className="stat">
          <strong>{status.remainingWordSlots}</strong>
          <span>????</span>
        </div>
      </section>

      <section className="paper-list">
        {papers.map((paper) => (
          <Link className="paper-card" href={`/papers/${paper.id}`} key={paper.id}>
            <h2>
              PET Paper {paper.id}: {paper.topic} / {topicZh[paper.id] ?? paper.topic}
            </h2>
            <p className="muted">
              {paper.version} | {paper.date} | {paper.words.length} words
            </p>
            <div className="chips">
              {paper.words.map((word) => (
                <span className="chip" key={word.word}>
                  {word.word}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}