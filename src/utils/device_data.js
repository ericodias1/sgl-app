import * as Application from 'expo-application';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { getSecure, setSecure } from './secure_store';

const DEVICE_UUID_KEY = 'device_uuid';
const DEVICE_PUSH_TOKEN_KEY = 'device_push_token';

export async function getDeviceUUID() {
  let uuid = await getSecure(DEVICE_UUID_KEY);
  if (uuid) return uuid;

  try {
    if (Device.osName === 'iOS') {
      const id = await Application.getIosIdForVendorAsync();
      if (id) uuid = id;
    } else {
      const id = Application.androidId;
      if (id) uuid = id;
    }
  } catch (e) {
  }
  if (!uuid) uuid = `dev-${Math.random().toString(36).slice(2)}-${Date.now()}`;

  await setSecure(DEVICE_UUID_KEY, uuid);
  return uuid;
};

export async function getDevicePushToken() {
  let pushToken = await getSecure(DEVICE_PUSH_TOKEN_KEY);
  if (pushToken) return pushToken;

  let nativeToken = null;
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    if (existingStatus !== "granted") {
      await Notifications.requestPermissionsAsync();
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#444444",
      });
    }

    nativeToken = (await Notifications.getDevicePushTokenAsync()).data;
  } catch {}
  await setSecure(DEVICE_PUSH_TOKEN_KEY, nativeToken);

  return nativeToken;
};