import React, { useState, useEffect } from "react";

const TypingEffect = () => {
  const texts = ["Bem-Vindo ao JurisBridge, sua plataforma de assistência jurídica."];
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 7000;

  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    if (!isDeleting && charIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(currentText.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    }

    if (!isDeleting && charIndex === currentText.length) {
      const pause = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(pause);
    }

    if (isDeleting && charIndex > 0) {
      const timeout = setTimeout(() => {
        setDisplayedText(currentText.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      }, deletingSpeed);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
    }
  }, [charIndex, isDeleting, textIndex]);

  return (
    <h2
      style={{
        fontFamily: "monospace",
        color: "white",
        whiteSpace: "pre",
        display: "inline-block",
        position: "relative",
      }}
    >
      {displayedText}
      <span
        style={{
          display: "inline-block",
          width: "1ch",
          animation: "blink 1s step-end infinite",
          color: "white",
          position: "absolute",
        }}
      >
        |
      </span>

      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}
      </style>
    </h2>
  );
};

export default TypingEffect;
