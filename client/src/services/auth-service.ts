let logoutFn: (() => void) | null = null;

export const setLogout = (fn: () => void) => {
  logoutFn = fn;
};

export const triggerLogout = () => {
  logoutFn?.();
};
