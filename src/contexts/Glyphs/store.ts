import { create } from 'zustand'

import type { IGlyph, IGlyphsState } from './interfaces'

export const useGlyphsStore = create<IGlyphsState>((set) => ({
  current: null,
  glyphs: [{
    id: '1',
    charIndex: 16,
    easing: 'lineal',
    position: [10, 100],
    duration: 10000,
    frames: [{
      wdth: 30,
      wght: 0
    }],
    properties: {
      fill: 'blue'
    }
  }, {
    id: '2',
    charIndex: 17,
    easing: 'lineal',
    position: [110, 100],
    duration: 10000,
    frames: [{
      wdth: 100,
      wght: 100
    }],
    properties: {
      fill: 'red'
    }
  }],

  // add glyph
  add: (newGlyph) => set((state) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9)
    const defaultProperties = { fill: 'red', stroke: 'none', strokeWidth: 0 }

    const glyph: IGlyph = {
      id,
      ...newGlyph,
      frames: [],
      properties: defaultProperties,
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

  // update properties svg
  updateGlyphProperties: (id, newProps) => set((state) => ({
    glyphs: state.glyphs.map((glyph) =>
      glyph.id === id ? { ...glyph, properties: { ...glyph.properties, ...newProps } } : glyph
    ),
  })),

  // empty
  empty: () => set({ glyphs: [] }),

  // set current
  setCurrent: (glyph) => set({ current: glyph }),

  // select glyph
  selectGlyph: (id) => set((state) => {
    if (id === null) {
      return { current: null }; // clear current
    }

    const selected = state.glyphs.find(glyph => glyph.id === id)
    return { current: selected || null } // set selected glyph or null if not found
  }),
}))
