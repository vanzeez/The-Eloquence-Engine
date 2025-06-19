import React, { useEffect, useState } from "react";

interface TextGenerateEffectProps {
  words: string;
  duration?: number; // in seconds
  filter?: boolean;
}

export const TextGenerateEffect: React.FC<TextGenerateEffectProps> = ({ words, duration = 2, filter }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!words) {
      setDisplayed("");
      return;
    }
    let current = 0;
    const total = words.length;
    const interval = Math.max(10, (duration * 1000) / total);
    setDisplayed("");
    const timer = setInterval(() => {
      current++;
      setDisplayed(words.slice(0, current));
      if (current >= total) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [words, duration]);
  return <span>{displayed}</span>;
}; 