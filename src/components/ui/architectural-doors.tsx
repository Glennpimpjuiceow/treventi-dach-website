"use client";

import { motion, type Transition } from "framer-motion";

const CYCLE = 16;

function pathTrans(delay: number): Transition {
  return {
    duration: CYCLE,
    delay,
    repeat: Number.POSITIVE_INFINITY,
    times: [0, 0.18, 0.82, 1],
    ease: "easeInOut",
  };
}

function fadeTrans(delay: number): Transition {
  return {
    duration: CYCLE,
    delay,
    repeat: Number.POSITIVE_INFINITY,
    times: [0, 0.15, 0.85, 1],
    ease: "easeInOut",
  };
}

const drawnPath = (d: string, delay: number, strokeWidth = 0.5) => (
  <motion.path
    d={d}
    stroke="currentColor"
    strokeWidth={strokeWidth}
    fill="none"
    initial={{ pathLength: 0 }}
    animate={{ pathLength: [0, 1, 1, 1] }}
    transition={pathTrans(delay)}
  />
);

function DoorPlan({ delay, transform }: { delay: number; transform: string }) {
  return (
    <motion.g
      transform={transform}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.55, 0.55, 0] }}
      transition={fadeTrans(delay)}
    >
      {/* Door frame outer */}
      {drawnPath("M 0 0 L 80 0 L 80 200 L 0 200 Z", delay, 0.6)}
      {/* Top panel */}
      {drawnPath("M 8 12 L 72 12 L 72 90 L 8 90 Z", delay + 0.6, 0.35)}
      {/* Bottom panel */}
      {drawnPath("M 8 110 L 72 110 L 72 188 L 8 188 Z", delay + 0.9, 0.35)}
      {/* Handle */}
      <motion.circle
        cx="70"
        cy="100"
        r="1.6"
        fill="currentColor"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 1, 1] }}
        transition={fadeTrans(delay + 1.5)}
      />
      {/* Dimension line top */}
      {drawnPath("M 0 -10 L 80 -10", delay + 1.8, 0.3)}
      {drawnPath("M 0 -7 L 0 -13 M 80 -7 L 80 -13", delay + 2, 0.3)}
      {/* Dimension text */}
      <motion.text
        x="40"
        y="-14"
        textAnchor="middle"
        fontSize="6"
        fill="currentColor"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={fadeTrans(delay + 2.2)}
      >
        860
      </motion.text>
      {/* Dimension line side */}
      {drawnPath("M 90 0 L 90 200", delay + 2.4, 0.3)}
      {drawnPath("M 87 0 L 93 0 M 87 200 L 93 200", delay + 2.6, 0.3)}
      <motion.text
        x="98"
        y="103"
        fontSize="6"
        fill="currentColor"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={fadeTrans(delay + 2.8)}
      >
        2100
      </motion.text>
    </motion.g>
  );
}

function DoorSwing({ delay, transform }: { delay: number; transform: string }) {
  return (
    <motion.g
      transform={transform}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.5, 0.5, 0] }}
      transition={fadeTrans(delay)}
    >
      {/* Wall vertical */}
      {drawnPath("M 0 80 L 0 0", delay, 1.2)}
      {/* Wall continues right */}
      {drawnPath("M 80 0 L 110 0", delay + 0.4, 1.2)}
      {/* Door (open position, horizontal) */}
      {drawnPath("M 0 0 L 80 0", delay + 0.8, 0.8)}
      {/* Swing arc (90deg) */}
      {drawnPath("M 80 0 A 80 80 0 0 0 0 80", delay + 1.4, 0.4)}
      {/* Hinge dot */}
      <motion.circle
        cx="0"
        cy="0"
        r="1.5"
        fill="currentColor"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 1, 1] }}
        transition={fadeTrans(delay + 0.2)}
      />
    </motion.g>
  );
}

function CrossSection({
  delay,
  transform,
}: {
  delay: number;
  transform: string;
}) {
  return (
    <motion.g
      transform={transform}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.5, 0.5, 0] }}
      transition={fadeTrans(delay)}
    >
      {/* Outer profile */}
      {drawnPath("M 0 0 L 22 0 L 22 200 L 0 200 Z", delay, 0.5)}
      {/* Inner core */}
      {drawnPath("M 4 6 L 18 6 L 18 194 L 4 194 Z", delay + 0.5, 0.3)}
      {/* Layer hatching */}
      {drawnPath(
        "M 4 30 L 18 30 M 4 60 L 18 60 M 4 90 L 18 90 M 4 120 L 18 120 M 4 150 L 18 150 M 4 180 L 18 180",
        delay + 1,
        0.2,
      )}
      {/* Side dimension */}
      {drawnPath("M 30 0 L 30 200", delay + 1.5, 0.3)}
      {drawnPath("M 27 0 L 33 0 M 27 200 L 33 200", delay + 1.7, 0.3)}
      <motion.text
        x="38"
        y="103"
        fontSize="5"
        fill="currentColor"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={fadeTrans(delay + 2)}
      >
        Schnitt A-A
      </motion.text>
    </motion.g>
  );
}

export default function ArchitecturalDoors() {
  return (
    <>
      {/* Mobile (portrait) layout — visible <md */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden md:hidden">
        <svg
          className="h-full w-full text-foreground"
          viewBox="0 0 400 720"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          {/* Top-right small swing */}
          <DoorSwing delay={0} transform="translate(310 70) scale(0.5)" />
          {/* Mid-right small plan */}
          <DoorPlan delay={4} transform="translate(290 290) scale(0.5)" />
          {/* Bottom-right cross section */}
          <CrossSection delay={8} transform="translate(355 470) scale(0.55)" />
          {/* Bottom-left tiny swing */}
          <DoorSwing delay={11} transform="translate(40 600) scale(0.35)" />
        </svg>
      </div>

      {/* Tablet/Desktop (landscape) layout — visible md+ */}
      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block">
        <svg
          className="h-full w-full text-foreground"
          viewBox="0 0 1400 800"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <DoorPlan delay={0} transform="translate(950 230)" />
          <DoorSwing delay={3} transform="translate(1140 90) scale(0.75)" />
          <CrossSection delay={6} transform="translate(1290 250)" />
          <DoorPlan delay={9} transform="translate(1100 560) scale(0.55)" />
          <DoorSwing delay={5} transform="translate(110 660) scale(0.5)" />
          <DoorSwing delay={12} transform="translate(1340 620) scale(0.4)" />
        </svg>
      </div>
    </>
  );
}
