import { create } from 'zustand'
import * as fontkit from 'fontkit'

import { setFontFace } from './utils'
import type { IFontState } from './interfaces'

export const useFontStore = create<IFontState>((set) => ({
  fontLoaded: false,
  font: undefined,
  setFontLoaded: (loaded) => set({ fontLoaded: loaded }),

  // loads initial font from public directory
  loadInitialFont: async (url: string) => {
    try {
      const response = await fetch(url)

      const buffer = await response.arrayBuffer()
      const bytes = new Uint8Array(buffer)

      const font = fontkit.create(bytes) 
      
      set({ font, fontLoaded: true })
      setFontFace(bytes, font.familyName) 
    } catch (err) {
      console.error('[ERROR LOADING FONT: fontkit]', err)
      set({ fontLoaded: false }) 
    }
  },

  // reads font file from user input via FileReader
  onReadFile: async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = async (event) => {
        try {
          const result = event?.target?.result

          if (result === null || result === undefined || !(result instanceof ArrayBuffer)) {
            reject(new Error('[ERROR FILE READ NOT ARRAYBUFFER]: File read result is not a valid ArrayBuffer'))
            return
          }
        
          const bytes = new Uint8Array(result)
          const newFont = fontkit.create(bytes) 
          
          set({ font: newFont, fontLoaded: true })
          setFontFace(bytes, newFont.familyName)
          
          resolve() 
        } catch (err) {
          console.error('[ERROR PROCESSING FILE]:', err)
          set({ fontLoaded: false })
          reject(err)
        }
      }

      reader.onerror = (err) => {
        console.error('[ERROR READ FILE]:', err?.target?.error?.message || err.toString())
        set({ fontLoaded: false })
        reject(err)
      }

      reader.readAsArrayBuffer(file)
    })
  },
}))
