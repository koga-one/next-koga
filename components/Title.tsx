import React, { useState, useEffect } from "react";

type Props = {
  title?: string;
  subtitle?: string;
};

const quotes: string[] = [
  "fell free to explore the website",
  "you can install this website!",
  "dark mode included for the gamers",
  "i try to post daily (or weekly)",
  "どうぞよろしく！",
  "nice to meet you. I'm koga!",
  "bem vindo ao meu site. welcome!",
  "the moon is beautiful, isn't it?",
];

const Title = ({ title, subtitle }: Props) => {
  const [quote, setQuote] = useState("");

  if (!title && !subtitle) {
    useEffect(() => {
      setQuote(
        quotes[
          Math.min(
            Math.floor(Math.random() * quotes.length * 2),
            quotes.length - 1
          )
        ]
      );
    }, []);
  }

  return (
    <div className="mb-2 flex min-h-[40vh] flex-col items-center justify-center gap-4 lg:mb-8 lg:gap-8">
      <h1 className="text-center text-6xl lg:text-9xl">
        {title ? (
          title
        ) : (
          <span>
            koga<span className="text-aka">.</span>one
          </span>
        )}
      </h1>
      <h2 className="text-xl text-aka dark:text-gure lg:text-4xl">
        {subtitle ? subtitle : quote}
      </h2>
    </div>
  );
};

export default Title;
