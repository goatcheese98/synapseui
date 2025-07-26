<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/ui/button/Button.vue'
import VStack from '@/components/ui/stack/VStack.vue'
import HStack from '@/components/ui/stack/HStack.vue'

const clickCount = ref(0)
const lastEffect = ref('')
const cursorTracker = ref<HTMLElement>()
const cursorShimmer = ref<HTMLElement>()
const directionalRipple = ref<HTMLElement>()
const proximityGlow = ref<HTMLElement>()
const neuralResponse = ref<HTMLElement>()

const handleClick = (effectType: string) => {
  clickCount.value++
  lastEffect.value = effectType
}

// Enhanced cursor tracking for advanced interactions
const trackCursor = (event: MouseEvent) => {
  const element = cursorTracker.value
  if (!element) return
  
  const rect = element.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  // Update CSS custom properties for cursor position
  element.style.setProperty('--cursor-x', `${x}px`)
  element.style.setProperty('--cursor-y', `${y}px`)
  
  console.log(`Cursor: ${x}, ${y}`) // Debug
}

// Cursor tracking shimmer effect
const trackCursorShimmer = (event: MouseEvent) => {
  const element = cursorShimmer.value
  if (!element) return
  
  const rect = element.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  // Update shimmer position and trigger animation
  const shimmerEffect = element.querySelector('.cursor-shimmer-effect') as HTMLElement
  if (shimmerEffect) {
    shimmerEffect.style.setProperty('--shimmer-x', `${x}px`)
    shimmerEffect.style.setProperty('--shimmer-y', `${y}px`)
    
    // Trigger shimmer animation
    shimmerEffect.classList.remove('shimmer-active')
    shimmerEffect.offsetHeight // Force reflow
    shimmerEffect.classList.add('shimmer-active')
  }
  
  console.log(`Shimmer: ${x}, ${y}`) // Debug
}

// Enhanced directional ripple based on cursor position
const handleDirectionalRipple = (event: MouseEvent) => {
  const element = directionalRipple.value
  if (!element) return
  
  const rect = element.getBoundingClientRect()  
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  // Set CSS custom properties for ripple origin
  element.style.setProperty('--ripple-x', `${x}px`)
  element.style.setProperty('--ripple-y', `${y}px`)
  
  // Continuously update ripple position
  const rippleElement = element.querySelector('.ripple-effect') as HTMLElement
  if (rippleElement) {
    rippleElement.style.left = `${x}px`
    rippleElement.style.top = `${y}px`
  }
  
  console.log(`Ripple: ${x}, ${y}`) // Debug
}

// Enhanced proximity-based glow with position tracking
const handleProximityGlow = (event: MouseEvent) => {
  const element = proximityGlow.value
  if (!element) return
  
  const rect = element.getBoundingClientRect()
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  // Calculate distance from center (0 to 1)
  const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2))
  const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2))
  const proximity = 1 - Math.min(distance / maxDistance, 1)
  
  // Set glow intensity and position for more dramatic effect
  const intensity = Math.max(proximity * 0.9 + 0.3, 0.2)
  element.style.setProperty('--glow-intensity', intensity.toString())
  element.style.setProperty('--glow-x', `${(x / rect.width) * 100}%`)
  element.style.setProperty('--glow-y', `${(y / rect.height) * 100}%`)
  
  console.log(`Glow: ${x}, ${y}, intensity: ${intensity}`) // Debug
}

// Neural response with cursor tracking
const handleNeuralResponse = (event: MouseEvent) => {
  const element = neuralResponse.value
  if (!element) return
  
  const rect = element.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  // Update neural pulse position
  const neuralPulse = element.querySelector('.neural-pulse') as HTMLElement
  if (neuralPulse) {
    neuralPulse.style.setProperty('--neural-x', `${(x / rect.width) * 100}%`)
    neuralPulse.style.setProperty('--neural-y', `${(y / rect.height) * 100}%`)
  }
  
  console.log(`Neural: ${x}, ${y}`) // Debug
}

// Reset ripple effect when mouse leaves
const resetRipple = () => {
  const element = directionalRipple.value
  if (!element) return
  
  const rippleElement = element.querySelector('.ripple-effect') as HTMLElement
  if (rippleElement) {
    rippleElement.style.transform = 'translate(-50%, -50%) scale(0)'
    rippleElement.style.opacity = '0'
  }
}

