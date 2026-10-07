import {
  type MotionValue,
  motion,
  useReducedMotion,
  useTransform,
  type Variants,
} from "framer-motion";
import { Fragment, type ReactNode, useEffect, useRef } from "react";
import { cn } from "~/lib/utils";

/** House easing: a long, soft "expo out" used across the whole story. */
export const EASE = [0.22, 1, 0.36, 1] as const;

const maskParent: Variants = {
  hidden: {},
  show: {},
};

const maskChild: Variants = {
  hidden: { y: "110%" },
  show: (delay: number) => ({
    y: "0%",
    transition: { duration: 0.9, ease: EASE, delay },
  }),
};

/**
 * Words slide up from behind an invisible mask, one after another.
 * The in-view trigger lives on the parent: the words themselves start
 * fully clipped, so they would never be "seen" on their own.
 */
export function MaskText({
  text,
  className,
  delay = 0,
  stagger = 0.06,
}: {
  readonly text: string;
  readonly className?: string;
  readonly delay?: number;
  readonly stagger?: number;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      className={cn("block", className)}
      variants={maskParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, index) => (
          // Words can repeat, so position is part of the identity here.
          // biome-ignore lint/suspicious/noArrayIndexKey: static text
          <Fragment key={`${word}-${index}`}>
            <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
              <motion.span
                className="inline-block"
                variants={maskChild}
                custom={delay + index * stagger}
              >
                {word}
              </motion.span>
            </span>{" "}
          </Fragment>
        ))}
      </span>
    </motion.span>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
  readonly y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  readonly children: ReactNode;
  readonly className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground",
        className,
      )}
    >
      <span aria-hidden className="h-px w-8 bg-signal" />
      {children}
    </p>
  );
}

/**
 * Clamped linear map from a scroll progress value to an output range.
 *
 * Deliberately uses the function form of `useTransform`: the array form lets
 * framer-motion hand opacity/transform to the browser's native ViewTimeline,
 * which mis-maps progress for tall pinned sections in Chrome.
 *
 * With reduced motion the value parks at its `rest` end instead. That happens
 * through the motion value (not by swapping the `style` prop) because the
 * server can't know the preference, and React won't patch server-rendered
 * styles during hydration — framer writes motion values straight to the DOM.
 */
export function useRange(
  value: MotionValue<number>,
  [inStart, inEnd]: readonly [number, number],
  [outStart, outEnd]: readonly [number, number],
  { unit = "", rest = "end" }: { unit?: string; rest?: "start" | "end" } = {},
) {
  const reduce = useReducedMotion();
  const reduceRef = useRef(reduce);
  reduceRef.current = reduce;

  const format = (n: number) => (unit ? `${n}${unit}` : n);
  const resting = format(rest === "start" ? outStart : outEnd);

  const mapped = useTransform(value, (latest) => {
    if (reduceRef.current) return resting;
    const t = Math.min(1, Math.max(0, (latest - inStart) / (inEnd - inStart)));
    return format(outStart + t * (outEnd - outStart));
  });

  useEffect(() => {
    if (reduce) mapped.set(resting);
  }, [reduce, mapped, resting]);

  return mapped;
}
