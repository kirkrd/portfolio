import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import { links } from "~/lib/constants";
import { EASE, useRange } from "./primitives";

function Letters({
  text,
  delay,
  className,
}: {
  readonly text: string;
  readonly delay: number;
  readonly className?: string;
}) {
  return (
    <span aria-hidden className={className}>
      {[...text].map((letter, index) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: letters repeat
          key={index}
          className="inline-block overflow-hidden pb-[0.08em] align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "105%", rotate: 8 }}
            animate={{ y: "0%", rotate: 0 }}
            transition={{
              duration: 1.1,
              ease: EASE,
              delay: delay + index * 0.035,
            }}
          >
            {letter}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Architect's guide lines that draw themselves in behind the name. */
function GuideLines() {
  const horizontals = ["22%", "58%", "86%"];
  const verticals = ["8%", "36%", "64%", "92%"];
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
    >
      {horizontals.map((top, index) => (
        <motion.span
          key={top}
          className="absolute inset-x-0 h-px origin-left bg-foreground/10"
          style={{ top }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.1 + index * 0.12 }}
        />
      ))}
      {verticals.map((left, index) => (
        <motion.span
          key={left}
          className="absolute inset-y-0 w-px origin-top bg-foreground/10"
          style={{ left }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.8, ease: EASE, delay: 0.2 + index * 0.1 }}
        />
      ))}
      {verticals.slice(1, 3).map((left) => (
        <motion.span
          key={`cross-${left}`}
          className="absolute -translate-x-1/2 -translate-y-1/2 font-mono text-xs text-signal"
          style={{ left, top: "22%" }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 1.4 }}
        >
          +
        </motion.span>
      ))}
    </div>
  );
}

function ScrollCue() {
  return (
    <motion.a
      href="#prologue"
      className="group flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
    >
      <span className="relative block h-10 w-px overflow-hidden bg-foreground/15">
        <motion.span
          className="absolute inset-x-0 top-0 h-1/2 bg-signal"
          animate={{ y: ["-100%", "200%"] }}
          transition={{
            duration: 1.8,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      </span>
      <span className="transition-colors group-hover:text-foreground">
        Scroll — the story starts in 2018
      </span>
    </motion.a>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Each layer travels at its own speed — the parallax. With reduced motion
  // everything rests where the page starts.
  const nameY = useRange(scrollYProgress, [0, 1], [0, -45], {
    unit: "%",
    rest: "start",
  });
  const metaY = useRange(scrollYProgress, [0, 1], [0, -15], {
    unit: "%",
    rest: "start",
  });
  const gridY = useRange(scrollYProgress, [0, 1], [0, 18], {
    unit: "%",
    rest: "start",
  });
  const fade = useRange(scrollYProgress, [0, 0.75], [1, 0], {
    rest: "start",
  });
  const portraitScale = useRange(scrollYProgress, [0, 1], [1, 1.35], {
    rest: "start",
  });

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-svh flex-col overflow-hidden"
    >
      <motion.div className="absolute inset-0" style={{ y: gridY }}>
        <GuideLines />
      </motion.div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pt-28 pb-10 md:px-10 md:pb-14">
        <motion.div style={{ y: metaY, opacity: fade }}>
          <motion.p
            className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          >
            Gothenburg, Sweden — 57.7089° N, 11.9746° E
          </motion.p>
        </motion.div>

        <motion.h1
          aria-label="Kristoffer Kirkerud"
          className="text-[clamp(3.25rem,16vw,12.5rem)] font-semibold leading-[0.86] tracking-[-0.065em]"
          style={{ y: nameY, opacity: fade }}
        >
          <Letters text="Kristoffer" delay={0.15} className="block" />{" "}
          <span className="flex items-end gap-[0.14em]">
            <motion.span
              aria-hidden
              className="relative mb-[0.1em] inline-block h-[0.72em] shrink-0 overflow-hidden rounded-full bg-muted"
              initial={{ width: "0em" }}
              animate={{ width: "1.65em" }}
              transition={{ duration: 1.3, ease: EASE, delay: 0.9 }}
            >
              <motion.img
                src="/avatar.jpg"
                alt="Kristoffer Kirkerud"
                width={800}
                height={800}
                className="absolute inset-0 h-full w-full object-cover object-[50%_35%] grayscale"
                style={{ scale: portraitScale }}
              />
            </motion.span>
            <Letters text="Kirkerud" delay={0.4} />
          </span>
        </motion.h1>

        <motion.div
          className="mt-10 grid gap-8 md:mt-14 md:grid-cols-[minmax(0,1fr)_auto] md:items-end"
          style={{ y: metaY, opacity: fade }}
        >
          <motion.p
            className="max-w-xl font-serif text-3xl leading-[1.05] italic md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1.3 }}
          >
            builds things for the web.
            <span className="text-muted-foreground">
              {" "}
              This is the story so far.
            </span>
          </motion.p>
          <motion.div
            className="flex flex-col gap-6 md:items-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1.5 }}
          >
            <p className="max-w-xs text-sm text-muted-foreground md:text-right">
              Senior Software Engineer / Solution Architect at{" "}
              <a
                href={links.consid}
                target="_blank"
                rel="noreferrer"
                className="text-foreground underline decoration-signal underline-offset-4"
              >
                Consid
              </a>
            </p>
            <ScrollCue />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
