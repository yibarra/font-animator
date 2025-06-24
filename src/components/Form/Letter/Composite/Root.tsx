import LetterProvider from '../Context'
import type { LetterRootProps } from './interfaces'

const Root = ({ children, font }: LetterRootProps) => (
  <LetterProvider font={font}>
    {children}
  </LetterProvider>
)

Root.displayName = 'Form.Letter.Root'
export default Root
