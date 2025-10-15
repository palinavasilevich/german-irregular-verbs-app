import {
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";

import { Input } from "@/shared/ui/kit/input";
import { MAX_ATTEMPTS } from "../../model/constants";

export type VerbInputRef = {
  focus: () => void;
  isAnsweredCorrectly: boolean;
  attemptsLeft: number;
};

type VerbInputProps = {
  correctAnswer: string;
  onAnswer?: () => void;
  onRequestFocusNext?: () => void;
};

export const VerbInput = forwardRef<VerbInputRef, VerbInputProps>(
  ({ correctAnswer, onAnswer, onRequestFocusNext }, ref) => {
    const [value, setValue] = useState("");
    const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState(false);
    const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS);

    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      isAnsweredCorrectly,
      attemptsLeft,
    }));

    const normalize = (text: string) => text.trim().toLowerCase();

    const finishInput = (success: boolean, updatedAttempts: number) => {
      if (success || updatedAttempts <= 0) {
        onRequestFocusNext?.();
      }
    };

    const checkAnswer = () => {
      if (normalize(value) === normalize(correctAnswer)) {
        setIsAnsweredCorrectly(true);
        finishInput(true, attemptsLeft);
      } else {
        const updatedAttempts = attemptsLeft - 1;
        setAttemptsLeft(updatedAttempts);
        finishInput(false, updatedAttempts);
      }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
      setValue(e.target.value);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        checkAnswer();
      }
    };

    const handleBlur = () => {
      if (value.trim() !== "" && !isAnsweredCorrectly && attemptsLeft > 0) {
        checkAnswer();
      }
    };

    const borderClass = isAnsweredCorrectly
      ? "border-green-500"
      : attemptsLeft === 0
      ? "border-rose-500"
      : "";

    const isDisabled = isAnsweredCorrectly || attemptsLeft <= 0;

    useEffect(() => {
      if (isAnsweredCorrectly) {
        inputRef.current?.classList.add("animate-pulse");
        const timer = setTimeout(
          () => inputRef.current?.classList.remove("animate-pulse"),
          300
        );
        return () => clearTimeout(timer);
      }
    }, [isAnsweredCorrectly]);

    useEffect(() => {
      if (isAnsweredCorrectly || attemptsLeft <= 0) {
        onAnswer?.();
      }
    }, [isAnsweredCorrectly, attemptsLeft, onAnswer]);

    return (
      <Input
        ref={inputRef}
        value={attemptsLeft <= 0 ? correctAnswer : value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        disabled={isDisabled}
        className={`w-[150px] lg:w-[200px] border-dashed border-gray-500 !ring-transparent focus-visible:border-violet-700 text-base disabled:bg-gray-100 disabled:text-gray-400 ${borderClass}`}
      />
    );
  }
);

VerbInput.displayName = "VerbInput";
