/**
 * Shared color palette for the DevTrack app.
 */
export const colors = {
  // Backgrounds
  screen: '#050711',
  panel: '#181a2b',
  nav: '#191b2c',
  activeTab: '#28283c',
  otherMenu: '#202235',
  otherMenuPressed: '#2b2d43',
  otherIconWrap: '#2f3149',
  backgroundGlowTop: '#15172b',
  backgroundGlowBottom: '#443581',

  // Text
  textPrimary: '#fbfaff',
  textSecondary: '#aaa8b8',
  textMuted: '#9e9caf',
  textFaint: '#9998ad',
  accentText: '#927cff',

  // Accents
  yellow: '#ffd22f',
  green: '#54df75',
  greenStrong: '#51df71',
  purple: '#806bff',
  pink: '#ff5b86',
  blue: '#4a8dff',

  // Activity heatmap levels
  activity0: '#2a2c42',
  activity1: '#29483d',
  activity2: '#327d51',
  activity3: '#51df71',

  // Borders / dividers
  border: '#30324a',
  divider: '#2c2e40',
  track: '#34364c',
  chartLine: '#626277',

  // Notifications
  notificationDot: '#ff4c92',
};

export const getActivityCellStyle = level => {
  switch (level) {
    case 3:
      return { backgroundColor: colors.activity3 };
    case 2:
      return { backgroundColor: colors.activity2 };
    case 1:
      return { backgroundColor: colors.activity1 };
    default:
      return { backgroundColor: colors.activity0 };
  }
};
