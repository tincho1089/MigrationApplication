const baseUrl = 'http://localhost:3000'

export const Endpoints = {
  baseUrl,
  migrationUrl: baseUrl + '/migration/all',
  newMigrationUrl: baseUrl + '/migration/create',
  loginUrl: baseUrl + '/auth/login',
  signinUrl: baseUrl + '/auth/register',
  socketConn: 'http://localhost:8001',
}

export const formatUpdateMigrationUrl = (id: string) => {
  return `${baseUrl}/migration/${id}/update`
}

export const formatUpdateLocationUrl = (id: string) => {
  return `${baseUrl}/auth/${id}/update`
}
