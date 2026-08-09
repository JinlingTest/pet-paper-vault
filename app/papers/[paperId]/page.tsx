import Link from "next/link";
import { notFound } from "next/navigation";
import { PaperModeSwitcher } from "@/components/PaperModeSwitcher";
import { getNextPaperId, getPaper, getPreviousPaperId, papers } from "@/lib/papers";

type PageProps = {
  params: Promise<{ paperId: string }>;
};

export function generateStaticParams() {
  return papers.map((paper) => ({ paperId: paper.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { paperId } = await params;
  const paper = getPaper(paperId);

  return {
    title: paper ? `PET Paper ${paper.id} - ${paper.topic}` : "PET Paper"
  };
}

export default async function PaperPage({ params }: PageProps) {
  const { paperId } = await params;
  const paper = getPaper(paperId);

  if (!paper) {
    notFound();
  }

  const previousId = getPreviousPaperId(paper.id);
  const nextId = getNextPaperId(paper.id);

  return (
    <>
      <nav className="screen-only topbar">
        <div className="brand">
          <h1>
            Paper {paper.id}: {paper.topic}
          </h1>
          <p>保留打印试卷界面，并可切换到词汇答题小程序。</p>
        </div>
        <div className="button-row">
          <Link className="button" href="/">
            返回库藏
          </Link>
          {previousId ? (
            <Link className="button" href={`/papers/${previousId}`}>
              上一份
            </Link>
          ) : null}
          {nextId ? (
            <Link className="button" href={`/papers/${nextId}`}>
              下一份
            </Link>
          ) : null}
        </div>
      </nav>
      <PaperModeSwitcher paper={paper} />
    </>
  );
}
