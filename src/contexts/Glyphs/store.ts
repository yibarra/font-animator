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
        },
        {
          axes: {
            wdth: 30,
            wght: 100,
          },
          position: [240, 600],
        },
      ],
      axes: {
        wdth: 30,
        wght: 0,
      },
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
        },
        {
          axes: {
            wdth: 100,
            wght: 0,
          },
          position: [100, 400],
        },
      ],
      axes: {
        wdth: 100,
        wght: 100,
      },
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
        },
        {
          axes: {
            wdth: 0,
            wght: 0,
          },
          position: [100, 400],
        },
      ],
      axes: {
        wdth: 70,
        wght: 0,
      },
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
      // Glyph 4 (nueva variación de posición)
      id: "4",
      charIndex: 32,
      currentFrame: 0,
      easing: "linear",
      frames: [
        {
          axes: {
            wdth: 40,
            wght: 100,
          },
          position: [400, 200], // Posición variada
        },
        {
          axes: {
            wdth: 40,
            wght: 200,
          },
          position: [400, 200], // Posición variada
        },
      ],
      axes: {
        wdth: 40,
        wght: 100,
      },
      properties: {
        fill: "#8a2be2",
        fontSize: 130,
        stroke: "#FFFF00",
        strokeWidth: 3,
        dash: [50, 5],
        lineCap: "round",
        lineJoin: "round",
        rotation: 270,
      },
    },
    {
      // Glyph 5 (nueva variación de posición)
      id: "5",
      charIndex: 37,
      currentFrame: 0,
      easing: "easeOut",
      frames: [
        {
          axes: {
            wdth: 10,
            wght: 50,
          },
          position: [150, 100], // Posición variada
        },
        {
          axes: {
            wdth: 110,
            wght: 10,
          },
          position: [150, 100], // Posición variada
        },
      ],
      axes: {
        wdth: 110,
        wght: 10,
      },
      properties: {
        fill: "#20b2aa",
        fontSize: 130,
        stroke: "#0000FF",
        strokeWidth: 1,
        dash: [10, 10],
        lineCap: "square",
        lineJoin: "miter",
        rotation: 90,
      },
    },
    {
      // Glyph 6 (nueva variación de posición)
      id: "6",
      charIndex: 42,
      currentFrame: 0,
      easing: "easeInOut",
      frames: [
        {
          axes: {
            wdth: 50,
            wght: 500,
          },
          position: [50, 550], // Posición variada
        },
        {
          axes: {
            wdth: 70,
            wght: 600,
          },
          position: [50, 550], // Posición variada
        },
      ],
      axes: {
        wdth: 50,
        wght: 500,
      },
      properties: {
        fill: "#d35400",
        fontSize: 100,
        stroke: "#00FF00",
        strokeWidth: 4,
        dash: [20, 5],
        lineCap: "butt",
        lineJoin: "round",
        rotation: 45,
      },
    },
    {
      // Glyph 7 (nueva variación de posición)
      id: "7",
      charIndex: 47,
      currentFrame: 0,
      easing: "lineal",
      frames: [
        {
          axes: {
            wdth: 20,
            wght: 0,
          },
          position: [550, 300], // Posición variada
        },
        {
          axes: {
            wdth: 80,
            wght: 900,
          },
          position: [550, 300], // Posición variada
        },
      ],
      axes: {
        wdth: 20,
        wght: 0,
      },
      properties: {
        fill: "#7f8c8d",
        fontSize: 110,
        stroke: "#FFD700",
        strokeWidth: 1,
        dash: [5, 5],
        lineCap: "round",
        lineJoin: "bevel",
        rotation: 135,
      },
    },
    {
      // Glyph 8 (nueva variación de posición)
      id: "8",
      charIndex: 52,
      currentFrame: 0,
      easing: "easeIn",
      frames: [
        {
          axes: {
            wdth: 90,
            wght: 100,
          },
          position: [350, 700], // Posición variada
        },
        {
          axes: {
            wdth: 10,
            wght: 0,
          },
          position: [350, 700], // Posición variada
        },
      ],
      axes: {
        wdth: 90,
        wght: 100,
      },
      properties: {
        fill: "#9b59b6", // Nuevo color
        fontSize: 140,
        stroke: "none",
        strokeWidth: 0,
        dash: [0, 0],
        lineCap: "butt",
        lineJoin: "miter",
        rotation: 315,
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
          }, {
            axes: {},
            position: [0, 0],
          },
        ],
        properties: defaultProperties,
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

  updateGlyph: (id, glyph) => 
    set((state) => ({
      glyphs: state.glyphs.map((g) => g.id === id ? glyph : g)
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
