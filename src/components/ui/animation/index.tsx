import { motion, Target, TargetAndTransition } from "motion/react";

type AnimationPreset = {
  initial: Target;
  animate: TargetAndTransition;
  exit: TargetAndTransition;
  transition?: TargetAndTransition["transition"];
};

const PRESETS: Record<string, AnimationPreset> = {
  opacity: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3, ease: "easeInOut" }
  },

  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.35, ease: "easeOut" }
  },

  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.25, ease: "easeOut" }
  }
};

type AnimationProps = {
  animationKey?: string | number;
  children: React.ReactNode;

  animName?: keyof typeof PRESETS;

  initial?: Target;
  animate?: TargetAndTransition;
  exit?: TargetAndTransition;
  transition?: TargetAndTransition["transition"];
};

const Animation = ({
  animationKey,
  children,
  animName = "opacity",
  initial,
  animate,
  exit,
  transition
}: AnimationProps) => {
  const preset = PRESETS[animName];

  return (
    <motion.div
      key={animationKey}
      initial={initial ?? preset.initial}
      animate={animate ?? preset.animate}
      exit={exit ?? preset.exit}
      transition={transition ?? preset.transition}
    >
      {children}
    </motion.div>
  );
};

export default Animation;