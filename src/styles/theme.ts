import { Dispatch, SetStateAction } from 'react';
import { sizes, devices } from './devices';
export type ThemeContextType = ThemeColors & ThemeDefaults & {
  setCurrentTheme: Dispatch<SetStateAction<"dark" | "light">>
}
export type ThemeColors = {
  mode: "light" | "dark";
  bg: {
    primary: string,
    secondary: string,
    inset: string,
    input: string,
    button: string,
  },
  text: {
    link: string,
    primary: string,
    secondary: string,
    tertiary: string,
    quarternary: string,
    placeholder: string,
    onPrimary: string,
  },
}
export type ThemeDefaults = {
  fontSizes: { [key: number]: string };
  fontWeights: {
    body: number,
    subheading: number,
    link: number,
    bold: number,
    heading: number,
  },
  lineHeights: {
    body: number,
    heading: number,
    code: number,
  },
}

const light: ThemeColors = {
  mode: "light",
  bg: {
    primary: '#eff0f5',
    secondary: '#ffffff',
    inset: '#e2e4e8',
    input: 'rgba(65,67,78,0.12)',
    button: "#666",
  },
  text: {
    link: "#F6BE00",
    primary: '#050505',
    secondary: '#2f3037',
    tertiary: '#525560',
    quarternary: '#9194a1',
    placeholder: 'rgba(82,85,96,0.5)',
    onPrimary: '#ffffff',
  },
}

const dark: ThemeColors = {
  mode: "dark",
  bg: {
    primary: '#212529',
    secondary: '#666666',
    inset: '#111111',
    input: 'rgba(191,193,201,0.12)',
    button: "#f9f9f9"
  },
  text: {
    link: "#F6BE00",
    primary: '#fbfbfc',
    secondary: '#e3e4e8',
    tertiary: '#a9abb6',
    quarternary: '#6c6f7e',
    placeholder: 'rgba(145,148,161,0.5)',
    onPrimary: '#050505',
  },
  // ...
}

const defaultTheme: ThemeDefaults = {
  fontSizes: {
    14: '14px', // 0
    16: '16px', // 1
    18: '18px', // 2
    22: '22px', // 3
    26: '26px', // 4
    32: '32px', // 5
    40: '40px', // 6
  },
  fontWeights: {
    body: 400,
    subheading: 500,
    link: 600,
    bold: 700,
    heading: 800,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.3,
    code: 1.6,
  },
}
export const darkTheme = { ...defaultTheme, sizes, devices, ...dark }
export const lightTheme = { ...defaultTheme, sizes, devices, ...light }