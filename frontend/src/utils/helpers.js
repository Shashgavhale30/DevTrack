/**
 * Small helper functions used across the DevTrack dashboard.
 */

export function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return 'Good morning';
  }

  if (hour < 18) {
    return 'Good afternoon';
  }

  return 'Good evening';
}

export function buildActivity() {
  const today = new Date();
  const seed = today.getDate() + today.getMonth() * 7;

  return Array.from({ length: 4 }, (_rowItem, row) =>
    Array.from({ length: 23 }, (_columnItem, column) => {
      const value = (row * 11 + column * 5 + seed) % 9;
      if (value > 7) {
        return 3;
      }
      if (value > 5) {
        return 2;
      }
      if (value > 3) {
        return 1;
      }
      return 0;
    }),
  );
}
