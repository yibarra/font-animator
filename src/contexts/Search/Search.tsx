import { useEffect } from 'react'
import type { PropsWithChildren } from 'react'

import { useSearchStore } from './store'

const SearchProvider = ({ children }: PropsWithChildren) => {
  const loadParams = useSearchStore(state => state.loadParamsFromUrl)

  // load
  useEffect(() => {
    loadParams()

    const handlePopState = () => {
      loadParams()
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [loadParams])

  return <>{children}</>
}

SearchProvider.displayName = 'Context.Search'
export default SearchProvider