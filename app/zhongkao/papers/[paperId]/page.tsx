import Link from "next/link";
import { notFound } from "next/navigation";
import { ZhongkaoPaperModeSwitcher } from "@/components/ZhongkaoPaperModeSwitcher";
import {
  getNextZhongkaoPaperId,
  getPreviousZhongkaoPaperId,
  getZhongkaoPaper,
  zhongkaoPapers
} from "@/lib/zhongkao-papers";

type PageProps = {
  params: Promise<{ paperId: string }>;
};

export function generateStaticParams() {
  return zhongkaoPapers.map((paper) => ({ paperId: paper.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { paperId } = await params;
  const paper = getZhongkaoPaper(paperId);

  return {
    title: paper ? `${paper.title} - ??????` : "????????"
  };
}

export default async function ZhongkaoPaperPage({ params }: PageProps) {
  const { paperId } = await params;
  const paper = getZhongkaoPaper(paperId);

  if (!paper) {
    notFound();
  }

  const previousId = getPreviousZhongkaoPaperId(paper.id);
  const nextId = getNextZhongkaoPaperId(paper.id);

  return (
    <>
      <nav className="screen-only topbar">
        <div className="brand">
          <h1>{paper.title}</h1>
          <p>{paper.focus}</p>
        </div>
        <div className="button-row">
          <Link className="button" href="/zhongkao">
            ??????
          </Link>
          {previousId ? (
            <Link className="button" href={`/zhongkao/papers/${previousId}`}>
              ???
            </Link>
          ) : null}
          {nextId ? (
            <Link className="button" href={`/zhongkao/papers/${nextId}`}>
              ???
            </Link>
          ) : null}
        </div>
      </nav>
      <ZhongkaoPaperModeSwitcher paper={paper} />
    </>
  );
}