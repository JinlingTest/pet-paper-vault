import Link from "next/link";
import { zhongkaoPapers } from "@/lib/zhongkao-papers";

export const metadata = {
  title: "中考英语衔接练习"
};

export default function ZhongkaoHome() {
  const latestPaper = zhongkaoPapers[zhongkaoPapers.length - 1];

  return (
    <main className="shell">
      <div className="topbar">
        <div className="brand">
          <h1>中考英语衔接练习</h1>
          <p>面向 9 月升初一的南京学生：用词块、听读、短文和错题复盘提前养成中考能力。</p>
        </div>
        <div className="button-row">
          <Link className="button" href="/">
            返回总目录
          </Link>
          <Link className="button primary" href={`/zhongkao/papers/${latestPaper.id}`}>
            打开最新练习
          </Link>
        </div>
      </div>

      <section className="program-card">
        <h2>第一版练习结构</h2>
        <p>每天 15-25 分钟：8 个主题词块、1 篇短文、1 个语法小机关、6 道小题、1 个朗读任务、1 个小写作提示。</p>
      </section>

      <section className="paper-list">
        {zhongkaoPapers.map((paper) => (
          <Link className="paper-card" href={`/zhongkao/papers/${paper.id}`} key={paper.id}>
            <h2>{paper.title}</h2>
            <p className="muted">
              {paper.date} | {paper.level}
            </p>
            <div className="chips">
              {paper.phrases.map((phrase) => (
                <span className="chip" key={phrase.phrase}>
                  {phrase.phrase}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