// Reset cursor tracking light when mouse leaves
const resetCursorTracking = () => {
  const element = cursorTracker.value
  if (!element) return
  
  const cursorLight = element.querySelector('.cursor-light') as HTMLElement
  if (cursorLight) {
    cursorLight.style.opacity = '0'
  }
}

// Reset cursor shimmer when mouse leaves
const resetCursorShimmer = () => {
  const element = cursorShimmer.value
  if (!element) return
  
  const shimmerEffect = element.querySelector('.cursor-shimmer-effect') as HTMLElement
  if (shimmerEffect) {
    shimmerEffect.classList.remove('shimmer-active')
    shimmerEffect.style.opacity = '0'
  }
}

// Reset proximity glow when mouse leaves
const resetProximityGlow = () => {
  const element = proximityGlow.value
  if (!element) return
  
  const glowOverlay = element.querySelector('.glow-overlay') as HTMLElement
  if (glowOverlay) {
    glowOverlay.style.opacity = '0'
    element.style.removeProperty('--glow-intensity')
    element.style.removeProperty('--glow-x')
    element.style.removeProperty('--glow-y')
  }
}

// Reset neural response when mouse leaves
const resetNeuralResponse = () => {
  const element = neuralResponse.value
  if (!element) return
  
  const neuralPulse = element.querySelector('.neural-pulse') as HTMLElement
  if (neuralPulse) {
    neuralPulse.style.opacity = '0'
    element.style.removeProperty('--neural-x')
    element.style.removeProperty('--neural-y')
  }
}
</script>

