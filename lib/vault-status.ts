import { papers, TARGET_PAPER_COUNT, WORDS_PER_PAPER } from "./papers";

export function getVaultStatus() {
  const usedWords = papers.flatMap((paper) => paper.words);
  const remainingPapers = TARGET_PAPER_COUNT - papers.length;

  return {
    targetPaperCount: TARGET_PAPER_COUNT,
    wordsPerPaper: WORDS_PER_PAPER,
    currentPaperCount: papers.length,
    usedWordCount: usedWords.length,
    targetWordCount: TARGET_PAPER_COUNT * WORDS_PER_PAPER,
    remainingPapers,
    remainingWordSlots: remainingPapers * WORDS_PER_PAPER
  };
}
