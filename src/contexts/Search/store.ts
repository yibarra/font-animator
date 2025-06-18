import { create } from 'zustand'

interface ISearchState {
  urlParams: Record<string, string>
  setParam: (key: string, value: string) => void
  removeParam: (key: string) => void
  clearParams: () => void
  loadParamsFromUrl: () => void
}

export const useSearchStore = create<ISearchState>((set) => ({
  urlParams: {},

  // load
  loadParamsFromUrl: () => {
    const params = new URLSearchParams(window.location.search)
    const newParams: Record<string, string> = {}

    for (const [key, value] of params.entries()) {
      newParams[key] = value
    }

    set({ urlParams: newParams })
  },

  // set param
  setParam: (key, value) => {
    set(state => {
      const newParams = { ...state.urlParams, [key]: value }
      updateUrl(newParams)
      return { urlParams: newParams }
    })
  },

  // remove key
  removeParam: (key) => {
    set(state => {
      const newParams = { ...state.urlParams }
      delete newParams[key]

      updateUrl(newParams)
      return { urlParams: newParams }
    })
  },

  // clear
  clearParams: () => {
    set(() => {
      updateUrl({})

      return { urlParams: {} }
    })
  },
}))

// update url
const updateUrl = (params: Record<string, string>) => {
  const searchParams = new URLSearchParams()
  
  for (const key in params) {
    searchParams.set(key, params[key])
  }

  window.history.pushState(
    {},
    '',
    `${window.location.pathname}?${searchParams.toString()}${window.location.hash}`
  )
}