import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { type Chapter, chapters } from "~/lib/constants";
import { ChapterVisualFor } from "./chapter-visuals";
import { EASE, Eyebrow, MaskText, Reveal } from "./primitives";

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

/** One odometer wheel: a 0–9 strip that rolls to the requested digit. */
function Digit({ value }: { readonly value: number }) {
  return (
    <span className="relative inline-block h-[1em] overflow-hidden">
      <span className="invisible">0</span>
      <motion.span
        className="absolute inset-x-0 top-0 flex flex-col"
        initial={false}
        animate={{ y: `${-value}em` }}
        transition={{ type: "spring", stiffness: 70, damping: 16, mass: 1 }}
      >
        {DIGITS.map((digit) => (
          <span key={digit} className="block h-[1em]">
            {digit}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

function Odometer({ year }: { readonly year: number }) {
  return (
    <span
      role="img"
      aria-label={String(year)}
      className="flex leading-none tabular-nums"
    >
      {[...String(year)].map((digit, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: each wheel is a fixed position
        <Digit key={index} value={Number(digit)} />
      ))}
    </span>
  );
}

function ChapterBlock({
  chapter,
  index,
  onActive,
}: {
  readonly chapter: Chapter;
  readonly index: number;
  readonly onActive: (index: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  // "Active" means the chapter is crossing the middle of the screen.
  const centred = useInView(ref, { margin: "-50% 0px -50% 0px" });
  const reached = useInView(ref, { margin: "0px 0px -50% 0px", once: true });

  useEffect(() => {
    if (centred) onActive(index);
  }, [centred, index, onActive]);

  return (
    <li
      ref={ref}
      id={chapter.id}
      className="relative pt-16 pb-24 pl-8 md:pt-32 md:pb-40 md:pl-16"
    >
      {/* Milestone on the line */}
      <span className="absolute top-[4.6rem] left-0 grid h-4 w-4 -translate-x-1/2 place-items-center md:top-[8.6rem]">
        <span className="absolute inset-0 rounded-full border bg-background" />
        <motion.span
          className="relative h-2 w-2 rounded-full bg-signal"
          initial={{ scale: 0 }}
          animate={{ scale: reached ? 1 : 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        />
      </span>

      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Chapter {String(index + 1).padStart(2, "0")}
          <span className="mx-2 text-signal">/</span>
          {chapter.period}
        </p>
      </Reveal>
      <h3 className="mt-4 text-[clamp(2.25rem,5vw,4.25rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
        <MaskText text={chapter.title} />
      </h3>
      <Reveal delay={0.15}>
        <p className="mt-3 font-serif text-2xl italic text-muted-foreground md:text-3xl">
          {chapter.kicker}
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty">
          {chapter.story}
        </p>
      </Reveal>

      <Reveal className="mt-10 md:mt-14" y={48}>
        <ChapterVisualFor visual={chapter.visual} />
      </Reveal>

      <ul className="mt-10 divide-y border-y md:mt-14">
        {chapter.roles.map((role, roleIndex) => (
          <motion.li
            key={role.monthYear + role.company + role.jobTitle}
            className="grid gap-1 py-5 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.7, ease: EASE, delay: roleIndex * 0.07 }}
          >
            <time className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground md:pt-1">
              {role.monthYear}
            </time>
            <div>
              <p className="font-medium tracking-tight">
                {role.jobTitle}
                <span className="text-muted-foreground"> — {role.company}</span>
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {role.jobDescription}
                {role.consultantCompany &&
                role.consultantCompany !== "Employed directly" ? (
                  <span className="ml-2 inline-block rounded-full border px-2 py-px font-mono text-[10px] uppercase tracking-[0.12em]">
                    via {role.consultantCompany}
                  </span>
                ) : null}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>
    </li>
  );
}

export function Journey() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start center", "end center"],
  });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const chapter = chapters[active];

  return (
    <section id="journey" className="relative mx-auto max-w-7xl px-5 md:px-10">
      <div className="pt-24 md:pt-40">
        <Eyebrow>The journey</Eyebrow>
        <h2 className="mt-6 max-w-4xl text-[clamp(2.5rem,7vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.055em]">
          <MaskText text="Four chapters," />
          <MaskText
            text="one direction."
            className="font-serif font-normal italic text-muted-foreground"
            delay={0.2}
          />
        </h2>
      </div>

      <div className="relative mt-12 md:mt-0 md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-x-12 lg:gap-x-20">
        {/* Pinned year — a slim bar on mobile, a full-height column on desktop */}
        <div className="sticky top-0 z-20 -mx-5 border-b bg-background/85 px-5 py-3 backdrop-blur-md md:mx-0 md:flex md:h-svh md:items-center md:self-start md:border-b-0 md:bg-transparent md:p-0 md:backdrop-blur-none">
          <div className="flex items-center gap-4 md:block">
            <div className="text-[clamp(2.75rem,9vw,4rem)] font-semibold tracking-[-0.06em] md:text-[clamp(6rem,13vw,12rem)]">
              <Odometer year={chapter.year} />
            </div>
            <div className="min-w-0 md:mt-6">
              <div className="relative h-5 overflow-hidden md:h-7">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.p
                    key={chapter.id}
                    className="truncate font-serif text-lg italic md:text-2xl"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  >
                    {chapter.title}
                  </motion.p>
                </AnimatePresence>
              </div>
              <div className="mt-2 flex gap-1.5 md:mt-5" aria-hidden>
                {chapters.map((item, index) => (
                  <span
                    key={item.id}
                    className="relative h-0.5 w-6 overflow-hidden rounded-full bg-foreground/15 md:w-10"
                  >
                    <motion.span
                      className="absolute inset-0 origin-left bg-signal"
                      initial={false}
                      animate={{ scaleX: index <= active ? 1 : 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <ol ref={listRef} className="relative">
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 w-px bg-border"
          />
          <motion.span
            aria-hidden
            className="absolute inset-y-0 -left-px w-0.5 origin-top bg-signal"
            style={{ scaleY: line }}
          />
          {chapters.map((item, index) => (
            <ChapterBlock
              key={item.id}
              chapter={item}
              index={index}
              onActive={setActive}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
