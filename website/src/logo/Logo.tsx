import { motion } from "motion/react";

export function SupernovaLogo() {
  return (
    <motion.svg
      viewBox="0 0 128 128"
      width={28}
      height={28}
      initial={{ rotate: 0, scale: 0.1 }}
      animate={{ rotate: 2880, scale: 1 }}
      transition={{ duration: 3 }}
      style={{ color: "var(--color-primary)", cursor: "pointer" }}
    >
      <motion.path
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        d="M64 8 L88 40 L120 64 L88 88 L64 120 L40 88 L8 64 L40 40 Z"
        fill="currentColor"
      />
      <motion.circle 
        initial={{ r: 0, opacity: 0 }}
        animate={{ r: [0, 30, 28, 32, 28], opacity: [0, 0.25, 0.1, 0.25, 0.1] }} 
        transition={{ duration: 4, times: [0, 0.2, 0.4, 0.7, 1], repeat: Infinity }}
        cx="64" cy="64" fill="currentColor"
      />
      <motion.circle 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }} 
        transition={{ delay: 1, type: "spring", bounce: 0.6 }}
        cx="64" cy="64" r="14"
        fill="currentColor" 
      />
      <motion.circle 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.8 }}
        cx="64" cy="64" r="4.5" 
        fill="white" 
      />
    </motion.svg>
  );
}
