import { motion, useInView, useReducedMotion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE, useRange } from "./primitives";

/** Small seeded PRNG so stars land in the same place on server and client. */
function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

const random = seeded(2018);
const stars = Array.from({ length: 46 }, (_, index) => ({
  id: index,
  left: random() * 100,
  top: random() * 70,
  size: random() > 0.85 ? 2 : 1,
  delay: random() * 4,
  duration: 2.5 + random() * 3,
}));

const script = [
  "$ kirkerud-dev new",
  "› sketching the idea…",
  "› prototyping with a local model…",
  "› building the product…",
  "› shipping when it's ready.",
];

function useTypewriter(lines: string[], start: boolean, instant: boolean) {
  const total = lines.join("").length;
  // Always start empty so SSR and hydration agree; the effect fills in.
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (instant) {
      setTyped(total);
      return;
    }
    if (!start || typed >= total) return;
    const timeout = window.setTimeout(
      () => setTyped((count) => count + 1),
      typed === 0 ? 500 : 38,
    );
    return () => window.clearTimeout(timeout);
  }, [instant, start, total, typed]);

  let remaining = typed;
  return lines.map((line) => {
    const visible = line.slice(0, Math.max(0, remaining));
    remaining -= line.length;
    return visible;
  });
}

function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion() ?? false;
  const lines = useTypewriter(script, inView, reduce);
  const current = lines.findIndex(
    (line, index) => line.length < script[index].length,
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className="w-full max-w-md overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] font-mono text-[13px] shadow-2xl backdrop-blur-sm"
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
        {["a", "b", "c"].map((dot) => (
          <span key={dot} className="h-2.5 w-2.5 rounded-full bg-white/15" />
        ))}
        <span className="ml-3 min-w-0 truncate text-[11px] text-white/40">
          kristoffer@linux: ~/kirkerud-development
        </span>
      </div>
      <div className="flex min-h-[11.5rem] flex-col gap-1.5 p-5">
        {lines.map((line, index) => (
          <p
            key={script[index]}
            className={index === 0 ? "text-white" : "text-white/60"}
          >
            {line}
            {index === (current === -1 ? lines.length - 1 : current) ? (
              <motion.span
                className="ml-0.5 inline-block h-[1.05em] w-[0.55em] translate-y-[0.15em] bg-[hsl(18_100%_56%)]"
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  times: [0, 0.5, 0.5, 1],
                }}
              />
            ) : null}
          </p>
        ))}
      </div>
    </div>
  );
}

export function AfterHours() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const { scrollYProgress: through } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useRange(scrollYProgress, [0, 1], [0.86, 1]);
  const radius = useRange(scrollYProgress, [0, 1], [56, 20]);
  const moonY = useRange(through, [0.1, 0.6], [140, 0]);
  const glow = useRange(through, [0.2, 0.6], [0, 1]);

  return (
    <section ref={ref} id="studio" className="px-2 py-10 md:px-4 md:py-16">
      {/* Always night here, whatever the theme — the page "goes dark" after hours */}
      <motion.div
        className="relative isolate flex min-h-[92svh] items-center overflow-hidden bg-[#07080c] text-[#f3efe6] dark:ring-1 dark:ring-white/10"
        style={{ scale, borderRadius: radius }}
      >
        <div aria-hidden className="absolute inset-0 -z-10">
          {stars.map((star) => (
            <motion.span
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: star.size,
                height: star.size,
              }}
              animate={reduce ? undefined : { opacity: [0.15, 0.9, 0.15] }}
              transition={{
                duration: star.duration,
                delay: star.delay,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
          {/* Crescent moon: a lit disc with a night-coloured disc offset over it */}
          <motion.div
            className="absolute top-[12%] right-[10%] h-20 w-20 md:h-28 md:w-28"
            style={{ y: moonY }}
          >
            <span className="absolute inset-0 rounded-full bg-[#f3efe6] shadow-[0_0_60px_10px_rgba(243,239,230,0.15)]" />
            <span className="absolute inset-0 translate-x-[28%] -translate-y-[12%] rounded-full bg-[#07080c]" />
          </motion.div>
          <motion.div
            className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_at_50%_120%,hsl(18_100%_56%/0.35),transparent_60%)]"
            style={{ opacity: glow }}
          />
        </div>

        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-24 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-center md:px-12">
          <div>
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-white/50">
              <span aria-hidden className="h-px w-8 bg-[hsl(18_100%_56%)]" />
              After hours
            </p>
            <motion.h2
              className="mt-6 text-[clamp(2.5rem,6.5vw,6rem)] font-semibold leading-[0.92] tracking-[-0.055em]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1, ease: EASE }}
            >
              Kirkerud <br />
              <span className="font-serif font-normal italic text-white/70">
                Development
              </span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1, ease: EASE, delay: 0.2 }}
            >
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-white/75">
                A company I started to build SaaS applications in my spare time
                — turning ideas into products outside of my day-to-day
                consulting work.
              </p>
              <p className="mt-4 max-w-lg leading-relaxed text-white/55">
                Off the clock I daily drive Linux and experiment with local
                models like Qwen and Llama — the best way to understand where AI
                is heading is to run it yourself.
              </p>
              <p className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-white/15 px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-white/70">
                <span className="relative flex h-2 w-2">
                  <motion.span
                    className="absolute inset-0 rounded-full bg-[hsl(18_100%_56%)]"
                    animate={
                      reduce
                        ? undefined
                        : { scale: [1, 2.6], opacity: [0.7, 0] }
                    }
                    transition={{
                      duration: 1.6,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                  <span className="relative h-2 w-2 rounded-full bg-[hsl(18_100%_56%)]" />
                </span>
                In the workshop — stay tuned
              </p>
            </motion.div>
          </div>
          <Terminal />
        </div>
      </motion.div>
    </section>
  );
}
