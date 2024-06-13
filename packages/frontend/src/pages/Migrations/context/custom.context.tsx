import { newMigration } from '@/models'
import { createContext, useContext } from 'react'

interface TodoContext {
  children?: React.ReactNode
  emitMessage: (message: newMigration) => void
}
export const CustomContext = createContext<TodoContext>({} as TodoContext)

export const CustomProvider = ({ children, emitMessage }: { children: React.ReactNode; emitMessage: (message: newMigration) => void }) => {
  return <CustomContext.Provider value={{ emitMessage }}>{children}</CustomContext.Provider>
}

export const useCustomContext = () => {
  const context = useContext(CustomContext)
  if (context === undefined) {
    throw new Error('CustomContext must be used within a CustomProvider')
  }
  return context
}
