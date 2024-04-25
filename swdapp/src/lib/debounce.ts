let debounceTimer: number;
export const debounce = (func: Function, delay: number) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(func, delay);
};