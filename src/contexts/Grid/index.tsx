import { useState, createContext, useContext, useMemo } from 'react'
import type { Dispatch, SetStateAction } from 'react'

interface GridConfig {
  cellSize: number
  gridColor: string
  gridLineWidth: number
}

interface GridContextProps {
  offsetX: number
  offsetY: number
  setOffsetX: Dispatch<SetStateAction<number>>
  setOffsetY: Dispatch<SetStateAction<number>>
  gridConfig: GridConfig
}

const GridContext = createContext<GridContextProps | undefined>(undefined)

const GridProvider = ({
  children,
  initialOffsetX = 0,
  initialOffsetY = 0,
  gridConfig
}: { children: React.ReactNode; initialOffsetX?: number; initialOffsetY?: number; gridConfig: GridConfig }) => {
  const [offsetX, setOffsetX] = useState(initialOffsetX)
  const [offsetY, setOffsetY] = useState(initialOffsetY)

  return (
    <GridContext.Provider
      value={
        useMemo(() => ({
          gridConfig,
          offsetX,
          offsetY,
          setOffsetX,
          setOffsetY,
        }), [
          gridConfig,
          offsetX,
          offsetY,
          setOffsetX,
          setOffsetY,
        ])
      }
    >
      {children}
    </GridContext.Provider>
  )
}

const UseGridContext = () => {
  const context = useContext(GridContext);
  if (!context) {
    throw new Error('useGridContext must be used within a GridProvider')
  }
  return context;
}

export { GridContext, GridProvider, UseGridContext }
export default GridProvider