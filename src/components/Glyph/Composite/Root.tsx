import { Group } from 'react-konva'
import GlyphProvider from '../Context'

import type { IGlyphProviderProps } from '../interfaces'

const Root = ({ children, ...props }: IGlyphProviderProps) => (
  <GlyphProvider {...props}>
    <Group>{children}</Group>
  </GlyphProvider>
)

Root.displayName = 'Component.Glyph.Root'
export default Root