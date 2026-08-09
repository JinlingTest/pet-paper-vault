import Link from "next/link";

export default function Home() {
  return (
    <main className="shell home-shell">
      <div className="topbar">
        <div className="brand">
          <h1>金子恒英语自测专用</h1>
          <p>两个英语练习模块：一个面向 PET/B1，一个面向南京初一中考衔接。</p>
        </div>
      </div>

      <section className="program-grid home-program-grid" aria-label="Program choices">
        <Link className="program-card primary-card" href="/zhongkao">
          <span className="pill">中考衔接</span>
          <h2>中考英语模块</h2>
          <p>初一衔接难度：主题词块、听读模仿、短文阅读、语法小机关、打印试卷、模拟错题和在线答题。</p>
        </Link>
        <Link className="program-card" href="/b1">
          <span className="pill">PET/B1</span>
          <h2>B1 词汇模块</h2>
          <p>保留现有 PET/B1 路线：10 词一卷、阅读语篇、词汇运用、改错、打印讲解和在线自测。</p>
        </Link>
      </section>
    </main>
  );
}