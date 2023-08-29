"use client";
import { motion } from "framer-motion";

const Test = () => {
  const frameVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.5,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 200,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
      },
    },
  };
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <motion.ul initial="hidden" animate="visible" variants={frameVariants}>
        <motion.li variants={item}>Egg</motion.li>
        <motion.li variants={item}>Potato</motion.li>
        <motion.li variants={item}>Tomato</motion.li>
      </motion.ul>
    </div>
  );
};

export default Test;
