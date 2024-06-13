import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { getMigrations } from '@/services/migration.service';
import { getMigrationsAdapter } from '@/adapters';
import { listMigrations } from '@/redux/states/migration';
import { AppStore } from '@/redux/store';

export const useMigrations = () => {
  const dispatch = useDispatch();
  const userState = useSelector((store: AppStore) => store.user);

  const loadMigrations = useCallback(async (state: string, distance: number, myMigrations: boolean) => {
    const data = await getMigrations(state, userState.lat, userState.lng, distance, myMigrations);
    dispatch(listMigrations(getMigrationsAdapter(data)));
  }, [dispatch, userState]);

  return {
    loadMigrations,
  };
};
