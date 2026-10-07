import {
  type MotionValue,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { type StackLayer, stackLayers } from "~/lib/constants";
import { cn } from "~/lib/utils";
import { EASE, Eyebrow, MaskText, Reveal, useRange } from "./primitives";

const PLATE = 200; // px, side of the square before the isometric tilt
const DIAMOND_W = PLATE * Math.SQRT2;
const MIDDLE = (stackLayers.length - 1) / 2;
// Exploded gap between plates, shrinking as layers are added so the
// whole stack still fits a laptop-height viewport.
const SPREAD = Math.min(104, 460 / (stackLayers.length - 1));

function Plate({
  accent,
  size = PLATE,
}: {
  readonly accent?: boolean;
  readonly size?: number;
}) {
  return (
    <div
      className="grid shrink-0 place-items-center"
      style={{ width: size * Math.SQRT2, height: size * Math.SQRT2 * 0.5 }}
    >
      <div
        className={cn(
          "blueprint shrink-0 rounded-[10%] border bg-card shadow-[-9px_9px_0_0_hsl(var(--foreground)/0.12)]",
          accent && "border-signal bg-[hsl(var(--signal)/0.12)]",
        )}
        style={{
          width: size,
          height: size,
          transform: "rotateX(60deg) rotateZ(-45deg)",
          backgroundSize: `${size / 5}px ${size / 5}px`,
        }}
      />
    </div>
  );
}

function ExplodedLayer({
  layer,
  index,
  progress,
}: {
  readonly layer: StackLayer;
  readonly index: number;
  readonly progress: MotionValue<number>;
}) {
  const offset = index - MIDDLE;
  // Collapsed: plates nearly touching. Exploded: evenly spread out.
  const y = useRange(progress, [0, 1], [offset * 14, offset * SPREAD]);
  const start = 0.35 + index * 0.08;
  const labelOpacity = useRange(progress, [start, start + 0.2], [0, 1]);
  const labelX = useRange(progress, [start, start + 0.2], [-16, 0]);

  return (
    <motion.div
      className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center"
      style={{ y, zIndex: stackLayers.length - index }}
    >
      <Plate accent={index === 0} />
      <motion.div
        className="flex items-center gap-4"
        style={{ opacity: labelOpacity, x: labelX }}
      >
        <span className="h-px w-10 bg-foreground/30" />
        <div>
          <p className="text-sm font-semibold tracking-tight">
            {layer.name}
            <span className="ml-2 font-serif text-base font-normal italic text-muted-foreground">
              {layer.caption}
            </span>
          </p>
          <ul className="mt-2 flex max-w-lg flex-wrap gap-1.5">
            {layer.items.map((item) => (
              <li
                key={item}
                className="rounded-full border bg-background px-2.5 py-0.5 font-mono text-[11px]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

function StackIntro() {
  return (
    <div>
      <Eyebrow>Toolkit</Eyebrow>
      <h2 className="mt-6 text-[clamp(2.5rem,5.5vw,5rem)] font-semibold leading-[0.92] tracking-[-0.055em]">
        <MaskText text="Fullstack," />
        <MaskText
          text="literally."
          className="font-serif font-normal italic text-signal"
          delay={0.15}
        />
      </h2>
      <Reveal delay={0.2}>
        <p className="mt-6 max-w-sm text-muted-foreground">
          From AI-driven workflows on top to the infrastructure underneath —
          whatever layer the problem lives in, that's where I'll be.
        </p>
      </Reveal>
    </div>
  );
}

export function Stack() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Ease-out cubic: the plates fly apart quickly, then settle.
  const progress = useTransform(scrollYProgress, (latest) => {
    const t = Math.min(1, Math.max(0, (latest - 0.05) / 0.7));
    return 1 - (1 - t) ** 3;
  });

  return (
    <section ref={ref} id="toolkit" className="relative md:h-[260vh]">
      {/* One layout: pinned with the exploded stack on desktop, a plain
          list on mobile. The intro (and its heading) renders only once. */}
      <div className="mx-auto max-w-7xl px-5 py-24 md:sticky md:top-0 md:grid md:h-svh md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:items-center md:gap-10 md:px-10 md:py-0">
        <StackIntro />
        <div
          className="relative hidden h-[620px] md:block"
          style={{ minWidth: DIAMOND_W }}
        >
          {stackLayers.map((layer, index) => (
            <ExplodedLayer
              key={layer.name}
              layer={layer}
              index={index}
              progress={progress}
            />
          ))}
        </div>
        <ol className="mt-12 flex flex-col gap-8 md:hidden">
          {stackLayers.map((layer, index) => (
            <motion.li
              key={layer.name}
              className="flex items-start gap-4"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.7, ease: EASE, delay: index * 0.05 }}
            >
              <div className="-mt-1 shrink-0" aria-hidden>
                <Plate accent={index === 0} size={52} />
              </div>
              <div>
                <p className="text-sm font-semibold tracking-tight">
                  {layer.name}
                  <span className="ml-2 font-serif text-base font-normal italic text-muted-foreground">
                    {layer.caption}
                  </span>
                </p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {layer.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border bg-background px-2.5 py-0.5 font-mono text-[11px]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
