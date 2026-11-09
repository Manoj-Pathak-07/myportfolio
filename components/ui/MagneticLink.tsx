'use client';

import Link from 'next/link';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MagneticLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export function MagneticLink({
  href,
  children,
  className,
  variant = 'primary',
}: MagneticLinkProps) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 320, damping: 24, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 320, damping: 24, mass: 0.4 });

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      className="inline-flex"
      onPointerMove={(event) => {
        if (reduce) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - bounds.left - bounds.width / 2) * 0.14);
        y.set((event.clientY - bounds.top - bounds.height / 2) * 0.18);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <Link
        href={href}
        className={cn(
          variant === 'primary' ? 'button-primary' : 'button-secondary',
          className,
        )}
      >
        {children}
      </Link>
    </motion.div>
  );
}
