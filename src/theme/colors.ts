// Definição das cores base
const palette = {
  // Cores primárias
  blue: {
    light: "#bbdefb",
    main: "#1976d2",
    dark: "#0d47a1",
  },

  // Cores neutras
  grey: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#eeeeee",
    300: "#e0e0e0",
    400: "#bdbdbd",
    500: "#9e9e9e",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
  },

  // Cores de status
  green: {
    light: "#a5d6a7",
    main: "#4caf50",
    dark: "#2e7d32",
  },

  red: {
    light: "#ef9a9a",
    main: "#f44336",
    dark: "#c62828",
  },

  // Cores básicas
  white: "#ffffff",
  black: "#000000",
};

// Definição dos temas
export const lightTheme = {
  // Cores de fundo
  background: {
    primary: palette.white,
    secondary: palette.grey[100],
    tertiary: palette.grey[200],
  },

  // Cores de texto
  text: {
    primary: palette.grey[900],
    secondary: palette.grey[600],
    disabled: palette.grey[500],
    hint: palette.grey[400],
  },

  // Cores de componentes
  primary: palette.blue.main,
  primaryLight: palette.blue.light,
  primaryDark: palette.blue.dark,

  // Cores de status
  success: palette.green.main,
  error: palette.red.main,

  // Cores de borda
  border: palette.grey[300],
  divider: palette.grey[200],

  // Cores de componentes específicos
  card: palette.white,
  checkbox: {
    background: palette.white,
    checked: palette.green.main,
    border: palette.grey[300],
  },
  switch: {
    track: {
      on: palette.blue.light,
      off: palette.grey[300],
    },
    thumb: {
      on: palette.blue.main,
      off: palette.grey[100],
    },
  },
  button: {
    primary: palette.blue.main,
    secondary: palette.red.main,
    text: palette.white,
  },
};

export const darkTheme = {
  // Cores de fundo
  background: {
    primary: palette.grey[900],
    secondary: palette.grey[800],
    tertiary: palette.grey[700],
  },

  // Cores de texto
  text: {
    primary: palette.grey[100],
    secondary: palette.grey[300],
    disabled: palette.grey[500],
    hint: palette.grey[600],
  },

  // Cores de componentes
  primary: palette.blue.main,
  primaryLight: palette.blue.light,
  primaryDark: palette.blue.dark,

  // Cores de status
  success: palette.green.main,
  error: palette.red.main,

  // Cores de borda
  border: palette.grey[700],
  divider: palette.grey[800],

  // Cores de componentes específicos
  card: palette.grey[800],
  checkbox: {
    background: palette.grey[800],
    checked: palette.green.main,
    border: palette.grey[600],
  },
  switch: {
    track: {
      on: palette.blue.dark,
      off: palette.grey[700],
    },
    thumb: {
      on: palette.blue.main,
      off: palette.grey[500],
    },
  },
  button: {
    primary: palette.blue.main,
    secondary: palette.red.main,
    text: palette.white,
  },
};

export type Theme = typeof lightTheme;