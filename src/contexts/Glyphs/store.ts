import { create } from 'zustand'

import type { IGlyph, IGlyphsState } from './interfaces'

export const useGlyphsStore = create<IGlyphsState>((set) => ({
  current: null,
  glyphs: [
  {
    id: "1",
    charIndex: 12,
    currentFrame: 0,
    easing: "lineal",
    frames: [
      {
        axes: {
          wdth: 30,
          wght: 0,
        },
        position: [240, 600],
        properties: {
          fill: "#434bb1",
          fontSize: 124,
          stroke: "#FF0000",
          strokeWidth: 2,
          dash: [100, 10],
          lineCap: "butt",
          lineJoin: "bevel",
          rotation: 180,
        },
      },
      {
        axes: {
          wdth: 30,
          wght: 100,
        },
        position: [240, 600],
        properties: {
          fill: "#434bb1",
          fontSize: 124,
          stroke: "#FF0F0F",
          strokeWidth: 2,
          dash: [100, 10],
          lineCap: "butt",
          lineJoin: "bevel",
          rotation: 180,
        },
      },
    ],
    axes: {
      wdth: 30,
      wght: 0,
    },
  },
  {
    id: "2",
    charIndex: 17,
    currentFrame: 0,
    easing: "lineal",
    frames: [
      {
        axes: {
          wdth: 0,
          wght: 100,
        },
        position: [100, 400],
        properties: {
          fill: "#df2b0c",
          fontSize: 124,
          stroke: "none",
          strokeWidth: 0,
          dash: [0, 0],
          lineCap: "butt",
          lineJoin: "bevel",
          rotation: 0,
        },
      },
      {
        axes: {
          wdth: 100,
          wght: 0,
        },
        position: [100, 400],
        properties: {
          fill: "#df2b0c",
          fontSize: 124,
          stroke: "none",
          strokeWidth: 0,
          dash: [0, 0],
          lineCap: "butt",
          lineJoin: "bevel",
          rotation: 0,
        },
      },
    ],
    axes: {
      wdth: 100,
      wght: 100,
    },
  },
  {
    id: "3",
    charIndex: 27,
    currentFrame: 0,
    easing: "lineal",
    frames: [
      {
        axes: {
          wdth: 70,
          wght: 0,
        },
        position: [200, 400],
        properties: {
          fill: "#df2b0c",
          fontSize: 124,
          stroke: "none",
          strokeWidth: 0,
          dash: [0, 0],
          lineCap: "butt",
          lineJoin: "bevel",
          rotation: 0,
        },
      },
      {
        axes: {
          wdth: 0,
          wght: 0,
        },
        position: [100, 400],
        properties: {
          fill: "#df2b0c",
          fontSize: 124,
          stroke: "none",
          strokeWidth: 0,
          dash: [0, 0],
          lineCap: "butt",
          lineJoin: "bevel",
          rotation: 0,
        },
      },
    ],
    axes: {
      wdth: 70,
      wght: 0,
    },
  },
  {
    // Glyph 4 (basado en Glyph 1)
    id: "4",
    charIndex: 32, // charIndex diferente
    currentFrame: 0,
    easing: "linear", // Cambiado de 'lineal'
    frames: [
      {
        axes: {
          wdth: 40, // Ligeramente diferente
          wght: 100,
        },
        position: [300, 500], // Posición diferente
        properties: {
          fill: "#5562b9", // Color diferente
          fontSize: 130, // Tamaño diferente
          stroke: "#FF5500",
          strokeWidth: 3, // Ancho de borde diferente
          dash: [50, 5],
          lineCap: "round", // Tipo diferente
          lineJoin: "round", // Tipo diferente
          rotation: 270, // Rotación diferente
        },
      },
      {
        axes: {
          wdth: 40,
          wght: 200, // Ligeramente diferente
        },
        position: [300, 500],
        properties: {
          fill: "#5562b9",
          fontSize: 130,
          stroke: "#FF5500",
          strokeWidth: 3,
          dash: [50, 5],
          lineCap: "round",
          lineJoin: "round",
          rotation: 270,
        },
      },
    ],
    axes: {
      wdth: 40,
      wght: 100,
    },
  },
  {
    // Glyph 5 (basado en Glyph 2)
    id: "5",
    charIndex: 37, // charIndex diferente
    currentFrame: 0,
    easing: "easeOut", // Easing diferente
    frames: [
      {
        axes: {
          wdth: 10, // Ligeramente diferente
          wght: 50, // Ligeramente diferente
        },
        position: [150, 450], // Posición diferente
        properties: {
          fill: "#b10c2b", // Color diferente
          fontSize: 130,
          stroke: "#FFFFFF", // Añadido stroke
          strokeWidth: 1, // Añadido strokeWidth
          dash: [10, 10],
          lineCap: "square", // Tipo diferente
          lineJoin: "miter", // Tipo diferente
          rotation: 90, // Rotación diferente
        },
      },
      {
        axes: {
          wdth: 110, // Ligeramente diferente
          wght: 10, // Ligeramente diferente
        },
        position: [150, 450],
        properties: {
          fill: "#b10c2b",
          fontSize: 130,
          stroke: "#FFFFFF",
          strokeWidth: 1,
          dash: [10, 10],
          lineCap: "square",
          lineJoin: "miter",
          rotation: 90,
        },
      },
    ],
    axes: {
      wdth: 110,
      wght: 10,
    },
  },
],

  // add glyph
  add: (newGlyph) =>
    set((state) => {
      const id =
        Date.now().toString() + Math.random().toString(36).substr(2, 9);
      const defaultProperties = { fill: "red", stroke: "none", strokeWidth: 0 };

      const glyph: IGlyph = {
        id,
        ...newGlyph,
        currentFrame: 0,
        frames: [
          {
            axes: {},
            position: [0, 0],
            properties: defaultProperties,
          }, {
            axes: {},
            position: [0, 0],
            properties: defaultProperties,
          },
        ],
      };

      return { glyphs: [...state.glyphs, glyph] };
    }),

  // remove glyph
  remove: (id) =>
    set((state) => ({
      glyphs: state.glyphs.filter((glyph) => glyph.id !== id),
    })),

  updateGlyphs: (glyphs) => {
    set(() => ({ glyphs }))
  },

  // update frames (axes instance)
  updateGlyphFrames: (id, frames) =>
    set((state) => ({
      glyphs: state.glyphs.map((glyph) =>
        glyph.id === id ? { ...glyph, frames } : glyph
      ),
    })),

  // empty
  empty: () => set({ glyphs: [] }),

  // set current
  setCurrent: (glyph) => set({ current: glyph?.id }),

  // select glyph
  selectGlyph: (id) =>
    set((state) => {
      if (id === null) {
        return { current: null }; // clear current
      }

      const selected = state.glyphs.find((glyph) => glyph.id === id)?.id;
      return { current: selected ?? null }; // set selected glyph or null if not found
    }),
}));
