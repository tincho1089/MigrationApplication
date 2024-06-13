import { ApiMigration, Endpoints, formatUpdateMigrationUrl, newMigration } from '@/models'
import axios from 'axios'

export const getMigrations = (state: string, lat: string, lng: string, distance = 10000, myMigrations = false): Promise<ApiMigration[]> => {
  const params = {
    state,
    lat,
    lng,
    distance,
    myMigrations,
  }
  return axios.get(Endpoints.migrationUrl, { params }).then((response) => response.data)
}

export const addMigrationEvent = (migration: newMigration) => {
  return axios.post(Endpoints.newMigrationUrl, migration)
}

export const updateMigration = (id: string, state: string) => {
  return axios.put(formatUpdateMigrationUrl(id), { state })
}
