import { create } from 'zustand'

import type { IGlyph, IGlyphsState } from './interfaces'

export const useGlyphsStore = create<IGlyphsState>((set) => ({
  current: null,
  glyphs: [{
    id: '1',
    charIndex: 16,
    easing: 'lineal',
    frames: [{
      axes: {
        wdth: 30,
        wght: 0
      },
      position: [10, 600],
      properties: {
        fill: 'blue',
        fontSize: 124,
        stroke: 'orange',
        strokeWidth: 2,
        dash: [100, 10],
        lineCap: 'butt',
        lineJoin: 'bevel',
        rotation: 10,
      },
    }],
  }, {
    id: '2',
    charIndex: 17,
    easing: 'lineal',
    frames: [{
      axes: {
        wdth: 100,
        wght: 100,
      },
      position: [100, 400],
      properties: {
        fill: 'red',
        fontSize: 124,
        stroke: 'none',
        strokeWidth: 0,
        dash: [0, 0],
        lineCap: 'butt',
        lineJoin: 'bevel',
        rotation: 0,
      },
    }],
  }],

  // add glyph
  add: (newGlyph) => set((state) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9)
    const defaultProperties = { fill: 'red', stroke: 'none', strokeWidth: 0 }

    const glyph: IGlyph = {
      id,
      ...newGlyph,
      frames: [{
        axes: {},
        position: [0, 0],
        properties: defaultProperties,
      }],
    }

    return { glyphs: [...state.glyphs, glyph] }
  }),

  // remove glyph
  remove: (id) => set((state) => ({
    glyphs: state.glyphs.filter((glyph) => glyph.id !== id),
  })),

  // update frames (axes instance)
  updateGlyphFrames: (id, frames) => set((state) => ({
    glyphs: state.glyphs.map((glyph) =>
      glyph.id === id ? { ...glyph, frames } : glyph
    ),
  })),

  // empty
  empty: () => set({ glyphs: [] }),

  // set current
  setCurrent: (glyph) => set({ current: glyph?.id }),

  // select glyph
  selectGlyph: (id) => set((state) => {
    if (id === null) {
      return { current: null } // clear current
    }

    const selected = state.glyphs.find((glyph) => glyph.id === id)?.id
    return { current: selected ?? null } // set selected glyph or null if not found
  }),
}))
