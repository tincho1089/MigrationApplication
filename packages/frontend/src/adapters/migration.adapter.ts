import { ApiMigration, Migration } from '@/models'

export const getMigrationsAdapter = (migrations: ApiMigration[]): Migration[] => {
  return migrations.map((migration: ApiMigration) => ({
    id: migration._id,
    species: migration.species,
    lat: migration.location.coordinates[1].toString(),
    lng: migration.location.coordinates[0].toString(),
    startDate: migration.startDate,
    description: migration.description,
    user: migration.user,
    state: migration.state,
  }))
}
