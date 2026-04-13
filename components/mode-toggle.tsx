"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ModeToggle({
  className,
  iconClassName,
}: {
  className?: string;
  iconClassName?: string;
}) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const isDark = (theme === "system" ? resolvedTheme : theme) === "dark";

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className={cn("relative shrink-0", className)}
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      disabled={!mounted}
    >
      <Sun
        className={cn(
          "scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90",
          iconClassName ?? "size-4",
        )}
        aria-hidden
      />
      <Moon
        className={cn(
          "absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0",
          iconClassName ?? "size-4",
        )}
        aria-hidden
      />
    </Button>
  );
}
