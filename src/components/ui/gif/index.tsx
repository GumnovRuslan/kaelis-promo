"use client";

import { motion } from "framer-motion";
import styles from './styles.module.scss'

type TProps = {
  src: string;
  className?: string;
}

const LoopVideo = ({ src, className }: TProps) => {
  return (
    <motion.video
      className={`${styles.video} ${className}`}
      autoPlay
      loop
      muted
      playsInline
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <source src={src} type="video/mp4" />
    </motion.video>
  );
}

export default LoopVideo