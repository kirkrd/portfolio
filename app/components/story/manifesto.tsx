import { type MotionValue, motion, useScroll } from "framer-motion";
import { useRef } from "react";
import { cn } from "~/lib/utils";
import { Eyebrow, useRange } from "./primitives";

type Token = { readonly word: string; readonly accent?: boolean };

const statement: Token[] = [
  ..."I've been a developer for many years — an enthusiast about tech, passionate about creating"
    .split(" ")
    .map((word) => ({ word })),
  ...["great", "user", "experiences"].map((word) => ({ word, accent: true })),
  { word: "and" },
  ...["bringing", "ideas", "to", "life."].map((word) => ({
    word,
    accent: true,
  })),
];

function Word({
  token,
  progress,
  range,
}: {
  readonly token: Token;
  readonly progress: MotionValue<number>;
  readonly range: [number, number];
}) {
  const opacity = useRange(progress, range, [0.12, 1]);
  const y = useRange(progress, range, [0.18, 0], { unit: "em" });
  return (
    <>
      <motion.span
        className={cn(
          "inline-block",
          token.accent && "font-serif font-normal italic text-signal",
        )}
        style={{ opacity, y }}
      >
        {token.word}
      </motion.span>{" "}
    </>
  );
}

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const coda = useRange(scrollYProgress, [0.78, 0.92], [0, 1]);
  const codaY = useRange(scrollYProgress, [0.78, 0.92], [24, 0]);

  // Words finish lighting up at 75% so the reader gets a beat to rest.
  const span = 0.72 / statement.length;

  return (
    <section ref={ref} id="prologue" className="relative h-[280vh]">
      <div className="sticky top-0 flex h-svh items-center">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-10">
          <Eyebrow className="mb-8">Prologue</Eyebrow>
          <p className="max-w-5xl text-[clamp(1.85rem,4.6vw,4.25rem)] font-medium leading-[1.08] tracking-[-0.035em] text-balance">
            {statement.map((token, index) => (
              <Word
                // biome-ignore lint/suspicious/noArrayIndexKey: static text
                key={index}
                token={token}
                progress={scrollYProgress}
                range={[0.04 + index * span, 0.04 + (index + 1) * span]}
              />
            ))}
          </p>
          <motion.p
            className="mt-10 max-w-xl text-base text-muted-foreground md:mt-14 md:text-lg"
            style={{ opacity: coda, y: codaY }}
          >
            Fullstack in the way I'm open to every tech thrown at me — not
            afraid to jump in and learn whatever tool solves the problem at
            hand.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
