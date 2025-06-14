import type { Glyph } from 'fontkit'
import type { BoundingBox } from './interfaces'

// get bounding box
export const getBoundingBoxGlyph = (
  bbox: Glyph['bbox'],
  fontSize: number,
  unitsPerEm: number
): BoundingBox => {
  const scaleFactor = fontSize / unitsPerEm

  const scaledWidth = (bbox.maxX - bbox.minX) * scaleFactor
  const scaledHeight = (bbox.maxY - bbox.minY) * scaleFactor

  const scaledMinX = bbox.minX * scaleFactor
  const scaledMinY = bbox.minY * scaleFactor
  const scaledMaxX = bbox.maxX * scaleFactor
  const scaledMaxY = bbox.maxY * scaleFactor

  return {
    minX: scaledMinX,
    minY: scaledMinY,
    maxX: scaledMaxX,
    maxY: scaledMaxY,
    width: Number(scaledWidth.toFixed(2)),
    height: Number(scaledHeight.toFixed(2)),
  };
}