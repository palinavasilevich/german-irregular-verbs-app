import type { ReactNode, ElementType } from "react";
import { cn } from "@/shared/lib/css";
import { Container } from "./Container";

type PageContentProps = {
  title?: ReactNode;
  description?: ReactNode;
  as?: ElementType;
  className?: string;
  headerClassName?: string;
  children: ReactNode;
};

export function PageContent({
  title,
  description,
  as: Component = "section",
  className,
  headerClassName,
  children,
}: PageContentProps) {
  return (
    <Component className={cn("py-8", className)}>
      <Container>
        {(title || description) && (
          <div className={cn("mb-8 space-y-2", headerClassName)}>
            {title && (
              <h1 className="section-title text-3xl font-semibold tracking-tight m-auto">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-muted-foreground text-sm">{description}</p>
            )}
          </div>
        )}

        {children}
      </Container>
    </Component>
  );
}
