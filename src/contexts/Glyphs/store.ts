import { create } from 'zustand'

import type { IGlyph, IGlyphsState } from './interfaces'

export const useGlyphsStore = create<IGlyphsState>((set) => ({
  current: 0,
  glyphs: [],

  // add glyph
  addGlyph: (charIndex, x, y, axes) =>
    set((state) => {
      const id =
        Date.now().toString() + Math.random().toString(36).substr(2, 9)
      const defaultProperties = { fontSize: 64, fill: "#e3e9f9", textBaseline: 'alphabetic', stroke: "none", strokeWidth: 0 }

      const glyph: IGlyph = {
        id,
        axes,
        easing: 'lineal',
        charIndex,
        frames: [
          {
            axes,
            position: [x, y],
            rotation: 0
          },
          {
            axes,
            position: [x, y],
            rotation: 0
          },
        ],
        properties: defaultProperties,
        position: [x, y],
        rotation: 0,
      }

      return { current: charIndex, glyphs: [...state.glyphs, glyph] }
    }),

  // remove glyph
  remove: (id) =>
    set((state) => ({
      glyphs: state.glyphs.filter((glyph) => glyph.id !== id),
    })),

  setCurrent: (current) => {
    set({ current })
  },

  updateGlyphs: (newGlyphs) =>
    set((state) => ({
      glyphs: state.glyphs.map((old) =>
        newGlyphs.find((g) => g.id === old.id) || old
      ),
    })),

  updateGlyph: (id, charIndex) =>
    set((state) => ({
      glyphs: state.glyphs.map((g) =>
        g.id === id ? { ...g, charIndex } : g
      ),
    })),

  updateGlyphProperties: (id, properties) =>
    set((state) => ({
      glyphs: state.glyphs.map((g) =>
        g.id === id
          ? { ...g, properties: { ...g.properties, ...properties } }
          : g
      ),
    })),

    updateGlyphAxes: (id: string, axes: Record<string, number>, frame?: number) =>
      set((state) => ({
        glyphs: state.glyphs.map((g) => {
          if (g.id !== id) {
            return g
          }

          let frames = g.frames

          if (typeof frame === 'number' && frames[frame]) {
            frames = [...frames]
            frames[frame] = { ...frames[frame], axes }
          }

          return { ...g, axes, frames }
        }),
      })),

    updateGlyphRotation: (id: string, rotation: number, frame?: number) =>
      set((state) => ({
        glyphs: state.glyphs.map((g) => {
          if (g.id !== id) {
            return g
          }

          let frames = g.frames

          if (typeof frame === 'number' && frames[frame]) {
            frames = [...frames]
            frames[frame] = { ...frames[frame], rotation }
          }

          return { ...g, rotation, frames }
        }),
      })),

    updateGlyphPosition: (id: string, position: [number, number], frame?: number) =>
      set((state) => ({
        glyphs: state.glyphs.map((g) => {
          if (g.id !== id) {
            return g
          }

          let frames = g.frames

          if (typeof frame === 'number' && frames[frame]) {
            frames = [...frames]
            frames[frame] = { ...frames[frame], position }
          }
          
          return { ...g, position, frames }
        }),
      })),

  // update frames (axes instance)
  updateGlyphFrames: (id, frames) =>
    set((state) => ({
      glyphs: state.glyphs.map((glyph) =>
        glyph.id === id ? { ...glyph, frames } : glyph
      ),
    })),

  // empty
  empty: () => set({ glyphs: [] }),
}))
