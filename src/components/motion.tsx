"use client";

import { motion, type HTMLMotionProps } from "motion/react";

export const ease = [0.19, 1, 0.22, 1] as const;

/** Fades content up once it enters the viewport. */
export function Reveal({
  delay = 0,
  y = 28,
  className,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.1, delay, ease }}
      className={className}
      {...props}
    />
  );
}
