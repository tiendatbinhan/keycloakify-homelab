import { useGetQuote } from "../hooks/useGetQuotes";

export function RenderQuote() {
  const quote = useGetQuote();

  return (
    <>
      {quote && (
        <div className="flex flex-col items-center justify-center mb-6">
          <p className="text-base text-[#f2ff59] italic">`&quot;`{quote.text}`&quot;`</p>
          <p className="text-sm text-white not-italic self-end">{quote.author}</p>
        </div>
      )}
    </>
  );
}
