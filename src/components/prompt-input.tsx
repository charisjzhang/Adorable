import { useRef } from "react";
import { PromptInputTextarea } from "./ui/prompt-input";
import { useTypingAnimation } from "../hooks/typing-animation";

export function PromptInputTextareaWithTypingAnimation() {
  const placeholderRef = useRef<HTMLTextAreaElement>(null);

  const exampleIdeas = [
    "a landing page for a digital health company",
    "an AI therapist app",
    "an HIPAA compliant healthcare intake form",
    "a social network for nurse practitioners to connect with each other",
  ];

  const { displayText } = useTypingAnimation({
    texts: exampleIdeas,
    baseText: "I want to build",
    typingSpeed: 100,
    erasingSpeed: 50,
    pauseDuration: 2000,
    initialDelay: 500,
  });

  return (
    <PromptInputTextarea
      ref={placeholderRef}
      placeholder={displayText}
      className="min-h-[100px] w-full bg-transparent dark:bg-transparent backdrop-blur-sm pr-12"
      onBlur={() => {}}
    />
  );
}
