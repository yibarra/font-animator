import { createContext, useContext, useMemo } from 'react'

import type { IAnimationContext, IAnimationProvider } from './interfaces'

const AnimationContext = createContext({} as IAnimationContext)

const AnimationProvider = ({ children, glyph, duration = 1000 }: IAnimationProvider) => {
  console.info(glyph, duration)

  // render
  return (
    <AnimationContext.Provider
      value={
        useMemo(() => ({
          active: true
        }), [
      ])}
    >
      {children}
    </AnimationContext.Provider>
  )
}

const UseAnimationContext = () => {
  const context = useContext(AnimationContext)

  if (context === undefined) {
    throw new Error(
      'AnimationContext must be used within a AnimationProvider'
    )
  }

  return context
}

export { AnimationContext, AnimationProvider, UseAnimationContext }
export default AnimationProvider
