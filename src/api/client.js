import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { accessTokenInterceptor, refreshTokenInterceptor } from './interceptors/auth';

const BASE = process.env.EXPO_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: BASE,
  timeout: 15000,
});

api.interceptors.request.use( accessTokenInterceptor );
createAuthRefreshInterceptor(api, refreshTokenInterceptor, { statusCodes: [401] });

export default api;