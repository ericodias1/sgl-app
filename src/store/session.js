import api from 'axios';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { create } from 'zustand';
import { getDevicePushToken, getDeviceUUID } from '../utils/device_data';
import { delSecure, getSecure, setSecure } from '../utils/secure_store';

const appVersion = Constants.expoConfig.version;

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const useSession = create((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  accessExp: null,
  deviceUUID: null,
  devicePushToken: null,
  bootstrapped: false,

  async bootstrap() {
    const [access, refresh, exp] = await Promise.all([
      getSecure('access_token'),
      getSecure('refresh_token'),
      getSecure('access_exp'),
    ]);
    const deviceUUID = await getDeviceUUID();
    const devicePushToken = await getDevicePushToken();
    set({
      accessToken: access,
      refreshToken: refresh,
      accessExp: exp ? Number(exp) : null,
      deviceUUID,
      devicePushToken,
      bootstrapped: true,
    });

    if (access) {
      try {
        const me = await api.get(`${API_URL}/api/me`, {
          headers: { Authorization: `Bearer ${access}` },
        });
        set({ user: me.data });
      } catch {
      }
    }
  },

  async login(email, password) {
    const { data } = await api.post(`${API_URL}/oauth/token`, {
      grant_type: 'password',
      username: String(email || '').trim().toLowerCase(),
      password,
      device_uuid: get().deviceUUID,
      device_push_token: get().devicePushToken,
      device_platform: Platform.OS,
      app_version: appVersion
    });
    const accessExp = data.expires_in ? Date.now() + data.expires_in * 1000 : null;

    await Promise.all([
      setSecure('access_token', data.access_token),
      setSecure('refresh_token', data.refresh_token),
      setSecure('access_exp', accessExp ? String(accessExp) : null),
    ]);

    set({
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      accessExp,
    });

    const me = await api.get(`${API_URL}/api/me`, {
      headers: { Authorization: `Bearer ${data.access_token}` },
    });
    set({ user: me.data });
  },

  async logout() {
    try {
      api.delete(`${API_URL}/api/logout`, {
        headers: { Authorization: `Bearer ${get().accessToken}` },
      });
    } catch {}
    set({ user: null, accessToken: null, refreshToken: null, accessExp: null });
    await Promise.all([
      delSecure('access_token'),
      delSecure('refresh_token'),
      delSecure('access_exp'),
    ]);
  },

  async setTokensFromRefresh({ access_token, refresh_token, expires_in }) {
    const accessExp = expires_in ? Date.now() + expires_in * 1000 : null;

    await Promise.all([
      setSecure('access_token', access_token),
      setSecure('refresh_token', refresh_token || (await getSecure('refresh_token'))),
      setSecure('access_exp', accessExp ? String(accessExp) : null),
    ]);

    set({
      accessToken: access_token,
      refreshToken: refresh_token || get().refreshToken,
      accessExp,
    });
  },
}));