<template>
  <Story title="Experimental/Button Effects Lab" :layout="{ type: 'single', iframe: false }">
    <Variant title="Advanced Button Effects Laboratory">
      <div class="space-y-16 p-8 max-w-7xl mx-auto btn-effects-lab">
        <!-- Header -->
        <div class="text-center">
          <h1 class="text-3xl font-bold mb-4">✨ Advanced Button Effects Laboratory</h1>
          <p class="text-lg text-text-secondary mb-2">
            Explore shimmer, ripple, glow, cursor detection, and other modern button effects for Synapse-based UI
          </p>
          <div class="text-sm text-text-muted">
            Clicks: {{ clickCount }} | Last effect: {{ lastEffect || 'none' }}
          </div>
        </div>

        <!-- Text Warping (Our Default) -->
        <section>
          <h2 class="text-2xl font-semibold mb-6">🔤 Text Warping (Our Default)</h2>
          <div class="bg-background-muted p-6 rounded-lg">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="primary" @click="handleClick('compress-default')">
                Default Compress
              </Button>
              <Button variant="success" text-warp-type="wave" @click="handleClick('wave')">
                Wave Effect
              </Button>
              <Button variant="warning" text-warp-type="bend" @click="handleClick('bend')">
                Bend Effect
              </Button>
              <Button variant="secondary" text-warp-type="ripple" @click="handleClick('ripple')">
                Ripple Effect
              </Button>
            </div>
            <p class="text-sm text-text-secondary mt-3">✓ Our perfected text warping with compress (0.8) as default</p>
          </div>
        </section>

        <!-- Shimmer Effects -->
        <section>
          <h2 class="text-2xl font-semibold mb-6">✨ Shimmer Effects</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Basic Shimmer -->
            <div class="text-center p-4 border rounded-lg">
              <h3 class="font-medium mb-3">Basic Shimmer</h3>
              <button 
                class="relative px-6 py-3 bg-primary text-primary-text rounded-token-md font-medium overflow-hidden
                       before:absolute before:inset-0 before:rounded-[inherit]
                       before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%)]
                       before:bg-[length:250%_250%] before:bg-[position:200%_0]
                       hover:before:bg-[position:-100%_0] hover:before:duration-[1500ms]
                       transition-all duration-200"
                @click="handleClick('basic-shimmer')"
              >
                Shimmer Button
              </button>
              <p class="text-xs text-text-secondary mt-2">Light sweep on hover</p>
            </div>

            <!-- Continuous Shimmer -->
            <div class="text-center p-4 border rounded-lg">
              <h3 class="font-medium mb-3">Continuous Shimmer</h3>
              <button 
                class="relative px-6 py-3 bg-success text-success-text rounded-token-md font-medium overflow-hidden
                       before:absolute before:inset-0 before:rounded-[inherit]
                       before:bg-[linear-gradient(110deg,transparent_40%,rgba(255,255,255,0.6)_50%,transparent_60%)]
                       before:bg-[length:200%_100%] before:animate-[shimmer_2s_infinite]
                       transition-all duration-200"
                @click="handleClick('continuous-shimmer')"
              >
                Always Shimmering
              </button>
              <p class="text-xs text-text-secondary mt-2">Continuous animation</p>
            </div>

            <!-- Gradient Shimmer -->
            <div class="text-center p-4 border rounded-lg">
              <h3 class="font-medium mb-3">Gradient Shimmer</h3>
              <button 
                class="relative px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-token-md font-medium overflow-hidden
                       before:absolute before:inset-0 before:rounded-[inherit]
                       before:bg-[linear-gradient(45deg,transparent_30%,rgba(255,255,255,0.8)_50%,transparent_70%)]
                       before:bg-[length:300%_300%] before:bg-[position:200%_0]
                       hover:before:bg-[position:-100%_0] hover:before:duration-[1000ms]
                       hover:scale-105 transition-all duration-200"
                @click="handleClick('gradient-shimmer')"
              >
                Gradient Shimmer  
              </button>
              <p class="text-xs text-text-secondary mt-2">Gradient with shimmer</p>
            </div>
          </div>
        </section>

        <!-- Glow Effects -->
        <section>
          <h2 class="text-2xl font-semibold mb-6">🌟 Glow Effects</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Basic Glow -->
            <div class="text-center p-4 border rounded-lg">
              <h3 class="font-medium mb-3">Basic Glow</h3>
              <button 
                class="px-6 py-3 bg-primary text-primary-text rounded-token-md font-medium
                       shadow-[0_0_20px_rgba(59,130,246,0.3)]
                       hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]
                       hover:scale-105 transition-all duration-300"
                @click="handleClick('basic-glow')"
              >
                Glowing Button
              </button>
              <p class="text-xs text-text-secondary mt-2">Soft glow shadow</p>
            </div>

            <!-- Neon Glow -->
            <div class="text-center p-4 border rounded-lg">
              <h3 class="font-medium mb-3">Neon Glow</h3>
              <button 
                class="px-6 py-3 bg-gray-900 text-cyan-400 border-2 border-cyan-400 rounded-token-md font-medium
                       shadow-[0_0_10px_#22d3ee,inset_0_0_10px_rgba(34,211,238,0.1)]
                       hover:shadow-[0_0_20px_#22d3ee,0_0_40px_#22d3ee,inset_0_0_20px_rgba(34,211,238,0.2)]
                       hover:text-white transition-all duration-300"
                @click="handleClick('neon-glow')"
              >
                Neon Effect
              </button>
              <p class="text-xs text-text-secondary mt-2">Cyberpunk neon style</p>
            </div>

            <!-- Pulse Glow -->
            <div class="text-center p-4 border rounded-lg">
              <h3 class="font-medium mb-3">Pulse Glow</h3>
              <button 
                class="px-6 py-3 bg-success text-success-text rounded-token-md font-medium
                       shadow-[0_0_15px_rgba(34,197,94,0.4)]
                       animate-[pulse-glow_2s_infinite]
                       hover:scale-105 transition-transform duration-200"
                @click="handleClick('pulse-glow')"
              >
                Pulsing Glow
              </button>
              <p class="text-xs text-text-secondary mt-2">Breathing glow effect</p>
            </div>
          </div>
        </section>

        <!-- Border Animations -->
        <section>
          <h2 class="text-2xl font-semibold mb-6">🔥 Border Animations</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Border Beam -->
            <div class="text-center p-4 border rounded-lg">
              <h3 class="font-medium mb-3">Border Beam</h3>
              <div class="relative">
                <button 
                  class="relative px-6 py-3 bg-primary text-primary-text rounded-token-md font-medium border-2 border-transparent
                         before:absolute before:inset-0 before:rounded-[inherit] before:p-[2px] 
                         before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent
                         before:bg-[length:200%_100%] before:animate-[border-beam_2s_infinite]
                         before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]
                         before:[mask-composite:xor] hover:scale-105 transition-all duration-200"
                  @click="handleClick('border-beam')"
                >
                  Border Beam
                </button>
              </div>
              <p class="text-xs text-text-secondary mt-2">Traveling light beam</p>
            </div>

            <!-- Gradient Border -->
            <div class="text-center p-4 border rounded-lg">
              <h3 class="font-medium mb-3">Gradient Border</h3>
              <button 
                class="relative px-6 py-3 bg-background-primary text-text-primary rounded-token-md font-medium
                       border-2 border-transparent bg-clip-padding
                       before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:p-[2px]
                       before:bg-gradient-to-r before:from-blue-500 before:via-purple-500 before:to-pink-500
                       before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]
                       before:[mask-composite:xor] hover:scale-105 transition-all duration-200"
                @click="handleClick('gradient-border')"
              >
                Gradient Border
              </button>
              <p class="text-xs text-text-secondary mt-2">Static gradient border</p>
            </div>
          </div>
        </section>

        <!-- Ripple Effects -->
        <section>
          <h2 class="text-2xl font-semibold mb-6">💧 Ripple Effects</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Click Ripple -->
            <div class="text-center p-4 border rounded-lg">
              <h3 class="font-medium mb-3">Click Ripple</h3>
              <button 
                class="relative px-6 py-3 bg-primary text-primary-text rounded-token-md font-medium overflow-hidden
                       before:absolute before:inset-0 before:rounded-[inherit] before:bg-white before:opacity-0
                       before:scale-0 before:transition-all before:duration-500
                       active:before:scale-[2] active:before:opacity-20 active:before:duration-0
                       transition-all duration-200"
                @click="handleClick('click-ripple')"
              >
                Click Ripple
              </button>
              <p class="text-xs text-text-secondary mt-2">Ripple on click</p>
            </div>

            <!-- Hover Ripple -->
            <div class="text-center p-4 border rounded-lg">
              <h3 class="font-medium mb-3">Hover Ripple</h3>
              <button 
                class="relative px-6 py-3 bg-success text-success-text rounded-token-md font-medium overflow-hidden
                       before:absolute before:inset-0 before:rounded-[inherit] before:bg-white before:opacity-0
                       before:scale-0 before:transition-all before:duration-700
                       hover:before:scale-[1.5] hover:before:opacity-10
                       transition-all duration-200"
                @click="handleClick('hover-ripple')"
              >
                Hover Ripple
              </button>
              <p class="text-xs text-text-secondary mt-2">Ripple on hover</p>
            </div>

            <!-- Pulse Ripple -->
            <div class="text-center p-4 border rounded-lg">
              <h3 class="font-medium mb-3">Pulse Ripple</h3>
              <button 
                class="relative px-6 py-3 bg-warning text-warning-text rounded-token-md font-medium
                       before:absolute before:inset-0 before:rounded-[inherit] before:bg-white
                       before:animate-[pulse-ripple_2s_infinite] before:opacity-20
                       hover:scale-105 transition-all duration-200"
                @click="handleClick('pulse-ripple')"
              >
                Pulse Ripple
              </button>
              <p class="text-xs text-text-secondary mt-2">Continuous pulse</p>
            </div>
          </div>
        </section>

        <!-- Cursor Detection & Synapse Effects -->
        <section>
          <h2 class="text-2xl font-semibold mb-6">🤖 Cursor Detection & Synapse Effects</h2>
          <p class="text-text-secondary mb-6">Advanced cursor-responsive animations crucial for Synapse-based UI systems</p>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Cursor Tracking -->
            <div class="text-center p-4 border rounded-lg">
              <h3 class="font-medium mb-3">Cursor Tracking</h3>
              <div 
                class="relative inline-block px-6 py-3 bg-gray-800 text-white rounded-token-md font-medium overflow-hidden
                       hover:shadow-lg transition-all duration-200 cursor-tracking-btn cursor-pointer"
                @mousemove="trackCursor"
                @mouseleave="resetCursorTracking"
                @click="handleClick('cursor-tracking')"
                ref="cursorTracker"
              >
                <span class="cursor-light"></span>
                <span class="relative z-10">Cursor Tracker</span>
              </div>
              <p class="text-xs text-text-secondary mt-2">Light follows cursor position</p>
            </div>

            <!-- Cursor Tracking Shimmer -->
            <div class="text-center p-4 border rounded-lg">
              <h3 class="font-medium mb-3">Cursor Tracking Shimmer</h3>
              <div 
                class="relative inline-block px-6 py-3 bg-gray-900 text-white rounded-token-md font-medium overflow-hidden
                       hover:shadow-lg transition-all duration-200 cursor-shimmer-btn cursor-pointer"
                @mousemove="trackCursorShimmer"
                @mouseleave="resetCursorShimmer"
                @click="handleClick('cursor-shimmer')"
                ref="cursorShimmer"
              >
                <span class="cursor-shimmer-effect"></span>
                <span class="relative z-10">Shimmer Track</span>
              </div>
              <p class="text-xs text-text-secondary mt-2">Shimmer follows cursor with trail</p>
            </div>

            <!-- Directional Ripple -->
            <div class="text-center p-4 border rounded-lg">
              <h3 class="font-medium mb-3">Directional Ripple</h3>
              <div 
                class="relative inline-block px-6 py-3 bg-green-600 text-white rounded-token-md font-medium overflow-hidden
                       hover:shadow-lg transition-all duration-200 directional-ripple-btn cursor-pointer"
                @mousemove="handleDirectionalRipple"
                @mouseleave="resetRipple"
                @click="handleClick('directional-ripple')"
                ref="directionalRipple"
              >
                <span class="ripple-effect"></span>
                <span class="relative z-10">Directional Ripple</span>
              </div>
              <p class="text-xs text-text-secondary mt-2">Ripple from cursor position</p>
            </div>

            <!-- Proximity Glow -->
            <div class="text-center p-4 border rounded-lg">
              <h3 class="font-medium mb-3">Proximity Glow</h3>
              <div 
                class="relative inline-block px-6 py-3 bg-indigo-700 text-white rounded-token-md font-medium
                       hover:shadow-lg transition-all duration-200 proximity-glow-btn cursor-pointer"
                @mousemove="handleProximityGlow"
                @mouseleave="resetProximityGlow"
                @click="handleClick('proximity-glow')"
                ref="proximityGlow"
              >
                <span class="glow-overlay"></span>
                <span class="relative z-10">Proximity Glow</span>
              </div>
              <p class="text-xs text-text-secondary mt-2">Glow intensity based on distance</p>
            </div>

            <!-- Neural Response -->
            <div class="text-center p-4 border rounded-lg">
              <h3 class="font-medium mb-3">Neural Response</h3>
              <div 
                class="relative inline-block px-6 py-3 bg-red-600 text-white rounded-token-md font-medium overflow-hidden
                       hover:shadow-lg transition-all duration-200 neural-response-btn cursor-pointer"
                @mousemove="handleNeuralResponse"
                @mouseleave="resetNeuralResponse"
                @click="handleClick('neural-response')"
                ref="neuralResponse"
              >
                <span class="neural-pulse"></span>
                <span class="relative z-10">Neural Pulse</span>
              </div>
              <p class="text-xs text-text-secondary mt-2">Synapse-like neural activation</p>
            </div>

            <!-- Morphing Button -->
            <div class="text-center p-4 border rounded-lg">
              <h3 class="font-medium mb-3">Morphing Button</h3>
              <div 
                class="relative inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-token-md font-medium
                       hover:rounded-full hover:px-10 hover:shadow-[0_0_40px_rgba(168,85,247,0.6)]
                       transition-all duration-[1200ms] ease-out
                       before:absolute before:inset-0 before:rounded-[inherit] before:opacity-0
                       before:bg-gradient-to-r before:from-pink-600 before:to-purple-600
                       hover:before:opacity-100 before:transition-all before:duration-[1200ms]
                       hover:scale-105 cursor-pointer"
                @click="handleClick('morphing-button')"
              >
                <span class="relative z-10">Morph Shape</span>
              </div>
              <p class="text-xs text-text-secondary mt-2">Shape changes on interaction</p>
            </div>
          </div>
        </section>

        <!-- Magnetic Effects -->
        <section>
          <h2 class="text-2xl font-semibold mb-6">🧲 Magnetic Effects</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Magnetic Hover -->
            <div class="text-center p-4 border rounded-lg">
              <h3 class="font-medium mb-3">Magnetic Hover</h3>
              <button 
                class="px-6 py-3 bg-primary text-primary-text rounded-token-md font-medium
                       hover:scale-110 hover:-translate-y-1 hover:shadow-lg
                       transition-all duration-200 hover:duration-100"
                @click="handleClick('magnetic-hover')"
              >
                Magnetic Button
              </button>
              <p class="text-xs text-text-secondary mt-2">Attracts cursor</p>
            </div>

            <!-- Tilt Effect -->
            <div class="text-center p-4 border rounded-lg">
              <h3 class="font-medium mb-3">Tilt Effect</h3>
              <button 
                class="px-6 py-3 bg-success text-success-text rounded-token-md font-medium
                       hover:rotate-3 hover:scale-105 hover:shadow-lg
                       transition-all duration-200"
                @click="handleClick('tilt-effect')"
              >
                Tilt Button
              </button>
              <p class="text-xs text-text-secondary mt-2">Subtle tilt on hover</p>
            </div>

            <!-- Bounce Effect -->
            <div class="text-center p-4 border rounded-lg">
              <h3 class="font-medium mb-3">Bounce Effect</h3>
              <button 
                class="px-6 py-3 bg-warning text-warning-text rounded-token-md font-medium
                       hover:animate-bounce hover:shadow-lg
                       transition-all duration-200"
                @click="handleClick('bounce-effect')"
              >
                Bouncy Button
              </button>
              <p class="text-xs text-text-secondary mt-2">Bounce animation</p>
            </div>
          </div>
        </section>

        <!-- Combination Effects -->
        <section>
          <h2 class="text-2xl font-semibold mb-6">🎨 Combination Effects</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Shimmer + Glow -->
            <div class="text-center p-4 border rounded-lg">
              <h3 class="font-medium mb-3">Shimmer + Glow</h3>
              <button 
                class="relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-token-md font-medium overflow-hidden
                       shadow-[0_0_20px_rgba(59,130,246,0.4)]
                       before:absolute before:inset-0 before:rounded-[inherit]
                       before:bg-[linear-gradient(45deg,transparent_30%,rgba(255,255,255,0.7)_50%,transparent_70%)]
                       before:bg-[length:250%_250%] before:bg-[position:200%_0]
                       hover:before:bg-[position:-100%_0] hover:before:duration-[1200ms]
                       hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:scale-105
                       transition-all duration-300"
                @click="handleClick('shimmer-glow')"
              >
                Shimmer Glow
              </button>
              <p class="text-xs text-text-secondary mt-2">Best of both worlds</p>
            </div>

            <!-- Neon + Text Warp -->
            <div class="text-center p-4 border rounded-lg">
              <h3 class="font-medium mb-3">Neon + Text Warp</h3>
              <Button
                variant="outline"
                class="bg-gray-900 border-cyan-400 text-cyan-400
                       shadow-[0_0_10px_#22d3ee,inset_0_0_10px_rgba(34,211,238,0.1)]
                       hover:shadow-[0_0_20px_#22d3ee,0_0_40px_#22d3ee]
                       hover:text-white transition-all duration-300"
                text-warp-type="wave"
                :text-warp-intensity="1.2"
                @click="handleClick('neon-warp')"
              >
                Cyber Warp
              </Button>
              <p class="text-xs text-text-secondary mt-2">Futuristic combo</p>
            </div>
          </div>
        </section>

        <!-- Performance Test -->
        <section>
          <h2 class="text-2xl font-semibold mb-6">⚡ Performance Test</h2>
          <div class="bg-background-muted p-6 rounded-lg">
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              <button 
                v-for="n in 24" 
                :key="n"
                :class="[
                  'px-4 py-2 rounded-token-md font-medium text-sm relative overflow-hidden transition-all duration-200',
                  ['bg-primary text-primary-text', 'bg-success text-success-text', 'bg-warning text-warning-text', 'bg-error text-error-text'][n % 4],
                  n % 3 === 0 ? 'hover:scale-105 shadow-lg hover:shadow-xl' : '',
                  n % 4 === 0 ? 'before:absolute before:inset-0 before:bg-white before:opacity-0 hover:before:opacity-20 before:transition-opacity' : '',
                  n % 5 === 0 ? 'animate-pulse' : ''
                ]"
                @click="handleClick(`perf-${n}`)"
              >
                {{ ['Shimmer', 'Glow', 'Pulse', 'Ripple', 'Neon', 'Beam'][n % 6] }} {{ n }}
              </button>
            </div>
            <p class="text-sm text-text-secondary mt-4">
              24 buttons with mixed effects - test performance and visual harmony
            </p>
          </div>
        </section>

        <!-- Design Recommendations -->
        <section class="bg-background-secondary p-8 rounded-lg">
          <h2 class="text-2xl font-semibold mb-6">💡 Effect Usage Recommendations</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="text-center">
              <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-primary-text text-2xl">🎯</span>
              </div>
              <h3 class="font-semibold mb-2">Primary Actions</h3>
              <p class="text-sm text-text-secondary mb-3">Text warp + subtle glow</p>
              <Button variant="primary" class="shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                Default + Glow
              </Button>
            </div>
            
            <div class="text-center">
              <div class="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-success-text text-2xl">✨</span>
              </div>
              <h3 class="font-semibold mb-2">Call-to-Action</h3>
              <p class="text-sm text-text-secondary mb-3">Shimmer for attention</p>
              <button 
                class="relative px-4 py-2 bg-success text-success-text rounded-token-md font-medium overflow-hidden
                       before:absolute before:inset-0 before:rounded-[inherit]
                       before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%)]
                       before:bg-[length:250%_250%] before:bg-[position:200%_0]
                       hover:before:bg-[position:-100%_0] hover:before:duration-[1500ms]"
              >
                Shimmer CTA
              </button>
            </div>
            
            <div class="text-center">
              <div class="w-16 h-16 bg-warning rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-warning-text text-2xl">🔥</span>
              </div>
              <h3 class="font-semibold mb-2">Gaming/Creative</h3>
              <p class="text-sm text-text-secondary mb-3">Neon + effects</p>
              <button 
                class="px-4 py-2 bg-gray-900 text-cyan-400 border border-cyan-400 rounded-token-md font-medium
                       shadow-[0_0_10px_#22d3ee] hover:shadow-[0_0_20px_#22d3ee] transition-all duration-300"
              >
                Neon Style
              </button>
            </div>
            
            <div class="text-center">
              <div class="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-secondary-text text-2xl">💼</span>
              </div>
              <h3 class="font-semibold mb-2">Professional</h3>
              <p class="text-sm text-text-secondary mb-3">Minimal effects only</p>
              <Button variant="outline" :enable-text-warp="true" :text-warp-intensity="0.5">
                Subtle Only
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Variant>
  </Story>
</template>

<style>
/* Custom animations for button effects */
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

@keyframes shimmer-diagonal {
  0% { background-position: 300% 300%; }
  100% { background-position: -100% -100%; }
}

@keyframes shimmer-fast {
  0% { background-position: 150% 0; }
  100% { background-position: -50% 0; }
}

/* Cursor detection animations */
@keyframes cursor-track {
  0% { transform: scale(0) translate(-50%, -50%); }
  100% { transform: scale(1) translate(-50%, -50%); }
}

@keyframes neural-pulse {
  0% { opacity: 0; transform: rotate(0deg) scale(0.8); }
  50% { opacity: 1; transform: rotate(180deg) scale(1.1); }
  100% { opacity: 0; transform: rotate(360deg) scale(0.8); }
}

/* Enhanced Cursor Detection Effects */

/* Cursor Tracking Light */
.cursor-light {
  position: absolute;
  width: 28px;
  height: 28px;
  background: radial-gradient(circle, 
    rgba(0,255,255,1) 0%, 
    rgba(0,255,255,0.8) 30%, 
    rgba(0,255,255,0.4) 60%, 
    transparent 100%);
  border-radius: 50%;
  pointer-events: none;
  opacity: 0;
  transition: opacity 300ms ease;
  z-index: 10;
  left: var(--cursor-x, 50%);
  top: var(--cursor-y, 50%);
  transform: translate(-50%, -50%);
  box-shadow: 
    0 0 25px rgba(0,255,255,0.9),
    0 0 50px rgba(0,255,255,0.5),
    inset 0 0 15px rgba(0,255,255,0.8);
  border: 1px solid rgba(0,255,255,0.8);
}

.cursor-tracking-btn:hover .cursor-light {
  opacity: 1;
}

/* Cursor Tracking Shimmer Effect */
.cursor-shimmer-effect {
  position: absolute;
  width: 60px;
  height: 60px;
  pointer-events: none;
  opacity: 0;
  z-index: 5;
  left: var(--shimmer-x, 50%);
  top: var(--shimmer-y, 50%);
  transform: translate(-50%, -50%);
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    rgba(255,215,0,0.8) 30deg,
    rgba(255,255,255,0.9) 60deg,
    rgba(255,215,0,0.8) 90deg,
    transparent 120deg,
    transparent 240deg,
    rgba(255,215,0,0.6) 270deg,
    transparent 300deg
  );
  border-radius: 50%;
  transition: opacity 400ms ease;
}

