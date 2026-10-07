import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { useEffect, useState } from "react";
import { ModeToggle } from "~/components/mode-toggle";
import { EASE } from "./primitives";

const nav = [
  { href: "#journey", label: "Story" },
  { href: "#toolkit", label: "Toolkit" },
  { href: "#studio", label: "Studio" },
  { href: "#contact", label: "Contact" },
];

/** Gothenburg time, rendered only on the client so SSR and hydration agree. */
function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Stockholm",
    });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const interval = window.setInterval(tick, 15_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <span className="hidden font-mono text-xs tabular-nums text-muted-foreground sm:inline">
      Gothenburg <span className="text-foreground">{time ?? "--:--"}</span>
    </span>
  );
}

export function SiteHeader() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 160);
  });

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-md"
      initial={{ y: "-100%" }}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-6 px-5 md:px-10">
        <a
          href="#top"
          className="flex items-center gap-2 text-sm font-medium tracking-tight"
        >
          <span
            aria-hidden
            className="grid h-6 w-6 place-items-center rounded-full bg-foreground font-mono text-[10px] font-medium text-background"
          >
            KK
          </span>
          Kirkerud Development
        </a>
        <nav aria-label="Sections" className="ml-auto hidden md:block">
          <ul className="flex gap-6 text-sm text-muted-foreground">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-3 md:ml-0">
          <LocalTime />
          <ModeToggle />
        </div>
      </div>
      <motion.div
        aria-hidden
        className="absolute inset-x-0 -bottom-px h-px origin-left bg-signal"
        style={{ scaleX: progress }}
      />
    </motion.header>
  );
}
