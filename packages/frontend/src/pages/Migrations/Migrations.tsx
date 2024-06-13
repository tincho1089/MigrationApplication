import { SocketWrapper, WindowManager } from './components'
import { FilterProvider } from './context'

export default function Migrations() {
  return (
    <SocketWrapper>
      <FilterProvider>
        <WindowManager />
      </FilterProvider>
    </SocketWrapper>
  )
}
