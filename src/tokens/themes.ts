/**
 * Theme System - Multiple Design Token Sets
 * Each theme defines its own color palette and semantic tokens
 */

// Color palette type
interface ColorPalette {
  // Primary colors
  primary: {
    50: string
    100: string
    200: string
    300: string
    400: string
    500: string  // main
    600: string
    700: string
    800: string
    900: string
    950: string
  }
  // Neutral colors
  neutral: {
    50: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
    950: string
  }
  // Semantic colors
  success: {
    50: string
    500: string
    600: string
    900: string
  }
  warning: {
    50: string
    500: string
    600: string
    900: string
  }
  error: {
    50: string
    500: string
    600: string
    900: string
  }
}

// Semantic token mapping
interface SemanticTokens {
  // Background colors
  background: {
    primary: string
    secondary: string
    muted: string
    accent: string
  }
  // Text colors
  text: {
    primary: string
    secondary: string
    muted: string
    inverse: string
  }
  // Border colors
  border: {
    primary: string
    secondary: string
    muted: string
  }
  // Component semantic colors
  component: {
    primary: {
      bg: string
      text: string
      border: string
      hover: string
    }
    secondary: {
      bg: string
      text: string
      border: string
      hover: string
    }
    success: {
      bg: string
      text: string
      border: string
      hover: string
    }
    warning: {
      bg: string
      text: string
      border: string
      hover: string
    }
    error: {
      bg: string
      text: string
      border: string
      hover: string
    }
  }
}

// =====================================================
// LIGHT THEME
// =====================================================
const lightPalette: ColorPalette = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',  // main
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  },
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
  success: {
    50: '#f0fdf4',
    500: '#22c55e',
    600: '#16a34a',
    900: '#14532d',
  },
  warning: {
    50: '#fffbeb',
    500: '#f59e0b',
    600: '#d97706',
    900: '#78350f',
  },
  error: {
    50: '#fef2f2',
    500: '#ef4444',
    600: '#dc2626',
    900: '#7f1d1d',
  }
}

export const lightTheme: SemanticTokens = {
  background: {
    primary: lightPalette.neutral[50],
    secondary: lightPalette.neutral[100],
    muted: lightPalette.neutral[200],
    accent: lightPalette.primary[50],
  },
  text: {
    primary: lightPalette.neutral[900],
    secondary: lightPalette.neutral[700],
    muted: lightPalette.neutral[500],
    inverse: lightPalette.neutral[50],
  },
  border: {
    primary: lightPalette.neutral[300],
    secondary: lightPalette.neutral[200],
    muted: lightPalette.neutral[100],
  },
  component: {
    primary: {
      bg: lightPalette.primary[500],
      text: lightPalette.neutral[50],
      border: lightPalette.primary[500],
      hover: lightPalette.primary[600],
    },
    secondary: {
      bg: lightPalette.neutral[100],
      text: lightPalette.neutral[900],
      border: lightPalette.neutral[300],
      hover: lightPalette.neutral[200],
    },
    success: {
      bg: lightPalette.success[500],
      text: lightPalette.neutral[50],
      border: lightPalette.success[500],
      hover: lightPalette.success[600],
    },
    warning: {
      bg: lightPalette.warning[500],
      text: lightPalette.neutral[50],
      border: lightPalette.warning[500],
      hover: lightPalette.warning[600],
    },
    error: {
      bg: lightPalette.error[500],
      text: lightPalette.neutral[50],
      border: lightPalette.error[500],
      hover: lightPalette.error[600],
    },
  }
}

// =====================================================
// DARK THEME
// =====================================================
const darkPalette: ColorPalette = {
  primary: {
    50: '#082f49',
    100: '#0c4a6e',
    200: '#075985',
    300: '#0369a1',
    400: '#0284c7',
    500: '#0ea5e9',  // main
    600: '#38bdf8',
    700: '#7dd3fc',
    800: '#bae6fd',
    900: '#e0f2fe',
    950: '#f0f9ff',
  },
  neutral: {
    50: '#020617',
    100: '#0f172a',
    200: '#1e293b',
    300: '#334155',
    400: '#475569',
    500: '#64748b',
    600: '#94a3b8',
    700: '#cbd5e1',
    800: '#e2e8f0',
    900: '#f1f5f9',
    950: '#f8fafc',
  },
  success: {
    50: '#14532d',
    500: '#22c55e',
    600: '#16a34a',
    900: '#f0fdf4',
  },
  warning: {
    50: '#78350f',
    500: '#f59e0b',
    600: '#d97706',
    900: '#fffbeb',
  },
  error: {
    50: '#7f1d1d',
    500: '#ef4444',
    600: '#dc2626',
    900: '#fef2f2',
  }
}

