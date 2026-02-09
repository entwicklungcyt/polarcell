import { reactive, computed, readonly, onMounted } from 'vue'

export const breakpoints = {
  xxs: 320, xs: 380, sm: 640, md: 768, lg: 1024,
  xl: 1280, '2xl': 1440, '3xl': 1640, '4xl': 1840,
} as const

export type Breakpoint = keyof typeof breakpoints

declare global {
  interface Window {
    __INITIAL_WIDTH__?: number
    __INITIAL_BREAKPOINT__?: Breakpoint
  }
}

// Reactive state
const state = reactive({
  width: typeof window !== 'undefined' ? window.__INITIAL_WIDTH__ || 0 : 0,
  breakpoint: typeof window !== 'undefined' ? window.__INITIAL_BREAKPOINT__ || 'xxs' : 'xxs',
})

// Helper to compute breakpoint
const getBreakpoint = (width: number): Breakpoint => {
  const keys = Object.keys(breakpoints).reverse() as Breakpoint[]
  return keys.find(k => width >= breakpoints[k]) || 'xxs'
}

// Computed properties
export const customViewport = readonly({
  width: computed(() => state.width),
  breakpoint: computed(() => state.breakpoint),
  isLessThan: (bp: Breakpoint) => state.width < breakpoints[bp],
  isGreaterThan: (bp: Breakpoint) => state.width > breakpoints[bp],
  isGreaterOrEquals: (bp: Breakpoint) => state.width >= breakpoints[bp],
  isReady: computed(() => typeof window !== 'undefined' && state.width > 0),
})

let initialized = false
export const useCustomViewport = () => {
  if (typeof window !== 'undefined' && !initialized) {
    initialized = true

    // Set initial width/breakpoint in case script didn't run (safety)
    state.width = window.__INITIAL_WIDTH__ || window.innerWidth
    state.breakpoint = window.__INITIAL_BREAKPOINT__ || getBreakpoint(state.width)

    const onResize = () => {
      state.width = window.innerWidth
      state.breakpoint = getBreakpoint(state.width)
    }

    window.addEventListener('resize', onResize)

    onMounted(() => {
      // Just in case mounted is later
      state.width = window.__INITIAL_WIDTH__ || window.innerWidth
      state.breakpoint = window.__INITIAL_BREAKPOINT__ || getBreakpoint(state.width)
    })
  }

  return customViewport
}
