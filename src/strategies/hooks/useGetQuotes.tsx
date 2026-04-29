import { useState } from "react";
import quoteList from "./quotes.json";

interface Quote {
  text: string;
  author: string;
}

export function useGetQuote(): Quote {
  const [quote, _setQuote] = useState<Quote>(quoteList[Math.floor(Math.random() * quoteList.length)]);

  return quote;
}
