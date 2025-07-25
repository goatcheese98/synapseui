<!--
  WarpedText Component
  Splits text into individual letters for warping animations
-->

<template>
  <span class="warped-text" :class="{ 'is-pressed': isPressed }">
    <span
      v-for="(letter, i) in letters"
      :key="`${letter}-${i}`"
      :style="getLetterStyle(i)"
      :class="letterClasses"
      class="letter"
    >
      {{ letter === ' ' ? '\u00A0' : letter }}
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  text: string
  isPressed?: boolean
  warpIntensity?: number
  warpType?: 'wave' | 'compress' | 'bend' | 'ripple'
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  isPressed: false,
  warpIntensity: 1,
  warpType: 'compress'
})

// Split text into individual letters
const letters = computed(() => {
  return props.text.split('')
})

// Generate style for each letter based on warp type and position
const getLetterStyle = (index: number) => {
  if (!props.isPressed) {
    return {
      transform: 'translateY(0px) scaleY(1) rotate(0deg)',
      transitionDelay: `${index * 8}ms`
    }
  }

  const intensity = props.warpIntensity
  const letterCount = letters.value.length
  const normalizedIndex = index / Math.max(letterCount - 1, 1) // 0 to 1
  const centerDistance = Math.abs(normalizedIndex - 0.5) * 2 // 0 to 1, peak at center

  let transform = ''
  let transitionDelay = `${index * 8}ms`

  switch (props.warpType) {
    case 'wave':
      // Sine wave effect
      transform = `translateY(${Math.sin(index * 0.8) * 2 * intensity}px) scaleY(${0.95 + Math.sin(index * 0.5) * 0.05})`
      break
      
    case 'compress':
      // Compress toward center with slight curve
      const compressAmount = (1 - centerDistance * 0.3) * intensity
      const yOffset = Math.sin(normalizedIndex * Math.PI) * 1.5 * intensity
      transform = `translateY(${yOffset}px) scaleY(${0.9 + compressAmount * 0.05}) scaleX(${0.98 + centerDistance * 0.02})`
      break
      
    case 'bend':
      // Bend backward like pressed into surface
      const bendAngle = (centerDistance - 0.5) * 3 * intensity
      const yMove = Math.pow(centerDistance, 2) * 2 * intensity
      transform = `translateY(${yMove}px) scaleY(0.95) rotate(${bendAngle}deg)`
      break
      
    case 'ripple':
      // Ripple effect from center outward
      const ripplePhase = Math.abs(normalizedIndex - 0.5) * Math.PI
      const rippleAmount = Math.sin(ripplePhase) * intensity
      transform = `translateY(${rippleAmount}px) scaleY(${0.92 + rippleAmount * 0.03})`
      transitionDelay = `${Math.abs(index - letterCount / 2) * 12}ms`
      break
  }

  return {
    transform,
    transitionDelay,
    filter: `brightness(${0.95 - centerDistance * 0.03 * intensity})`
  }
}

// Dynamic classes for letters
const letterClasses = computed(() => [
  `warp-${props.warpType}`,
  { 'letter-pressed': props.isPressed }
])
</script>

<style scoped>
.warped-text {
  display: inline-block;
  white-space: nowrap;
}

.letter {
  display: inline-block;
  transition: all 100ms cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center bottom;
  will-change: transform;
}

/* Warp type specific styles */
.warp-wave .letter {
  transform-origin: center center;
}

.warp-compress .letter {
  transform-origin: center bottom;
}

.warp-bend .letter {
  transform-origin: center bottom;
  perspective: 100px;
}

.warp-ripple .letter {
  transform-origin: center center;
}

/* Hover state for smoother transitions */
.warped-text:not(.is-pressed) .letter {
  transition-duration: 150ms;
}

/* Performance optimization */
.letter-pressed {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
</style>