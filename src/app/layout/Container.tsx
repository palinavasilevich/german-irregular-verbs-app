import type { ReactNode, ElementType } from "react";
import { cn } from "@/shared/lib/css";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  size?: "sm" | "md" | "lg" | "xl" | "full";
};

const SIZE_CLASSES: Record<NonNullable<ContainerProps["size"]>, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-3xl",
  xl: "max-w-7xl",
  full: "max-w-full",
};

export function Container({
  children,
  className,
  as: Component = "div",
  size = "xl",
}: ContainerProps) {
  return (
    <Component
      className={cn("mx-auto w-full px-6", SIZE_CLASSES[size], className)}
    >
      {children}
    </Component>
  );
}
