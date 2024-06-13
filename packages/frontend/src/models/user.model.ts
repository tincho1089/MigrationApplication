export interface UserInfo {
  id: string
  jwtToken: string
  username: string
  role: string
  lat: string
  lng: string
}

export interface User {
  username: string
  password: string
  name: string
  role: string
  lat: string
  lng: string
}

export interface userToken {
  token: string
}
