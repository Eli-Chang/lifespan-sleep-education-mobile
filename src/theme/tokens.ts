export const palette = {
  background: '#FBF5EE', surface: '#FFFDFC', surfaceSoft: '#F8E9DC',
  ink: '#332A26', inkMuted: '#6D625B', primary: '#A85F49', primaryDark: '#8D5041',
  primarySoft: '#F1D9CC', accent: '#8A5B2E', border: '#E2CEC0',
  success: '#4D735A', successSoft: '#E4EFE5', warning: '#805216', warningSoft: '#F8E8C9',
  danger: '#8F413C', dangerSoft: '#F5DFDC', missed: '#805216', disabled: '#BDB1A8',
  white: '#FFFFFF', focus: '#6F4A3A',
};
export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 };
export const radius = { sm: 10, md: 16, lg: 24, pill: 999 };
export const touchTarget = 48;
export const type = {
  display: { fontSize: 34, lineHeight: 41, fontWeight: '800' as const, letterSpacing: -0.7 },
  title: { fontSize: 32, lineHeight: 39, fontWeight: '800' as const, letterSpacing: -0.6 },
  section: { fontSize: 24, lineHeight: 31, fontWeight: '800' as const, letterSpacing: -0.2 },
  question: { fontSize: 20, lineHeight: 30, fontWeight: '800' as const },
  body: { fontSize: 17, lineHeight: 27, fontWeight: '400' as const },
  meta: { fontSize: 13, lineHeight: 18, fontWeight: '700' as const },
};
export const depth = {
  none: {},
  subtle: { shadowColor: '#5B463B', shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 2 },
  raised: { shadowColor: '#5B463B', shadowOpacity: 0.12, shadowRadius: 12, shadowOffset: { width: 0, height: 5 }, elevation: 4 },
  floating: { shadowColor: '#5B463B', shadowOpacity: 0.16, shadowRadius: 18, shadowOffset: { width: 0, height: 8 }, elevation: 7 },
};
export const motion = { quick: 100, fast: 140, standard: 180, slow: 260, pressScale: 0.98, enterDistance: 8 };
