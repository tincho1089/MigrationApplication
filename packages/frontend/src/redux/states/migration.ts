import { Migration } from '@/models'
import { createSlice } from '@reduxjs/toolkit'

export const EmptyMigrationState: Migration[] = [{
  id: '',
  species: '',
  lat: '0',
  lng: '0',
  startDate: new Date(),
  description: '',
  user: '',
  state: '',
}];

export const MigrationKey = 'migration'

export const migrationSlice = createSlice({
  name: 'migration',
  initialState: EmptyMigrationState,
  reducers: {
    listMigrations: (state, action) => {
      return action.payload
    },
    updateListMigrations: (state, action) => {
      const result = { ...state, ...action.payload }
      return result
    },
    resetListMigration: () => {
      return EmptyMigrationState
    },
  },
})

export const { listMigrations, updateListMigrations, resetListMigration } = migrationSlice.actions

export default migrationSlice
