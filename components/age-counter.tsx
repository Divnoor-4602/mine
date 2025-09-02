"use client";

import { motion, animate } from "motion/react";
import React, { useEffect, useMemo, useState } from "react";
import { useAnimatedCounter } from "@/hooks";
import { calculateTimePassed, calculateTimeLeft } from "@/lib/utils";

const AgeCounter = () => {
  // Create animated counter for the total time value
  const totalTimeCounter = useAnimatedCounter(0);
  // Create animated counter for the years left value
  const yearsLeftCounter = useAnimatedCounter(0);

  // Memoize the birth date calculation
  const birthDate = useMemo(() => new Date(2002, 5, 4), []);

  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    const calculateTotalTime = () => {
      // Use the utility function instead of duplicating the calculation
      return calculateTimePassed(4, 6, 2002); // day, month, year
    };

    const calculateYearsLeft = () => {
      // Use the new utility function for years left
      return calculateTimeLeft(4, 6, 2002); // day, month, year
    };

    // Set initial values
    const initialTime = calculateTotalTime();
    const initialYearsLeft = calculateYearsLeft();
    totalTimeCounter.motionValue.set(initialTime);
    yearsLeftCounter.motionValue.set(initialYearsLeft);

    // Update every 16ms (60fps) for smooth animation
    const interval = setInterval(() => {
      const currentTime = calculateTotalTime();
      const currentYearsLeft = calculateYearsLeft();

      // Animate both counters smoothly
      animate(totalTimeCounter.motionValue, currentTime, { duration: 0.016 });
      animate(yearsLeftCounter.motionValue, currentYearsLeft, {
        duration: 0.016,
      });
    }, 16);

    return () => clearInterval(interval);
  }, [birthDate, totalTimeCounter.motionValue, yearsLeftCounter.motionValue]);

  return (
    <motion.div
      className="flex items-center gap-1 cursor-default"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div className="text-xs font-medium font-mono mb-1 relative text-[var(--color-text)]">
        <motion.span
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {totalTimeCounter.displayValue.toFixed(20)}
        </motion.span>
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {yearsLeftCounter.displayValue.toFixed(20)}
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default AgeCounter;
