import React, { useEffect } from "react";
import { cn } from "@/lib/utils";

interface TypingAnimationProps {
  className?: string;
  text: string;
  duration?: number;
  as?: keyof JSX.IntrinsicElements;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  className,
  text,
  duration = 200,
  as: Component = "span",
}) => {
  const [displayedText, setDisplayedText] = React.useState("");
  const [count, setCount] = React.useState<number>(0);

  useEffect(() => {
    const typingEffect = setInterval(() => {
      if (count < text.length) {
        setDisplayedText(displayedText + text.charAt(count));
        setCount(count + 1);
      } else {
        clearInterval(typingEffect);
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [duration, count, text, displayedText]);

  return (
    <Component
      className={cn(
        "font-display tracking-[-0.02em] drop-shadow-sm",
        className
      )}
    >
      {displayedText ? displayedText : text}
    </Component>
  );
};

export default TypingAnimation;
