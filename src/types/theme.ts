export type Theme = 'light' | 'dark';

export interface ThemeColors {
  primarySolarYellow: string;
  accent: string;
  background: string;
  surface?: string;
  textPrimary: string;
  textSecondary: string;
}

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: ThemeColors;
}