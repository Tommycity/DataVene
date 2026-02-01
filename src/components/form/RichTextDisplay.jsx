const RichTextDisplay = ({
  content,
  maxLength = null,
  preview = false,
  textColor = "#1f2937",
}) => {
  // Strip HTML tags to get plain text
  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  // If preview mode, show plain text with character limit
  if (preview) {
    const plainText = stripHtml(content);
    const displayText = maxLength ? plainText.slice(0, maxLength) : plainText;
    const hasMore = maxLength && plainText.length > maxLength;

    return (
      <div className="leading-relaxed" style={{ color: textColor }}>
        {displayText}
        {hasMore && "..."}
      </div>
    );
  }

  // Full content mode - render HTML with proper styling for lists
  return (
    <div
      className="prose prose-sm max-w-none leading-relaxed
        [&_ul]:list-disc [&_ul]:ml-6 [&_ul_li]:ml-2
        [&_ol]:list-decimal [&_ol]:ml-6 [&_ol_li]:ml-2
        [&_p]:my-2 [&_h1]:my-3 [&_h2]:my-3 [&_h3]:my-2
        [&_strong]:font-bold [&_em]:italic"
      style={{ color: textColor }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default RichTextDisplay;
