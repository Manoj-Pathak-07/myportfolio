'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';
import { cn } from '@/lib/utils';

const hiddenWord: Variants = {
  hidden: { y: '110%', opacity: 0, rotateX: -18 },
};

function visibleWord(reduce: boolean | null): Variants {
  return {
    visible: {
      y: '0%',
      opacity: 1,
      rotateX: 0,
      transition: reduce
        ? { duration: 0 }
        : {
            duration: 0.78,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          },
    },
  };
}

/**
 * A quiet word-by-word reveal for display copy. The full string stays in the
 * accessibility tree while the visible words are animated independently.
 */
export function TextReveal({
  text,
  className,
  delay = 0,
  stagger = 0.032,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <span className={cn('inline', className)}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        className="inline"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={{
          hidden: {},
          visible: {
            transition: reduce
              ? { staggerChildren: 0, delayChildren: 0 }
              : { staggerChildren: stagger, delayChildren: delay },
          },
        }}
      >
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className={cn(
              'inline-block overflow-hidden pb-[0.12em] align-bottom',
              index < words.length - 1 && 'mr-[0.24em]',
            )}
          >
            <motion.span
              className="inline-block"
              variants={{ ...hiddenWord, ...visibleWord(reduce) }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </span>
  );
}
