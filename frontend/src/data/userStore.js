/**
 * Lightweight in-memory user profile store.
 *
 * Persists the registered user across component re-renders for the app
 * session. Can be extended to AsyncStorage later for true persistence.
 */

let currentUser = null;

export function getUser() {
  return currentUser;
}

export function saveUser(user) {
  currentUser = { ...user };
  return currentUser;
}

export function clearUser() {
  currentUser = null;
}

export function isRegistered() {
  return currentUser !== null;
}
