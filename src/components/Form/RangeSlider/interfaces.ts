export interface IRangeSlider {
  min?: number
  max?: number
  defaultValue?: number
  step?: number
  onChange?: (value: number) => void
}