import Link from "next/link";
import { notFound } from "next/navigation";
import { FullPaper } from "@/components/PaperView";
import { PrintButton } from "@/components/PrintButton";
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
          <p>打印时会自动只保留卷子内容。</p>
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
          <PrintButton />
        </div>
      </nav>
      <FullPaper paper={paper} />
    </>
  );
}
