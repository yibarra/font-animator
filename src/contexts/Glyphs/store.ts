import { create } from 'zustand'

import type { IGlyph, IGlyphsState } from './interfaces'

export const useGlyphsStore = create<IGlyphsState>((set) => ({
  glyphs: [],

  // add glyph
  addGlyph: (charIndex) =>
    set((state) => {
      const id =
        Date.now().toString() + Math.random().toString(36).substr(2, 9)
      const defaultProperties = { fontSize: 24, fill: "#e3e9f9", stroke: "none", strokeWidth: 0 }

      const glyph: IGlyph = {
        id,
        axes: {},
        easing: 'lineal',
        charIndex,
        frames: [
          {
            axes: {},
            position: [0, 100],
            rotation: 0
          },
          {
            axes: {},
            position: [0, 0],
            rotation: 0
          },
        ],
        properties: defaultProperties,
        position: [0, 100],
        rotation: 0,
      };

      return { glyphs: [...state.glyphs, glyph] }
    }),

  // remove glyph
  remove: (id) =>
    set((state) => ({
      glyphs: state.glyphs.filter((glyph) => glyph.id !== id),
    })),

  updateGlyphs: (newGlyphs) =>
    set((state) => ({
      glyphs: state.glyphs.map((old) =>
        newGlyphs.find((g) => g.id === old.id) || old
      ),
    })),

  updateGlyph: (id, glyph) =>
    set((state) => ({
      glyphs: state.glyphs.map((g) =>
        g.id === id ? { ...g, ...glyph } : g
      ),
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