export const darkTheme: SemanticTokens = {
  background: {
    primary: darkPalette.neutral[50],
    secondary: darkPalette.neutral[100],
    muted: darkPalette.neutral[200],
    accent: darkPalette.primary[50],
  },
  text: {
    primary: darkPalette.neutral[900],
    secondary: darkPalette.neutral[700],
    muted: darkPalette.neutral[500],
    inverse: darkPalette.neutral[50],
  },
  border: {
    primary: darkPalette.neutral[300],
    secondary: darkPalette.neutral[200],
    muted: darkPalette.neutral[100],
  },
  component: {
    primary: {
      bg: darkPalette.primary[500],
      text: darkPalette.neutral[50],
      border: darkPalette.primary[500],
      hover: darkPalette.primary[600],
    },
    secondary: {
      bg: darkPalette.neutral[200],
      text: darkPalette.neutral[900],
      border: darkPalette.neutral[300],
      hover: darkPalette.neutral[300],
    },
    success: {
      bg: darkPalette.success[500],
      text: darkPalette.neutral[50],
      border: darkPalette.success[500],
      hover: darkPalette.success[600],
    },
    warning: {
      bg: darkPalette.warning[500],
      text: darkPalette.neutral[50],
      border: darkPalette.warning[500],
      hover: darkPalette.warning[600],
    },
    error: {
      bg: darkPalette.error[500],
      text: darkPalette.neutral[50],
      border: darkPalette.error[500],
      hover: darkPalette.error[600],
    },
  }
}

// =====================================================
// BRAND THEME (Custom company colors)
// =====================================================
const brandPalette: ColorPalette = {
  primary: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef',  // main - vibrant purple
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
    950: '#4a044e',
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },
  success: {
    50: '#ecfdf5',
    500: '#10b981',
    600: '#059669',
    900: '#064e3b',
  },
  warning: {
    50: '#fffbeb',
    500: '#f59e0b',
    600: '#d97706',
    900: '#78350f',
  },
  error: {
    50: '#fef2f2',
    500: '#ef4444',
    600: '#dc2626',
    900: '#7f1d1d',
  }
}

export const brandTheme: SemanticTokens = {
  background: {
    primary: brandPalette.neutral[50],
    secondary: brandPalette.neutral[100],
    muted: brandPalette.neutral[200],
    accent: brandPalette.primary[50],
  },
  text: {
    primary: brandPalette.neutral[900],
    secondary: brandPalette.neutral[700],
    muted: brandPalette.neutral[500],
    inverse: brandPalette.neutral[50],
  },
  border: {
    primary: brandPalette.neutral[300],
    secondary: brandPalette.neutral[200],
    muted: brandPalette.neutral[100],
  },
  component: {
    primary: {
      bg: brandPalette.primary[500],  // Vibrant purple
      text: brandPalette.neutral[50],
      border: brandPalette.primary[500],
      hover: brandPalette.primary[600],
    },
    secondary: {
      bg: brandPalette.neutral[100],
      text: brandPalette.neutral[900],
      border: brandPalette.neutral[300],
      hover: brandPalette.neutral[200],
    },
    success: {
      bg: brandPalette.success[500],
      text: brandPalette.neutral[50],
      border: brandPalette.success[500],
      hover: brandPalette.success[600],
    },
    warning: {
      bg: brandPalette.warning[500],
      text: brandPalette.neutral[50],
      border: brandPalette.warning[500],
      hover: brandPalette.warning[600],
    },
    error: {
      bg: brandPalette.error[500],
      text: brandPalette.neutral[50],
      border: brandPalette.error[500],
      hover: brandPalette.error[600],
    },
  }
}

// Theme registry
export const themes = {
  light: lightTheme,
  dark: darkTheme,
  brand: brandTheme,
} as const

export type ThemeName = keyof typeof themes
export type Theme = typeof lightTheme

export { type SemanticTokens }