import { UserInfo } from '@/models'
import { clearLocalStorage, persistLocalStorage } from '@/utilities'
import { createSlice } from '@reduxjs/toolkit'

export const EmptyUserState: UserInfo = {
  jwtToken: '',
  username: '',
  role: '',
  lat: '',
  lng: '',
  id: '',
}

export const UserKey = 'user'

export const userSlice = createSlice({
  name: 'user',
  initialState: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : EmptyUserState,
  reducers: {
    createUser: (state, action) => {
      persistLocalStorage<UserInfo>(UserKey, action.payload)
      return action.payload
    },
    updateUser: (state, action) => {
      const result = { ...state, ...action.payload }
      persistLocalStorage<UserInfo>(UserKey, result)
      return result
    },
    resetUser: () => {
      clearLocalStorage()
      return EmptyUserState
    },
  },
})

export const { createUser, updateUser, resetUser } = userSlice.actions

export default userSlice
