import axios from 'axios';
import * as Application from 'expo-application';
import { useSession } from '../../store/session';

const BASE = process.env.EXPO_PUBLIC_API_URL;

export const accessTokenInterceptor = async (config) => {
  const { accessToken } = useSession.getState();
  if (accessToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}

export const refreshTokenInterceptor = async (failedRequest) => {
  const { refreshToken, setTokensFromRefresh, logout } = useSession.getState();

  if (!refreshToken) {
    await logout();
    throw new Error('No refresh token');
  }

  try {
    const { data } = await axios.post(`${BASE}/oauth/token`, {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      app_version: Application.nativeBuildVersion
    });

    await setTokensFromRefresh({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: data.expires_in,
    });

    failedRequest.response.config.headers['Authorization'] = 'Bearer ' + data.access_token;
    return Promise.resolve();
  } catch (err) {
    await logout();
    return Promise.reject(err);
  }
}