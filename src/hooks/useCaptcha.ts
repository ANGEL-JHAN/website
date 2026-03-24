import { useState, useCallback, useEffect, useRef } from "react";

// Simple math CAPTCHA component
const CAPTCHA_OPERATIONS = [
  { generate: () => { const a = Math.floor(Math.random() * 10) + 1; const b = Math.floor(Math.random() * 10) + 1; return { question: `${a} + ${b} = ?`, answer: a + b }; } },
  { generate: () => { const a = Math.floor(Math.random() * 10) + 5; const b = Math.floor(Math.random() * 5) + 1; return { question: `${a} - ${b} = ?`, answer: a - b }; } },
  { generate: () => { const a = Math.floor(Math.random() * 5) + 2; const b = Math.floor(Math.random() * 5) + 1; return { question: `${a} × ${b} = ?`, answer: a * b }; } },
];

export const useCaptcha = () => {
  const [challenge, setChallenge] = useState({ question: "", answer: 0 });
  const [userAnswer, setUserAnswer] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const generateChallenge = useCallback(() => {
    const op = CAPTCHA_OPERATIONS[Math.floor(Math.random() * CAPTCHA_OPERATIONS.length)];
    setChallenge(op.generate());
    setUserAnswer("");
    setVerified(false);
    setError(false);
  }, []);

  useEffect(() => {
    generateChallenge();
  }, [generateChallenge]);

  const verify = useCallback(() => {
    const isCorrect = parseInt(userAnswer) === challenge.answer;
    setVerified(isCorrect);
    setError(!isCorrect);
    return isCorrect;
  }, [userAnswer, challenge.answer]);

  return { challenge, userAnswer, setUserAnswer, verified, error, verify, regenerate: generateChallenge };
};
