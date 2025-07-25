/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./stories/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      // Design Token Colors - Using CSS custom properties for runtime theme switching
      colors: {
        // Component semantic colors
        primary: {
          DEFAULT: 'var(--primary-bg)',
          text: 'var(--primary-text)',
          border: 'var(--primary-border)',
          hover: 'var(--primary-hover)',
        },
        secondary: {
          DEFAULT: 'var(--secondary-bg)',
          text: 'var(--secondary-text)',
          border: 'var(--secondary-border)',
          hover: 'var(--secondary-hover)',
        },
        success: {
          DEFAULT: 'var(--success-bg)',
          text: 'var(--success-text)',
          border: 'var(--success-border)',
          hover: 'var(--success-hover)',
        },
        warning: {
          DEFAULT: 'var(--warning-bg)',
          text: 'var(--warning-text)',
          border: 'var(--warning-border)',
          hover: 'var(--warning-hover)',
        },
        error: {
          DEFAULT: 'var(--error-bg)',
          text: 'var(--error-text)',
          border: 'var(--error-border)',
          hover: 'var(--error-hover)',
        },
        
        // Background semantic colors
        'background-primary': 'var(--bg-primary)',
        'background-secondary': 'var(--bg-secondary)',
        'background-muted': 'var(--bg-muted)',
        
        // Text semantic colors
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        
        // UI semantic colors
        border: {
          DEFAULT: 'var(--border-default)',
          muted: 'var(--border-muted)',
        },
        
        // Legacy support (keeping some of the old structure for existing components) 
        background: 'var(--bg-primary)', // Legacy class used in many components
        card: {
          DEFAULT: 'var(--bg-secondary)',
          foreground: 'var(--text-primary)',
        },
        foreground: 'var(--text-primary)',
        muted: {
          DEFAULT: 'var(--bg-muted)',
          foreground: 'var(--text-muted)',
        },
        ring: 'var(--primary-bg)',
        input: 'var(--border-default)',
      },
      
      // Design Token Spacing
      spacing: {
        'token-xs': 'var(--spacing-xs)',    // 0.25rem / 4px
        'token-sm': 'var(--spacing-sm)',    // 0.5rem / 8px
        'token-md': 'var(--spacing-md)',    // 1rem / 16px
        'token-lg': 'var(--spacing-lg)',    // 1.5rem / 24px
        'token-xl': 'var(--spacing-xl)',    // 2rem / 32px
        'token-2xl': 'var(--spacing-2xl)',  // 3rem / 48px
        'token-3xl': 'var(--spacing-3xl)',  // 4rem / 64px
        'token-4xl': 'var(--spacing-4xl)',  // 6rem / 96px
      },
      
      // Design Token Border Radius
      borderRadius: {
        'token-sm': 'var(--radius-sm)',     // 0.125rem / 2px
        'token-md': 'var(--radius-md)',     // 0.375rem / 6px  
        'token-lg': 'var(--radius-lg)',     // 0.5rem / 8px
        'token-xl': 'var(--radius-xl)',     // 0.75rem / 12px
        'token-2xl': 'var(--radius-2xl)',   // 1rem / 16px
        
        // Legacy support
        lg: 'var(--radius-lg)',
        md: 'var(--radius-md)',
        sm: 'var(--radius-sm)',
      },
      
      // Design Token Typography
      fontFamily: {
        'token-sans': 'var(--font-sans)',
        'token-mono': 'var(--font-mono)',
      },
      
      fontSize: {
        'token-xs': ['var(--text-xs)', { lineHeight: 'var(--leading-xs)' }],
        'token-sm': ['var(--text-sm)', { lineHeight: 'var(--leading-sm)' }],
        'token-base': ['var(--text-base)', { lineHeight: 'var(--leading-base)' }],
        'token-lg': ['var(--text-lg)', { lineHeight: 'var(--leading-lg)' }],
        'token-xl': ['var(--text-xl)', { lineHeight: 'var(--leading-xl)' }],
        'token-2xl': ['var(--text-2xl)', { lineHeight: 'var(--leading-2xl)' }],
        'token-3xl': ['var(--text-3xl)', { lineHeight: 'var(--leading-3xl)' }],
      },
      
      // Design Token Shadows
      boxShadow: {
        'token-sm': 'var(--shadow-sm)',
        'token-md': 'var(--shadow-md)',
        'token-lg': 'var(--shadow-lg)',
        'token-xl': 'var(--shadow-xl)',
      },
      
      // Design Token Animation
      transitionDuration: {
        'token-fast': 'var(--duration-fast)',     // 150ms
        'token-normal': 'var(--duration-normal)', // 200ms  
        'token-slow': 'var(--duration-slow)',     // 300ms
      },
      
      transitionTimingFunction: {
        'token-ease': 'var(--easing-ease)',
        'token-ease-in': 'var(--easing-ease-in)',
        'token-ease-out': 'var(--easing-ease-out)',
      },
      
      // Custom keyframes for tooltip animations
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        'zoom-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'zoom-out': {
          from: { opacity: '1', transform: 'scale(1)' },
          to: { opacity: '0', transform: 'scale(0.95)' },
        },
        'slide-in-from-top': {
          from: { opacity: '0', transform: 'translateY(-4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-from-bottom': {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-from-left': {
          from: { opacity: '0', transform: 'translateX(-4px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-from-right': {
          from: { opacity: '0', transform: 'translateX(4px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.8)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'expand-width': {
          from: { width: 'auto' },
          to: { width: '280px' },
        },
        'expand-height': {
          from: { maxHeight: '2rem' },
          to: { maxHeight: '6rem' },
        },
      },
      
      // Custom animations
      animation: {
        'fade-in': 'fade-in 0.2s ease-out',
        'fade-out': 'fade-out 0.15s ease-in',
        'zoom-in': 'zoom-in 0.2s ease-out',
        'zoom-out': 'zoom-out 0.15s ease-in',
        'slide-in-from-top': 'slide-in-from-top 0.2s ease-out',
        'slide-in-from-bottom': 'slide-in-from-bottom 0.2s ease-out',
        'slide-in-from-left': 'slide-in-from-left 0.2s ease-out',
        'slide-in-from-right': 'slide-in-from-right 0.2s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        // Duration variations
        'fade-in-fast': 'fade-in 0.1s ease-out',
        'zoom-in-fast': 'zoom-in 0.15s ease-out',
        'slide-in-from-bottom-slow': 'slide-in-from-bottom 0.3s ease-out',
        // Progressive tooltip animations
        'expand-width': 'expand-width 0.3s ease-out',
        'expand-height': 'expand-height 0.2s ease-out 0.3s',
      },
      
      // Material Design Shadow Variations
      dropShadow: {
        'material-1': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        'material-2': '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
        'material-3': '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
        'material-4': '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
        'material-5': '0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22)',
      }
    }
  },
  plugins: []
}