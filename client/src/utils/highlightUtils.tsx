export const highlightTerm = (term: string, search: string) => {
  if (!search) return term; // If no search term is provided, return the title as is.

  const regex = new RegExp(`(${search})`, "gi"); // The 'i' flag is for case-insensitive matching.
  const parts = term.split(regex);

  return (
    <>
      {parts.map((part: string, index: number) =>
        regex.test(part) ? (
          <span key={index} className="bg-yellow-300">
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
};
