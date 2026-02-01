/**
 * Highlights the search query text within the title
 * @param {string} title - The full title text
 * @param {string} searchQuery - The search query to highlight
 * @param {string} highlightColor - The color to apply (default: #3B82F6 - blue)
 * @returns {JSX.Element}
 */
export const HighlightSearchMatch = ({
  title,
  searchQuery,
  highlightColor = "#3B82F6",
}) => {
  if (!title || !searchQuery) return <span>{title}</span>;

  const regex = new RegExp(`(${searchQuery})`, "gi");
  const parts = title.split(regex);

  return (
    <span>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <span
            key={index}
            style={{ color: highlightColor, fontWeight: "bold" }}
          >
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </span>
  );
};
