import { cn } from "~/lib/utils";
import { FadeInOnView } from "./fade-into-view";

export enum PillType {
  Languages = "Languages",
  Frameworks = "Frameworks",
  Tools = "Tools",
  Infrastructure = "Infrastructure",
  Architecture = "Architecture",
}
const typeToClass: Record<PillType, string> = {
  [PillType.Languages]: "bg-indigo-600 text-white",
  [PillType.Frameworks]: "bg-violet-600 text-white",
  [PillType.Tools]: "bg-cyan-600 text-white",
  [PillType.Infrastructure]: "bg-amber-600 text-white",
  [PillType.Architecture]: "bg-rose-600 text-white", // or "bg-slate-600 text-white" if you want it more neutral
};
export const Pill = ({
  type,
  children,
  className,
  delay = 0.1,
}: {
  type: PillType;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <FadeInOnView delay={delay}>
    <span
      className={cn(
        "px-3 py-1 text-sm rounded-full text-white",
        typeToClass[type],
        className,
      )}
    >
      {children}
    </span>
  </FadeInOnView>
);
