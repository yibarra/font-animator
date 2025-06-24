import { create } from 'zustand'

import type { IGlyph, IGlyphsState } from './interfaces'

export const useGlyphsStore = create<IGlyphsState>((set) => ({
  glyphs: [
    {
      id: "81",
      charIndex: 48,
      easing: "lineal",
      frames: [
        {
          axes: {
            wdth: 30,
            wght: 0,
          },
          position: [240, 600],
          rotation: 70
        },
        {
          axes: {
            wdth: 30,
            wght: 100,
          },
          position: [340, 600],
          rotation: 45
        },
      ],
      axes: {
        wdth: 30,
        wght: 0,
      },
      position: [240, 600],
      properties: {
        fill: "#434bb1",
        fontSize: 24,
        stroke: "#FF0F0F",
        strokeWidth: 2,
        dash: [10, 10],
        lineCap: "butt",
        lineJoin: "bevel",
      },
      rotation: 70
    },
    {
      id: "47",
      charIndex: 26,
      easing: "lineal",
      frames: [
        {
          axes: {
            wdth: 20,
            wght: 0,
          },
          position: [550, 300],
          rotation: 60
        },
        {
          axes: {
            wdth: 80,
            wght: 900,
          },
          position: [550, 300],
          rotation: 40
        },
      ],
      axes: {
        wdth: 20,
        wght: 0,
      },
      position: [550, 300],
      properties: {
        fill: "#7f8c8d",
        stroke: "#FFD700",
        strokeWidth: 1,
        dash: [5, 5],
        lineCap: "round",
        lineJoin: "bevel",
      },
      rotation: 60,
    },
    {
      id: "28",
      charIndex: 27,
      easing: "easeIn",
      frames: [
        {
          axes: {
            wdth: 90,
            wght: 100,
          },
          position: [350, 700],
          rotation: 45
        },
        {
          axes: {
            wdth: 10,
            wght: 0,
          },
          position: [350, 700],
          rotation: 135
        },
      ],
      axes: {
        wdth: 90,
        wght: 100,
      },
      position: [350, 700],
      properties: {
        fill: "#9b59b6",
        stroke: "none",
        strokeWidth: 0,
        dash: [0, 0],
        lineCap: "butt",
        lineJoin: "miter",
      },
      rotation: 45,
    },
  ],

  // add glyph
  add: (charIndex) =>
    set((state) => {
      const id =
        Date.now().toString() + Math.random().toString(36).substr(2, 9)
      const defaultProperties = { fontSize: 24, fill: "#000", stroke: "none", strokeWidth: 0 }

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

  updateGlyphs: (glyphs) => {
    set(() => ({ glyphs }))
  },

  updateGlyph: (id, glyph) =>
    set((state) => ({
      glyphs: state.glyphs.map((g) => (g.id === id ? glyph : g)),
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
