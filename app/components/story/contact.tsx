import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { links } from "~/lib/constants";
import { EASE, Eyebrow, Reveal } from "./primitives";

function wrap(min: number, max: number, value: number) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

/** A marquee whose speed and direction follow the reader's scroll. */
function VelocityMarquee({
  baseVelocity = -2.5,
}: {
  readonly baseVelocity?: number;
}) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), {
    damping: 50,
    stiffness: 400,
  });
  const factor = useTransform(velocity, [0, 1000], [0, 5], { clamp: false });
  const direction = useRef(1);
  // Four copies; shifting by exactly one copy (25%) loops seamlessly.
  const x = useTransform(baseX, (value) => `${wrap(-25, 0, value)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = direction.current * baseVelocity * (delta / 1000);
    if (factor.get() < 0) direction.current = -1;
    else if (factor.get() > 0) direction.current = 1;
    move += direction.current * move * factor.get();
    baseX.set(baseX.get() + move);
  });

  const phrase = (
    <span className="flex shrink-0 items-center gap-[0.3em] pr-[0.3em]">
      <span>Let's build</span>
      <span className="font-serif font-normal italic text-signal">
        something
      </span>
      <span
        aria-hidden
        className="inline-block h-[0.18em] w-[0.18em] rounded-full bg-foreground"
      />
    </span>
  );

  return (
    <div className="overflow-hidden py-4">
      <motion.div
        aria-hidden
        className="flex w-max text-[clamp(3.5rem,11vw,10rem)] font-semibold leading-none tracking-[-0.055em] whitespace-nowrap"
        style={{ x }}
      >
        {phrase}
        {phrase}
        {phrase}
        {phrase}
      </motion.div>
      <h2 className="sr-only">Let's build something</h2>
    </div>
  );
}

const channels = [
  {
    label: "LinkedIn",
    handle: "kristoffer-kirkerud",
    href: links.linkedin,
    Icon: LinkedInLogoIcon,
  },
  {
    label: "GitHub",
    handle: "kirkrd",
    href: links.github,
    Icon: GitHubLogoIcon,
  },
];

export function Contact() {
  return (
    <section id="contact" className="pt-16 md:pt-28">
      <VelocityMarquee />

      <div className="mx-auto max-w-7xl px-5 pt-16 md:px-10 md:pt-24">
        <Eyebrow>Get in touch</Eyebrow>
        <ul className="mt-8 border-t">
          {channels.map(({ label, handle, href, Icon }, index) => (
            <motion.li
              key={label}
              className="border-b"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE, delay: index * 0.1 }}
            >
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group relative flex items-center gap-5 overflow-hidden py-7 md:py-10"
              >
                {/* Fill wipes in from the left on hover */}
                <span
                  aria-hidden
                  className="absolute inset-0 origin-left scale-x-0 bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
                <Icon
                  aria-hidden
                  className="relative ml-1 h-7 w-7 shrink-0 transition-colors duration-500 group-hover:text-background md:ml-4 md:h-9 md:w-9"
                />
                <span className="relative text-[clamp(2rem,5vw,4rem)] font-semibold leading-none tracking-[-0.045em] transition-colors duration-500 group-hover:text-background">
                  {label}
                </span>
                <span className="relative ml-auto hidden font-mono text-sm text-muted-foreground transition-colors duration-500 group-hover:text-background/70 sm:inline">
                  /{handle}
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="relative mr-1 ml-auto h-7 w-7 shrink-0 transition-all duration-500 group-hover:rotate-45 group-hover:text-signal sm:ml-0 md:mr-4 md:h-10 md:w-10"
                />
              </a>
            </motion.li>
          ))}
        </ul>

        <Reveal>
          <div className="grid gap-2 pt-12 text-sm text-muted-foreground md:grid-cols-2 md:gap-10">
            <p>
              Kristoffer Kirkerud — senior software engineer and solution
              architect based in Gothenburg, Sweden.
            </p>
            <p lang="sv">
              Systemutvecklare och lösningsarkitekt i Göteborg — fullstack,
              molnet och AI-driven utveckling.
            </p>
          </div>
        </Reveal>
        <Reveal>
          <footer className="flex flex-col gap-4 py-12 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} Kirkerud Development — kirkerud.dev
            </p>
            <p>Designed & built in Gothenburg</p>
            <a href="#top" className="transition-colors hover:text-foreground">
              Back to the beginning ↑
            </a>
          </footer>
        </Reveal>
      </div>
    </section>
  );
}
