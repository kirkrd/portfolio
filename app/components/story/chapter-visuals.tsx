import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { ChapterVisual } from "~/lib/constants";
import { cn } from "~/lib/utils";
import { EASE } from "./primitives";

function Frame({
  children,
  className,
  frameRef,
  caption,
}: {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly frameRef: React.RefObject<HTMLDivElement | null>;
  readonly caption: string;
}) {
  return (
    <figure className="m-0">
      <div
        ref={frameRef}
        aria-hidden
        className={cn(
          "blueprint relative aspect-[16/11] overflow-hidden rounded-2xl border bg-card",
          className,
        )}
      >
        {children}
      </div>
      <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}

/* ── Chapter 1: five client assignments fan out like documents ─────────── */

const documents = [
  { client: "AFRY", date: "Oct ’18" },
  { client: "Tele2", date: "Feb ’19" },
  { client: "HSB", date: "Apr ’19" },
  { client: "Polestar", date: "Jun ’19" },
  { client: "KPMG", date: "Aug ’19" },
];

function Documents() {
  const ref = useRef<HTMLDivElement>(null);
  const open = useInView(ref, { amount: 0.6 });
  return (
    <Frame frameRef={ref} caption="Fig. 1 — Five assignments, ten months">
      <div className="absolute inset-0 flex items-center justify-center">
        {documents.map((document, index) => {
          const offset = index - 2;
          return (
            <motion.div
              key={document.client}
              className={cn(
                "absolute flex aspect-[3/4] w-[30%] flex-col gap-[6%] rounded-lg border bg-background p-[5%] shadow-[0_18px_40px_-20px_rgba(0,0,0,0.35)]",
                offset > 0 && "items-end text-right",
              )}
              style={{ zIndex: 10 - Math.abs(offset) }}
              initial={false}
              animate={
                open
                  ? {
                      x: `${offset * 54}%`,
                      y: `${Math.abs(offset) * 7}%`,
                      rotate: offset * 7,
                    }
                  : { x: "0%", y: `${-index * 2}%`, rotate: offset * 1.5 }
              }
              transition={{
                duration: 1,
                ease: EASE,
                delay: open ? 0.08 * Math.abs(offset) : 0,
              }}
            >
              <div
                className={cn(
                  "flex w-full items-center justify-between font-mono text-[clamp(7px,1.1vw,11px)] text-muted-foreground",
                  offset > 0 && "flex-row-reverse",
                )}
              >
                <span>{document.date}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              </div>
              <p className="text-[clamp(10px,1.8vw,17px)] font-semibold tracking-tight">
                {document.client}
              </p>
              <div
                className={cn(
                  "mt-auto flex w-full flex-col gap-[0.4em]",
                  offset > 0 && "items-end",
                )}
              >
                {[90, 70, 82, 46].map((width) => (
                  <span
                    key={width}
                    className="h-[3px] rounded-full bg-foreground/10"
                    style={{ width: `${width}%` }}
                  />
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </Frame>
  );
}

/* ── Chapter 2: the same fleet product on web and mobile ──────────────── */

const fleetRows = [
  { width: 64, status: "bg-emerald-500" },
  { width: 48, status: "bg-emerald-500" },
  { width: 72, status: "bg-amber-500" },
  { width: 56, status: "bg-emerald-500" },
];
const bars = [38, 62, 45, 80, 58, 92, 70];

function Devices() {
  const ref = useRef<HTMLDivElement>(null);
  const shown = useInView(ref, { amount: 0.5, once: true });
  const reduce = useReducedMotion();

  return (
    <Frame frameRef={ref} caption="Fig. 2 — One product, web and mobile">
      {/* Browser */}
      <motion.div
        className="absolute top-[12%] left-[6%] flex h-[76%] w-[64%] flex-col overflow-hidden rounded-lg border bg-background shadow-[0_18px_40px_-24px_rgba(0,0,0,0.4)]"
        initial={{ opacity: 0, y: 30 }}
        animate={shown ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <div className="flex items-center gap-1 border-b px-[3%] py-[2.5%]">
          {["a", "b", "c"].map((dot) => (
            <span
              key={dot}
              className="h-1.5 w-1.5 rounded-full bg-foreground/20"
            />
          ))}
          <span className="ml-[4%] h-2 w-1/3 rounded-full bg-foreground/10" />
        </div>
        <div className="grid flex-1 grid-cols-[22%_1fr] gap-[4%] p-[4%]">
          <div className="flex flex-col gap-2">
            {[80, 60, 70, 50].map((width) => (
              <span
                key={width}
                className="h-1.5 rounded-full bg-foreground/10"
                style={{ width: `${width}%` }}
              />
            ))}
          </div>
          <div className="flex flex-col gap-[6%]">
            <div className="flex h-[38%] items-end gap-[5%]">
              {bars.map((height, index) => (
                <motion.span
                  key={height}
                  className={cn(
                    "flex-1 origin-bottom rounded-t-sm",
                    index === 5 ? "bg-signal" : "bg-foreground/15",
                  )}
                  style={{ height: `${height}%` }}
                  initial={{ scaleY: 0 }}
                  animate={shown ? { scaleY: 1 } : undefined}
                  transition={{
                    duration: 0.8,
                    ease: EASE,
                    delay: 0.5 + index * 0.06,
                  }}
                />
              ))}
            </div>
            {fleetRows.map((row, index) => (
              <motion.div
                key={row.width}
                className="flex items-center gap-[4%]"
                initial={{ opacity: 0, x: -12 }}
                animate={shown ? { opacity: 1, x: 0 } : undefined}
                transition={{
                  duration: 0.6,
                  ease: EASE,
                  delay: 0.9 + index * 0.1,
                }}
              >
                <span className="h-2 w-2 shrink-0 rounded-sm bg-foreground/25" />
                <span
                  className="h-1.5 rounded-full bg-foreground/15"
                  style={{ width: `${row.width}%` }}
                />
                <span
                  className={cn(
                    "ml-auto h-1.5 w-1.5 shrink-0 rounded-full",
                    row.status,
                  )}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Phone */}
      <motion.div
        className="absolute top-[16%] right-[7%] flex h-[72%] w-[23%] flex-col overflow-hidden rounded-[14px] border-2 border-foreground/80 bg-background shadow-[0_24px_40px_-20px_rgba(0,0,0,0.45)]"
        initial={{ opacity: 0, y: 50, rotate: 6 }}
        animate={shown ? { opacity: 1, y: 0, rotate: 0 } : undefined}
        transition={{ duration: 1.1, ease: EASE, delay: 0.25 }}
      >
        <span className="mx-auto mt-[6%] h-1 w-1/3 rounded-full bg-foreground/80" />
        <svg
          viewBox="0 0 100 110"
          className="mt-[8%] w-full"
          aria-hidden="true"
        >
          <motion.path
            d="M14 96 C 20 60, 60 80, 54 50 S 80 20, 86 12"
            fill="none"
            className="stroke-signal"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={shown ? { pathLength: 1 } : undefined}
            transition={{ duration: 1.6, ease: "easeInOut", delay: 0.8 }}
          />
          <circle cx="14" cy="96" r="5" className="fill-foreground" />
          <motion.circle
            cx="86"
            cy="12"
            r="5"
            className="fill-signal"
            initial={{ scale: 0 }}
            animate={shown ? { scale: reduce ? 1 : [0, 1.4, 1] } : undefined}
            transition={{ duration: 0.6, delay: 2.3 }}
          />
        </svg>
        <div className="mt-auto flex flex-col gap-1.5 p-[10%]">
          <span className="h-1.5 w-3/4 rounded-full bg-foreground/20" />
          <span className="h-1.5 w-1/2 rounded-full bg-foreground/10" />
        </div>
      </motion.div>
    </Frame>
  );
}

/* ── Chapter 3: a configurator cycling through paint ──────────────────── */

const paints = [
  { name: "Snow", hex: "#e8e6e1" },
  { name: "Midnight", hex: "#1c2230" },
  { name: "Storm", hex: "#6c7178" },
  { name: "Jupiter", hex: "#b3a68c" },
];
const steps = ["Model", "Paint", "Wheels", "Interior"];

function Configurator() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const interval = window.setInterval(
      () => setActive((current) => (current + 1) % paints.length),
      2200,
    );
    return () => window.clearInterval(interval);
  }, [inView]);

  const paint = paints[active];

  return (
    <Frame frameRef={ref} caption="Fig. 3 — Configure, then order">
      <div className="absolute inset-x-[6%] top-[8%] flex gap-[3%] font-mono text-[clamp(7px,1.1vw,11px)] uppercase tracking-[0.14em]">
        {steps.map((step) => (
          <span
            key={step}
            className={cn(
              "flex-1 border-t-2 pt-2",
              step === "Paint"
                ? "border-signal text-foreground"
                : "border-foreground/15 text-muted-foreground",
            )}
          >
            {step}
          </span>
        ))}
      </div>

      <div className="absolute inset-x-[6%] top-[24%] bottom-[10%] flex items-center gap-[8%]">
        <div className="relative aspect-square h-full">
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ backgroundColor: paint.hex }}
            transition={{ duration: 0.9, ease: EASE }}
          />
          {/* Lacquer highlight and floor shadow */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_32%_26%,rgba(255,255,255,0.75),rgba(255,255,255,0)_38%),radial-gradient(circle_at_70%_85%,rgba(0,0,0,0.35),rgba(0,0,0,0)_55%)]" />
          <div className="absolute -bottom-[8%] left-1/2 h-[6%] w-[70%] -translate-x-1/2 rounded-[50%] bg-black/25 blur-md" />
        </div>

        <div className="flex flex-1 flex-col gap-[clamp(10px,2.2vw,24px)]">
          <div className="relative h-[clamp(18px,3.2vw,34px)] overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.p
                key={paint.name}
                className="text-[clamp(14px,2.6vw,28px)] font-semibold leading-none tracking-tight"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                {paint.name}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="flex gap-[8%]">
            {paints.map((swatch, index) => (
              <span
                key={swatch.name}
                className="relative grid aspect-square w-[18%] place-items-center"
              >
                {index === active ? (
                  <motion.span
                    layoutId="paint-ring"
                    className="absolute -inset-[18%] rounded-full border-2 border-signal"
                    transition={{ duration: 0.6, ease: EASE }}
                  />
                ) : null}
                <span
                  className="h-full w-full rounded-full border border-foreground/10"
                  style={{ backgroundColor: swatch.hex }}
                />
              </span>
            ))}
          </div>
          <span className="h-1.5 w-2/3 rounded-full bg-foreground/10" />
        </div>
      </div>
    </Frame>
  );
}

/* ── Chapter 4: an event-driven system wiring itself up ───────────────── */

const nodes = [
  { id: "client", label: "Client", x: 14, y: 50 },
  { id: "api", label: "API", x: 36, y: 50 },
  { id: "bus", label: "Events", x: 58, y: 50 },
  { id: "orders", label: "Service", x: 78, y: 22 },
  { id: "billing", label: "Service", x: 78, y: 78 },
  { id: "data", label: "Data", x: 94, y: 50 },
];
const edges: [string, string][] = [
  ["client", "api"],
  ["api", "bus"],
  ["bus", "orders"],
  ["bus", "billing"],
  ["orders", "data"],
  ["billing", "data"],
];

function node(id: string) {
  const found = nodes.find((candidate) => candidate.id === id);
  if (!found) throw new Error(`Unknown node ${id}`);
  return found;
}

function SystemDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const shown = useInView(ref, { amount: 0.5, once: true });
  const reduce = useReducedMotion();

  // viewBox is 100 × 69 to match the 16:11 frame.
  const toY = (y: number) => (y / 100) * 69;

  return (
    <Frame
      frameRef={ref}
      caption="Fig. 4 — Design the system, build it with agents"
    >
      <svg
        viewBox="0 0 100 69"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {edges.map(([from, to], index) => {
          const a = node(from);
          const b = node(to);
          const midX = (a.x + b.x) / 2;
          const d = `M ${a.x} ${toY(a.y)} C ${midX} ${toY(a.y)}, ${midX} ${toY(b.y)}, ${b.x} ${toY(b.y)}`;
          return (
            <g key={`${from}-${to}`}>
              <motion.path
                d={d}
                fill="none"
                className="stroke-foreground/30"
                strokeWidth="0.4"
                initial={{ pathLength: 0 }}
                animate={shown ? { pathLength: 1 } : undefined}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                  delay: 0.3 + index * 0.18,
                }}
              />
              {shown && !reduce ? (
                <circle r="0.9" className="fill-signal">
                  <animateMotion
                    dur="2.2s"
                    begin={`${1.6 + index * 0.3}s`}
                    repeatCount="indefinite"
                    path={d}
                  />
                </circle>
              ) : null}
            </g>
          );
        })}
      </svg>
      {nodes.map((item, index) => (
        <motion.span
          key={item.id}
          className={cn(
            "absolute -translate-x-1/2 -translate-y-1/2 rounded-md border bg-background px-[1.6%] py-[1%] font-mono text-[clamp(7px,1.15vw,12px)] whitespace-nowrap shadow-sm",
            item.id === "bus" && "border-signal text-signal",
          )}
          style={{ left: `${item.x}%`, top: `${item.y}%` }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={shown ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 + index * 0.18 }}
        >
          {item.label}
        </motion.span>
      ))}
    </Frame>
  );
}

export function ChapterVisualFor({
  visual,
}: {
  readonly visual: ChapterVisual;
}) {
  switch (visual) {
    case "documents":
      return <Documents />;
    case "devices":
      return <Devices />;
    case "configurator":
      return <Configurator />;
    case "system":
      return <SystemDiagram />;
  }
}
