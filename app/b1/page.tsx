import Link from "next/link";
import { papers } from "@/lib/papers";
import { getVaultStatus } from "@/lib/vault-status";

const topicZh: Record<string, string> = {
  "001": "旅行与日常生活",
  "002": "环境与日常选择",
  "003": "健康与看医生"
};

export const metadata = {
  title: "PET/B1 英语词汇自测"
};

export default function B1Home() {
  const status = getVaultStatus();
  const latestPaper = papers[papers.length - 1];

  return (
    <main className="shell">
      <div className="topbar">
        <div className="brand">
          <h1>PET/B1 英语词汇自测</h1>
          <p>10 个词进入一篇短文，保留打印试卷、答案、模拟错题、教师讲解和在线答题。</p>
        </div>
        <div className="button-row">
          <Link className="button" href="/">
            返回主页
          </Link>
          <Link className="button primary" href={`/papers/${latestPaper.id}`}>
            打开最新卷
          </Link>
        </div>
      </div>

      <section className="stats" aria-label="PET vault status">
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