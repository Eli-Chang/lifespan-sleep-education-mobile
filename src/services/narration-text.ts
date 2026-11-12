// Pure narration text helpers (no Expo imports) so they can be unit tested in Node.

export const splitNarration = (text: string, max = 700) => {
  const paragraphs = text.split(/\n{2,}/).map((value) => value.trim()).filter(Boolean);
  const sections = paragraphs.length ? paragraphs : [text];
  return sections.flatMap((section) => {
    const sentences = section.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [section];
    return sentences.reduce<string[]>((result, sentence) => {
      const last = result[result.length - 1];
      if (last && `${last} ${sentence}`.length <= max) result[result.length - 1] = `${last} ${sentence}`.trim();
      else result.push(sentence.trim());
      return result;
    }, []);
  });
};
