import { useTheme } from "@/app/context/ThemeContext";
import { cn } from "@/shared/lib/css";
import cls from "./ThemeToggler.module.css";

type ThemeTogglerProps = {
  className?: string;
};

export function ThemeToggler({ className }: ThemeTogglerProps) {
  const { theme, toggleTheme } = useTheme();
  return (
    <label className={cn(cls.switch, className)}>
      <input
        type="checkbox"
        onChange={toggleTheme}
        checked={theme === "dark"}
      />
      <span className={cls.slider}></span>
    </label>
  );
}
