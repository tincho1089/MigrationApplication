import { UserInfo } from '@/models'

export const createUserAdapter = (user: UserInfo) => ({
  jwtToken: user.jwtToken,
  username: user.username,
  role: user.role,
  lat: user.lat,
  lng: user.lng,
  id: user.id,
})
