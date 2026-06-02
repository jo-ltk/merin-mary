import { cn } from "@/lib/utils";

export function MindloopLogo({
  className,
  outerClassName,
  innerClassName,
}: {
  className?: string;
  outerClassName?: string;
  innerClassName?: string;
}) {
  return (
    <div className={cn("relative grid place-items-center", className)}>
      <div
        className={cn(
          "h-7 w-7 rounded-full border-2 border-foreground/60",
          outerClassName,
        )}
      />
      <div
        className={cn(
          "absolute h-3 w-3 rounded-full border border-foreground/60",
          innerClassName,
        )}
      />
    </div>
  );
}

