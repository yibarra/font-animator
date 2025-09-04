import type { IData } from '../Glyphs/interfaces'

export const dataDefault = {
  current: null,
  glyphs: [
    {
      "id":"1756166024718t2jttbl58",
      "axes":{"wght":400},
      "easing":"lineal",
      "charIndex":39,
      "frames":[
        {"axes":{"wght":400},"position":[718,717],"rotation":0},
        {"axes":{"wght":400},"position":[758,559],"rotation":0}
      ],
      "properties":{
        "fontSize":464,"fill":"#fff","textBaseline":"alphabetic","stroke":"none","strokeWidth":0
      },
      "position":[718,717],
      "rotation":0
    }
  ],
  config: {
    arrows: {
      count: 16,
      fill: "#e43318ff",
      pointerLength: 10,
      pointerWidth: 12,
    },
    glyph: {
      bounding: {
        pointerLength: 4,
        pointerWidth: 6,
        fill: "#fff",
        stroke: "#fff",
        strokeWidth: 0.5
      },
    },
    path: {
      fill: "#fff",
      shadowColor: "#0f1d44",
      shadowOffset: { x: 0, y: -4 },
      shadowBlur: 4,
      shadowEnabled: true
    }
  }
} as IData