.cursor-shimmer-effect.shimmer-active {
  opacity: 0.8;
  animation: shimmer-pulse 600ms ease-out;
}

@keyframes shimmer-pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.5) rotate(0deg);
    opacity: 0;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2) rotate(180deg);
    opacity: 0.8;
  }
  100% {
    transform: translate(-50%, -50%) scale(0.8) rotate(360deg);
    opacity: 0;
  }
}

.cursor-shimmer-btn:hover .cursor-shimmer-effect {
  opacity: 0.3;
}

/* Directional Ripple Effect */
.ripple-effect {
  position: absolute;
  width: 40px;
  height: 40px;
  background: radial-gradient(circle, 
    rgba(255,255,255,0.9) 0%, 
    rgba(255,255,255,0.6) 40%, 
    rgba(255,255,255,0.2) 70%, 
    transparent 100%);
  border-radius: 50%;
  pointer-events: none;
  opacity: 0;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 5;
  left: var(--ripple-x, 50%);
  top: var(--ripple-y, 50%);
  transform: translate(-50%, -50%);
  box-shadow: 0 0 30px rgba(255,255,255,0.5);
}

.directional-ripple-btn:hover .ripple-effect {
  width: 120px;
  height: 120px;
  opacity: 0.7;
}

/* Proximity Glow Overlay */
.glow-overlay {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(circle 100px at var(--glow-x, 50%) var(--glow-y, 50%), 
    rgba(255,255,100,0.9) 0%, 
    rgba(255,255,150,0.6) 30%, 
    rgba(255,255,200,0.3) 60%, 
    transparent 100%);
  opacity: var(--glow-intensity, 0);
  pointer-events: none;
  transition: opacity 250ms ease;
  z-index: 5;
  mix-blend-mode: screen;
}

