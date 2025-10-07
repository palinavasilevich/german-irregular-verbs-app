import { forwardRef, useImperativeHandle, useRef, useState } from "react";

export type VerbInputRef = {
  focus: () => void;
};

type VerbInputProps = {
  correctAnswer: string;
  onRequestFocusNext?: () => void;
};

export const VerbInput = forwardRef<VerbInputRef, VerbInputProps>(
  ({ correctAnswer, onRequestFocusNext }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [value, setValue] = useState("");

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
    }));

    const handleBlur = () => {
      if (value.trim().toLowerCase() === correctAnswer.toLowerCase()) {
        onRequestFocusNext?.();
      }
    };

    return (
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        className="border rounded px-2 py-1 w-full"
      />
    );
  }
);
