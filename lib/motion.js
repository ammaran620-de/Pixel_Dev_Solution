export const EASE = {
  out:   [0.16, 1, 0.30, 1],    // standard reveal — snappy premium ease-out
  inOut: [0.65, 0, 0.35, 1],    // state changes, layout shifts
  snap:  [0.34, 1.56, 0.64, 1], // brackets, targeting locks — slight overshoot
};

export const DUR = { 
  fast: 0.22, 
  base: 0.5, 
  slow: 0.8, 
  scan: 1.4 
};

export const STAGGER = { 
  tight: 0.035, 
  base: 0.07, 
  loose: 0.11 
};
