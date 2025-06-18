type TimeoutId = ReturnType<typeof setTimeout>

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeout: TimeoutId | null = null;

  return function(...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args)
      timeout = null
    }, delay)
  };
}