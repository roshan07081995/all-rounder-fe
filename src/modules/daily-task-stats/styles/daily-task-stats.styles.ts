import type { CSSProperties } from "react";

import { colors, radius, shadow, typography } from "@/styles";

export const statsSurfaceStyles: CSSProperties = {
  borderRadius: radius.md,
  boxShadow: shadow.sm,
};

export const executiveSurfaceStyles: CSSProperties = {
  borderRadius: radius.md,
  boxShadow: shadow.sm,
  backgroundColor: colors.black,
};

export const statsTypographyStyles = {
  eyebrow: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
  title: {
    fontSize: typography.fontSize["2xl"],
    fontWeight: typography.fontWeight.bold,
  },
} satisfies Record<string, CSSProperties>;

export const chartColors = {
  completed: colors.success[500],
  pending: colors.warning[500],
  highPriority: colors.danger[500],
  mediumPriority: "#06b6d4",
  lowPriority: "#8b5cf6",
  primary: colors.primary[600],
  primarySoft: colors.primary[100],
  track: "#e2e8f0",
};

export const statsPanelClassName =
  "border border-slate-200 bg-white p-6";

export const compactStatsPanelClassName =
  "border border-slate-200 bg-white p-5";
