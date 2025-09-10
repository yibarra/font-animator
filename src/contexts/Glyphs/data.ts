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
        "fontSize":464,"fill":"#E0E0E0","textBaseline":"alphabetic","stroke":"none","strokeWidth":0
      },
      "position":[718,717],
      "rotation":0
    }
  ],
  config: {
    arrows: {
      count: 16,
      fill: "#ff2200",
      pointerLength: 10,
      pointerWidth: 12,
    },
    glyph: {
      bounding: {
        pointerLength: 8,
        pointerWidth: 5,
        fill: "#fff",
        stroke: "#fff",
        strokeWidth: 0.5
      },
      metrics: {
        fill: '#fff',
        fontFamily: 'Roboto Mono',
        fontSize: 9,
        lineWidth: 0.5,
        dash: [5, 5],
        stroke: '#fff',
        strokeWidth: 0.5,
        letterSpacing: -0.4
      },
      controlLabel: {
        fill: '#fff',
        fontFamily: 'Roboto Mono',
        fontSize: 9,
        letterSpacing: -0.4
      },
      controlLine: {
        dash: [6, 4],
        stroke: "red",
        strokeWidth: 1
      },
      controlPoint: {
        fill: "transparent",
        stroke: "red",
        strokeWidth: 2,
        radius: 4
      }
    },
    path: {
      fill: "#E0E0E0",
      shadowColor: "#0f1d44",
      shadowOffset: { x: 0, y: -4 },
      shadowBlur: 4,
      shadowEnabled: true
    }
  }
} as IData