import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { CAREER_START, jobItems } from "~/lib/constants";
import { EASE } from "./primitives";

function Counter({
  to,
  suffix = "",
}: {
  readonly to: number;
  readonly suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();
  // Start at 0 on server and client alike; the effect jumps straight to
  // the target when reduced motion is on.
  const value = useMotionValue(0);
  const rounded = useTransform(
    value,
    (latest) => `${Math.round(latest)}${suffix}`,
  );

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, to, {
      duration: reduce ? 0 : 1.8,
      ease: EASE,
    });
    return () => controls.stop();
  }, [inView, reduce, to, value]);

  return (
    <motion.span ref={ref} className="tabular-nums">
      {rounded}
    </motion.span>
  );
}

const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

export function Stats() {
  const years = Math.floor((Date.now() - CAREER_START.getTime()) / MS_PER_YEAR);
  const organisations = new Set(jobItems.map((job) => job.company)).size;
  const polestarStints = new Set(
    jobItems
      .filter((job) => job.company === "Polestar")
      .map((job) => job.consultantCompany),
  ).size;

  const stats = [
    { value: years, suffix: "+", label: "Years building for the web" },
    { value: organisations, label: "Organisations along the way" },
    { value: jobItems.length, label: "Roles & assignments" },
    {
      value: polestarStints,
      suffix: "×",
      label: "Hired by Polestar — first as a consultant, then in-house",
    },
  ];

  return (
    <section aria-label="By the numbers" className="border-y">
      <dl className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="flex flex-col-reverse justify-end gap-3 border-foreground/10 px-5 py-10 even:border-l md:border-l md:px-10 md:py-16 md:first:border-l-0 [&:nth-child(n+3)]:border-t md:[&:nth-child(n+3)]:border-t-0"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: index * 0.1 }}
          >
            <dt className="max-w-[16rem] text-sm text-muted-foreground">
              {stat.label}
            </dt>
            <dd className="text-[clamp(3rem,7vw,6rem)] font-semibold leading-none tracking-[-0.06em]">
              <Counter to={stat.value} suffix={stat.suffix} />
            </dd>
          </motion.div>
        ))}
      </dl>
    </section>
  );
}
