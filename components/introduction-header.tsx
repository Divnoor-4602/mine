"use client";

import React from "react";
import AgeCounter from "./age-counter";
import { motion } from "motion/react";

const IntroductionHeader = () => {
  return (
    <header className="space-y-6 max-sm:pt-3">
      <div className="flex items-end justify-between max-sm:flex-col-reverse max-sm:items-start">
        {/* Introduction */}
        <motion.h1
          className="font-bold text-2xl tracking-tight pt-2 text-[var(--color-text)]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Hey, I&apos;m Divnoor
        </motion.h1>
        {/* age counter */}
        <div className="max-sm:flex max-sm:justify-end max-sm:w-full">
          <AgeCounter />
        </div>
      </div>
      {/* bio */}
      <motion.div
        className="text-sm font-medium text-[var(--color-bio)]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut", delay: 0.1 }}
        viewport={{ once: true }}
      >
        I&apos;m a software engineer from Vancouver 🇨🇦, currently building{" "}
        <span className="text-[var(--color-text)] font-bold">Radal</span> and{" "}
        <span className="text-[var(--color-text)] font-bold">notes0</span>. I
        research LLMs and have a passion for design.
      </motion.div>
    </header>
  );
};

export default IntroductionHeader;