.proximity-glow-btn:hover .glow-overlay {
  opacity: var(--glow-intensity, 0.7);
}

/* Enhanced Neural Pulse */
.neural-pulse {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: conic-gradient(
    from 0deg at var(--neural-x, 50%) var(--neural-y, 50%),
    transparent 0deg,
    rgba(255,255,255,0.8) 30deg,
    rgba(255,255,255,1) 60deg,
    rgba(255,255,255,0.8) 90deg,
    transparent 120deg,
    transparent 240deg,
    rgba(255,255,255,0.6) 270deg,
    transparent 300deg
  );
  opacity: 0;
  animation: neural-spin 3s linear infinite;
  pointer-events: none;
  z-index: 5;
  transition: opacity 300ms ease;
}

.neural-response-btn:hover .neural-pulse {
  opacity: 1;
}

@keyframes neural-spin {
  0% { 
    transform: rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% { 
    transform: rotate(360deg);
    opacity: 0;
  }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 15px rgba(34, 197, 94, 0.4); }
  50% { box-shadow: 0 0 25px rgba(34, 197, 94, 0.8), 0 0 35px rgba(34, 197, 94, 0.4); }
}

@keyframes pulse-ripple {
  0% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.1); opacity: 0.1; }
  100% { transform: scale(1); opacity: 0.3; }
}

