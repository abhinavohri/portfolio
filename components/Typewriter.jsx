'use client';

import { useEffect, useState } from 'react';

export default function Typewriter({ text, speed = 30, delay = 0 }) {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let index = 0;
    const timer = setInterval(() => {
      index += 1;
      setDisplayedText(text.slice(0, index));

      if (index >= text.length) clearInterval(timer);
    }, speed);

    return () => clearInterval(timer);
  }, [started, text, speed]);

  return (
    <>
      <span aria-hidden="true">{displayedText}</span>
      <span className="srOnly">{text}</span>
    </>
  );
}
