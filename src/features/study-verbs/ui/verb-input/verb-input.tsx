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
  isAnsweredCorrectly: boolean;
  attemptsLeft: number;
  inputId: string;
  focus: () => void;
  reset: () => void;
};

type VerbInputProps = {
  id: string;
  correctAnswer: string;
  onRequestFocusNext?: () => void;
  onComplete?: () => void;
};

export const VerbInput = forwardRef<VerbInputRef, VerbInputProps>(
  ({ id, correctAnswer, onRequestFocusNext, onComplete }, ref) => {
    const [value, setValue] = useState("");
    const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState(false);
    const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS);

    const inputRef = useRef<HTMLInputElement>(null);
    const isDoneReportedRef = useRef(false);

    useImperativeHandle(ref, () => ({
      isAnsweredCorrectly,
      attemptsLeft,
      inputId: id,
      focus: () => inputRef.current?.focus(),
      reset: () => {
        setValue("");
        setIsAnsweredCorrectly(false);
        setAttemptsLeft(MAX_ATTEMPTS);
        isDoneReportedRef.current = false;
      },
    }));

    const normalize = (text: string) => text.trim().toLowerCase();

    const markDoneOnce = () => {
      if (!isDoneReportedRef.current) {
        isDoneReportedRef.current = true;
        onComplete?.();
      }
    };

    const checkAnswer = () => {
      if (isDoneReportedRef.current) return;

      if (normalize(value) === normalize(correctAnswer)) {
        setIsAnsweredCorrectly(true);
        markDoneOnce();
        onRequestFocusNext?.();
      } else {
        const updatedAttempts = attemptsLeft - 1;
        setAttemptsLeft(updatedAttempts);

        if (updatedAttempts <= 0) {
          markDoneOnce();
          onRequestFocusNext?.();
        }
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
      if (value.trim() && !isAnsweredCorrectly && attemptsLeft > 0) {
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