@keyframes border-beam {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

/* Tailwind custom animations */
.animate-shimmer {
  animation: shimmer 2s infinite;
}

.animate-pulse-glow {
  animation: pulse-glow 2s infinite;
}

.animate-border-beam {
  animation: border-beam 2s infinite;
}

/* Additional fixes for button visibility */
.proximity-glow-btn::before {
  background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%) !important;
}

/* Ensure all buttons are visible with proper dimensions */
.btn-effects-lab button {
  min-height: 2.5rem;
  min-width: 8rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 200ms ease;
  border: 1px solid transparent;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
}

/* Force visibility for all buttons */
.btn-effects-lab .bg-primary {
  background-color: var(--primary-bg, #0ea5e9) !important;
  color: var(--primary-text, #ffffff) !important;
}

.btn-effects-lab .bg-secondary {
  background-color: var(--secondary-bg, #f1f5f9) !important;
  color: var(--secondary-text, #0f172a) !important;
}

.btn-effects-lab .bg-success {
  background-color: var(--success-bg, #22c55e) !important;
  color: var(--success-text, #ffffff) !important;
}

.btn-effects-lab .bg-warning {
  background-color: var(--warning-bg, #f59e0b) !important;
  color: var(--warning-text, #ffffff) !important;
}

.btn-effects-lab .bg-error {
  background-color: var(--error-bg, #ef4444) !important;
  color: var(--error-text, #ffffff) !important;
}

/* Fix text colors */
.btn-effects-lab .text-primary-text {
  color: var(--primary-text, #ffffff) !important;
}

.btn-effects-lab .text-secondary-text {
  color: var(--secondary-text, #0f172a) !important;
}

.btn-effects-lab .text-success-text {
  color: var(--success-text, #ffffff) !important;
}

.btn-effects-lab .text-warning-text {
  color: var(--warning-text, #ffffff) !important;
}

.btn-effects-lab .text-error-text {
  color: var(--error-text, #ffffff) !important;
}

/* Cursor detection specific styles */
.cursor-tracking-btn,
.cursor-shimmer-btn,
.directional-ripple-btn,
.proximity-glow-btn,
.neural-response-btn {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
</style>