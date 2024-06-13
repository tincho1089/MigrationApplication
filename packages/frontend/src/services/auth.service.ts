import axios from 'axios'
import { Endpoints, User, UserInfo, formatUpdateLocationUrl } from '@/models'

export const logIn = (user: User): Promise<UserInfo> => {
  return axios.post(Endpoints.loginUrl, user).then((response) => response.data)
}

export const signIn = (user: User) => {
  return axios.post(Endpoints.signinUrl, user)
}

export const updateLocation = (id: string, lat: string, lng: string) => {
  return axios.put(formatUpdateLocationUrl(id), { id, lat, lng})
}
