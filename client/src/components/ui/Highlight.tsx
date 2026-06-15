interface HighlightProps {
  text: string;
  query: string;
}

const escapeRegExp = (string: string) =>
  string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export default function Highlight({ text, query }: HighlightProps) {
  if (typeof text !== "string" || !text) {
    return <>{text ?? ""}</>;
  }

  if (!query.trim()) return <>{text}</>;

  const safeQuery = escapeRegExp(query);
  const regex = new RegExp(safeQuery, "gi");
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;

  text.replace(regex, (match, offset) => {
    if (offset > lastIndex) {
      elements.push(text.slice(lastIndex, offset));
    }

    elements.push(
      <mark key={offset} style={{ backgroundColor: "yellow" }}>
        {match}
      </mark>,
    );

    lastIndex = offset + match.length;
    return match;
  });

  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return elements;
}
