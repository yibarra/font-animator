import Providers from '../'
import type { IMainProvider } from './interfaces'

// Main Provider
const MainProvider = ({ children }: IMainProvider) => (
  <>
    <Providers.DataProvider>
      <Providers.FontProvider>
        <Providers.FontSettingsProvider>
          <Providers.GlyphsProvider>
            <Providers.GridProvider
              gridConfig={{
                cellSize: 50,
                gridColor: 'lightgray',
                gridLineWidth: 1,
              }}
            >
              {children}
            </Providers.GridProvider>
          </Providers.GlyphsProvider>
        </Providers.FontSettingsProvider>
      </Providers.FontProvider>
    </Providers.DataProvider>
  </>
)

export default MainProvider
