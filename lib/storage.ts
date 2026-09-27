/**
 * Safe client-side storage utility for SoleX
 * Handles SSR safety, JSON parsing errors, and browser storage unavailability.
 */

const STORAGE_KEYS = {
  USER: "solex_user",
  CART: "solex_cart",
  WISHLIST: "solex_wishlist",
  ORDERS: "solex_orders",
  ANNOUNCEMENT_DISMISSED: "solex_announcement_dismissed",
} as const;

export function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (!isBrowser()) {
    return defaultValue;
  }
  try {
    const item = window.localStorage.getItem(key);
    if (item === null || item === undefined) {
      return defaultValue;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    // Return default on malformed data or permission error
    return defaultValue;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Silently handle quota errors
  }
}

export function removeFromStorage(key: string): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    // Silently handle
  }
}

export { STORAGE_KEYS };
