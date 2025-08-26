import { create } from 'zustand'

interface UseLocalStorageState<T> {
  storedValue: T;
  setValue: (value: T | ((val: T) => T)) => void
}

function useLocalStorage<T>(key: string, initialValue: T) {
  const useStore = create<UseLocalStorageState<T>>((set, get) => ({
    storedValue: (() => {
      try {
        if (typeof window === "undefined") {
          return initialValue
        }

        const item = window.localStorage.getItem(key)

        return item ? JSON.parse(item) : initialValue
      } catch (error) {
        throw new Error("An error occurred: " + error)
      }
    })(),

    setValue: (value: T | ((val: T) => T)) => {
      try {
        const storedValue = get().storedValue
        const valueToStore =
          value instanceof Function ? value(storedValue) : value

        // update store
        set({ storedValue: valueToStore })

        // update localStorage
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (error) {
        throw new Error("An error occurred: " + error)
      }
    },
  }))

  return [
    useStore((state) => state.storedValue),
    useStore((state) => state.setValue),
  ] as const
}

export default useLocalStorage
