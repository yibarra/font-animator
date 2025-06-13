export interface Console {
  timeStamp(label: string): void
}

export declare class FontFace {
  constructor(fontFamily: string, fontURL: string)
  family: string
  style: string
  weight: string
  stretch: string
  unicodeRange: string
  variant: string
  featureSettings: string

  status: string

  load(): Promise<FontFace>

  loaded: Promise<FontFace>
}

export interface Document {
  fonts: FontFaceSet
}

export interface CSSStyleDeclaration {
  fontVariationSettings: string | null
}