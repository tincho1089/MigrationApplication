import axios, { AxiosRequestConfig } from 'axios';
import { getInLocalStorage, getValidationError, LocalStorageKeys } from '../utilities';
import { SnackbarUtilities } from '../utilities/snackbar-manager';
import { Endpoints } from '@/models';

export const AxiosInterceptor = () => {
  const updateHeader = (request: AxiosRequestConfig): AxiosRequestConfig => {
    const user = getInLocalStorage(LocalStorageKeys.USER);
    const token = user?.jwtToken;
    const newHeaders = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    request.headers = newHeaders;
    return request;
  };

  const successMessages: { [key: string]: string } = {
    [Endpoints.loginUrl]: 'Log In was successful',
    [Endpoints.signinUrl]: 'Sign In was successful',
    [Endpoints.migrationUrl]: 'Migrations loaded successfully',
    [Endpoints.newMigrationUrl]: 'Migration created successfully',
  };

  axios.interceptors.request.use((request: any) => {
    if (request.url?.includes('assets')) return request;
    return updateHeader(request);
  });

  axios.interceptors.response.use(
    (response) => {
      if (!(response.data.status == null)) {
        if (response.data?.status !== 200) {
          SnackbarUtilities.error(response.data?.message);
          return Promise.reject(response);
        }
      }

      const endpoint = response.config.url;

      let successMessage = 'Success';

      for (const key in successMessages) {
        if (endpoint?.includes(key)) {
          successMessage = successMessages[key];
          break;
        }
      }

      SnackbarUtilities.success(successMessage);
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        SnackbarUtilities.error('Unauthorized: Session expired. Sign in again.');
      } else {
        SnackbarUtilities.error(getValidationError(error.code));
      }
      return Promise.reject(error);
    }
  );
};
