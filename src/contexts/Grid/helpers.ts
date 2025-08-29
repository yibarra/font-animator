// get distance
export const getDistance = (p1: number[], p2: number[]) => Math.hypot(p1[0] - p2[0], p1[1] - p2[1])

// calculate dash array
export const calculateDashArray = (distance: number, dashSize = 10) => {
  const dashCount = Math.floor(distance / dashSize)

  return Array(dashCount).fill(dashSize)
}