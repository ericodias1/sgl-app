import * as SecureStore from 'expo-secure-store';

export async function setSecure(key, value) {
  if (value == null) return SecureStore.deleteItemAsync(key);

  return SecureStore.setItemAsync(key, value, { keychainAccessible: SecureStore.WHEN_UNLOCKED });
}

export function getSecure(key) {
  return SecureStore.getItemAsync(key);
}

export function delSecure(key) {
  return SecureStore.deleteItemAsync(key);
}