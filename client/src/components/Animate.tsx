/**
 * Animate.tsx — Shared animation primitives for psycheevo.
 * Style: smooth & minimal (fade-up on scroll, stagger children, page fade-in)
 */
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

// ─── Shared variants ─────────────────────────────────────────────────────────

const ease = [0.25, 0.4, 0.25, 1] as const;

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
};

export const fadeInVariant: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.4, ease },
  },
};

export const staggerVariant: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

// ─── Components ──────────────────────────────────────────────────────────────

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Fades an element up into view when it enters the viewport.
 * Use for section headings, single blocks, CTAs.
 */
export function FadeUp({ children, className = "", delay = 0 }: Props) {
  return (
    <motion.div
      className={className}
      variants={fadeUpVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-72px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Fades an element in (no y-movement) on scroll.
 * Use for decorative elements, background accents.
 */
export function FadeIn({ children, className = "", delay = 0 }: Props) {
  return (
    <motion.div
      className={className}
      variants={fadeInVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-72px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Container that staggers its direct children as they enter the viewport.
 * Wrap a grid or list — children should be FadeUp or motion.div with fadeUpVariant.
 */
export function Stagger({ children, className = "" }: Omit<Props, "delay">) {
  return (
    <motion.div
      className={className}
      variants={staggerVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-72px" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * A stagger child — use inside <Stagger> containers.
 * Picks up the stagger timing from the parent automatically.
 */
export function StaggerItem({ children, className = "" }: Omit<Props, "delay">) {
  return (
    <motion.div className={className} variants={fadeUpVariant}>
      {children}
    </motion.div>
  );
}

/**
 * Page-level wrapper — fades the entire page in on mount.
 * Wrap each page's root div with this.
 */
export function PageFade({ children, className = "" }: Omit<Props, "delay">) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
