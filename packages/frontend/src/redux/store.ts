import { Migration, UserInfo } from '@/models'
import { configureStore } from '@reduxjs/toolkit'
import userSlice from './states/user'
import migrationSlice from './states/migration'

export interface AppStore {
  user: UserInfo
  migration: Migration[]
}

export default configureStore<AppStore>({
  reducer: {
    user: userSlice.reducer,
    migration: migrationSlice.reducer,
  },
})
