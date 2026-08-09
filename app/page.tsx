import Link from "next/link";
import { papers } from "@/lib/papers";
import { getVaultStatus } from "@/lib/vault-status";
import { zhongkaoPapers } from "@/lib/zhongkao-papers";

const topicZh: Record<string, string> = {
  "001": "旅行与日常生活",
  "002": "环境与日常选择",
  "003": "健康与看医生"
};

export default function Home() {
  const status = getVaultStatus();
  const latestPaper = papers[papers.length - 1];
  const latestZhongkaoPaper = zhongkaoPapers[zhongkaoPapers.length - 1];

  return (
    <main className="shell">
      <div className="topbar">
        <div className="brand">
          <h1>金子恒英语自测专用</h1>
          <p>保留 PET/B1 词汇程序，并新增面向南京初一衔接的中考英语练习。</p>
        </div>
        <div className="button-row">
          <Link className="button primary" href="/zhongkao">
            中考衔接练习
          </Link>
          <Link className="button" href={`/papers/${latestPaper.id}`}>
            PET 最新卷
          </Link>
        </div>
      </div>

      <section className="program-grid" aria-label="Program choices">
        <Link className="program-card primary-card" href={`/zhongkao/papers/${latestZhongkaoPaper.id}`}>
          <span className="pill">新模块</span>
          <h2>中考英语衔接程序</h2>
          <p>给 9 月升初一的南京学生：词块引入、听读模仿、短文阅读、语法小机关、错题复盘。</p>
        </Link>
        <Link className="program-card" href={`/papers/${latestPaper.id}`}>
          <span className="pill">PET/B1</span>
          <h2>PET 词汇自测程序</h2>
          <p>继续使用现有 10 词一卷的 PET/B1 练习、打印和讲解流程。</p>
        </Link>
      </section>

      <section className="stats" aria-label="PET vault status">
        <div className="stat">
          <strong>{status.currentPaperCount}</strong>
          <span>PET 已录入卷子</span>
        </div>
        <div className="stat">
          <strong>{status.usedWordCount}</strong>
          <span>PET 已记录单词</span>
        </div>
        <div className="stat">
          <strong>{zhongkaoPapers.length}</strong>
          <span>中考衔接练习</span>
        </div>
        <div className="stat">
          <strong>{status.targetPaperCount}</strong>
          <span>PET 目标卷子容量</span>
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
