import Link from "next/link";
import { papers } from "@/lib/papers";
import { getVaultStatus } from "@/lib/vault-status";

export default function Home() {
  const status = getVaultStatus();

  return (
    <main className="shell">
      <div className="topbar">
        <div className="brand">
          <h1>PET Paper Vault</h1>
          <p>Next.js 架构版：每份 10 个 PET/B1 单词，支持扩展到 300+ 份卷子。</p>
        </div>
        <div className="button-row">
          <Link className="button primary" href="/papers/001">
            打开第 1 份
          </Link>
          <Link className="button" href="/papers/002">
            打开最新卷
          </Link>
        </div>
      </div>

      <section className="stats" aria-label="Vault status">
        <div className="stat">
          <strong>{status.currentPaperCount}</strong>
          <span>已录入卷子</span>
        </div>
        <div className="stat">
          <strong>{status.usedWordCount}</strong>
          <span>已记录单词</span>
        </div>
        <div className="stat">
          <strong>{status.targetPaperCount}</strong>
          <span>目标卷子容量</span>
        </div>
        <div className="stat">
          <strong>{status.remainingWordSlots}</strong>
          <span>剩余词位</span>
        </div>
      </section>

      <section className="paper-list">
        {papers.map((paper) => (
          <Link className="paper-card" href={`/papers/${paper.id}`} key={paper.id}>
            <h2>
              Paper {paper.id}: {paper.topic}
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
