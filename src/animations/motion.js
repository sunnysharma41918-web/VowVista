export const transitions = {
  outExpo: [0.16, 1, 0.3, 1],
  smooth: [0.25, 0.1, 0.25, 1],
};

export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.6, ease: transitions.outExpo },
};

export const dropdownVariants = {
  initial: { opacity: 0, y: 12, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 10, scale: 0.98 },
  transition: { duration: 0.22, ease: transitions.outExpo },
};

export const staggerContainer = (staggerDelay = 0.08) => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren: staggerDelay,
    },
  },
});
