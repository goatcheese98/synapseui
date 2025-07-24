<template>
  <div :class="timelineSliderClasses">
    <!-- Timeline Header -->
    <div class="timeline-header">
      <div class="timeline-title">
        <slot name="title">Timeline</slot>
      </div>
      <div class="timeline-info">
        <span class="current-value">{{ displayValue }}</span>
        <span class="timeline-range">{{ min }} - {{ max }}</span>
      </div>
    </div>

    <!-- Timeline Track -->
    <div class="timeline-container" @click="handleTrackClick">
      <div
        ref="trackElement"
        class="timeline-track"
        @mouseenter="handleTrackHover"
        @mouseleave="handleTrackLeave"
      >
        <!-- Progress Fill -->
        <div
          class="timeline-progress"
          :style="{ width: `${progressPercentage}%` }"
        />

        <!-- Scrub Handle -->
        <div
          ref="handleElement"
          class="timeline-handle"
          :style="{ left: `${progressPercentage}%` }"
          @mousedown="handleMouseDown"
        >
          <div class="handle-core" />
          <div class="handle-ripple" />
        </div>

        <!-- Timeline Markers -->
        <div v-if="showMarkers" class="timeline-markers">
          <div
            v-for="marker in timelineMarkers"
            :key="marker.id"
            class="timeline-marker"
            :style="{ left: `${marker.position}%` }"
            :title="marker.label"
          >
            <div class="marker-dot" />
            <div v-if="marker.showLabel" class="marker-label">
              {{ marker.label }}
            </div>
          </div>
        </div>

        <!-- Hover Preview -->
        <div
          v-if="isHovered && hoverPosition"
          class="timeline-preview"
          :style="{ left: `${hoverPosition.percentage}%` }"
        >
          {{ hoverPosition.value }}
        </div>
      </div>
    </div>

    <!-- Playback Controls -->
    <div v-if="showControls" class="timeline-controls">
      <button
        class="timeline-control-btn"
        @click="togglePlayback"
        :aria-label="isPlaying ? 'Pause' : 'Play'"
      >
        <svg v-if="!isPlaying" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M3 2v8l6-4-6-4z" fill="currentColor"/>
        </svg>
        <svg v-else width="12" height="12" viewBox="0 0 12 12" fill="none">
          <rect x="3" y="2" width="2" height="8" fill="currentColor"/>
          <rect x="7" y="2" width="2" height="8" fill="currentColor"/>
        </svg>
      </button>

      <button
        class="timeline-control-btn"
        @click="resetToStart"
        aria-label="Reset to start"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 2v8M3 6l6-4v8l-6-4z" fill="currentColor"/>
        </svg>
      </button>

      <slot name="controls" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { cn } from '@/lib/utils'

interface TimelineMarker {
  id: string
  position: number // 0-100 percentage
  label: string
  showLabel?: boolean
}

interface TimelineSliderProps {
  modelValue: number
  min?: number
  max?: number
  step?: number
  showMarkers?: boolean
  markers?: TimelineMarker[]
  showControls?: boolean
  autoPlay?: boolean
  playbackSpeed?: number
  formatValue?: (value: number) => string
  className?: string
}

const props = withDefaults(defineProps<TimelineSliderProps>(), {
  min: 0,
  max: 100,
  step: 1,
  showMarkers: false,
  markers: () => [],
  showControls: true,
  autoPlay: false,
  playbackSpeed: 1,
  formatValue: (value: number) => value.toString()
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  play: []
  pause: []
  reset: []
  scrub: [value: number]
}>()

const trackElement = ref<HTMLElement>()
const handleElement = ref<HTMLElement>()
const isDragging = ref(false)
const isHovered = ref(false)
const isPlaying = ref(props.autoPlay)
const hoverPosition = ref<{ percentage: number; value: number } | null>(null)

let playbackTween: gsap.core.Tween | null = null

const timelineSliderClasses = computed(() => cn(
  'timeline-slider',
  'w-full select-none',
  props.className
))

const progressPercentage = computed(() => {
  const range = props.max - props.min
  return ((props.modelValue - props.min) / range) * 100
})

const displayValue = computed(() => {
  return props.formatValue(props.modelValue)
})

const timelineMarkers = computed(() => {
  return props.markers.map(marker => ({
    ...marker,
    position: Math.max(0, Math.min(100, marker.position))
  }))
})

function handleTrackClick(event: MouseEvent) {
  if (!trackElement.value || isDragging.value) return

  const rect = trackElement.value.getBoundingClientRect()
  const percentage = ((event.clientX - rect.left) / rect.width) * 100
  const newValue = props.min + (percentage / 100) * (props.max - props.min)
  const steppedValue = Math.round(newValue / props.step) * props.step
  
  updateValue(Math.max(props.min, Math.min(props.max, steppedValue)))
  emit('scrub', steppedValue)
}

function handleTrackHover(event: MouseEvent) {
  isHovered.value = true
  updateHoverPosition(event)
}

function handleTrackLeave() {
  isHovered.value = false
  hoverPosition.value = null
}

function updateHoverPosition(event: MouseEvent) {
  if (!trackElement.value) return

  const rect = trackElement.value.getBoundingClientRect()
  const percentage = ((event.clientX - rect.left) / rect.width) * 100
  const value = props.min + (percentage / 100) * (props.max - props.min)
  
  hoverPosition.value = {
    percentage: Math.max(0, Math.min(100, percentage)),
    value: Math.round(value / props.step) * props.step
  }
}

function handleMouseDown(event: MouseEvent) {
  event.preventDefault()
  isDragging.value = true
  
  // Add visual feedback
  if (handleElement.value) {
    gsap.to(handleElement.value, {
      scale: 1.2,
      duration: 0.2,
      ease: 'power2.out'
    })
  }

  const handleMouseMove = (moveEvent: MouseEvent) => {
    if (!trackElement.value) return

    const rect = trackElement.value.getBoundingClientRect()
    const percentage = ((moveEvent.clientX - rect.left) / rect.width) * 100
    const newValue = props.min + (percentage / 100) * (props.max - props.min)
    const steppedValue = Math.round(newValue / props.step) * props.step
    
    updateValue(Math.max(props.min, Math.min(props.max, steppedValue)))
    emit('scrub', steppedValue)
  }

  const handleMouseUp = () => {
    isDragging.value = false
    
    // Reset visual feedback
    if (handleElement.value) {
      gsap.to(handleElement.value, {
        scale: 1,
        duration: 0.3,
        ease: 'elastic.out(1, 0.5)'
      })
    }

    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

function updateValue(newValue: number) {
  emit('update:modelValue', newValue)
}

function togglePlayback() {
  if (isPlaying.value) {
    pausePlayback()
  } else {
    startPlayback()
  }
}

function startPlayback() {
  if (playbackTween) {
    playbackTween.kill()
  }

  isPlaying.value = true
  emit('play')

  const duration = (props.max - props.modelValue) / props.playbackSpeed
  
  playbackTween = gsap.to({ value: props.modelValue }, {
    value: props.max,
    duration: duration,
    ease: 'none',
    onUpdate: function() {
      updateValue(this.targets()[0].value)
    },
    onComplete: () => {
      isPlaying.value = false
    }
  })
}

function pausePlayback() {
  if (playbackTween) {
    playbackTween.pause()
  }
  isPlaying.value = false
  emit('pause')
}

function resetToStart() {
  if (playbackTween) {
    playbackTween.kill()
  }
  isPlaying.value = false
  updateValue(props.min)
  emit('reset')
}

onMounted(() => {
  // Add mouse move listener for hover effects
  if (trackElement.value) {
    trackElement.value.addEventListener('mousemove', updateHoverPosition)
  }
})

onUnmounted(() => {
  if (playbackTween) {
    playbackTween.kill()
  }
})
</script>

<style scoped>
.timeline-slider {
  @apply space-y-3;
}

.timeline-header {
  @apply flex items-center justify-between text-xs;
}

.timeline-title {
  @apply font-medium text-foreground;
}

.timeline-info {
  @apply flex items-center gap-2 text-muted-foreground;
}

.current-value {
  @apply font-mono font-medium text-primary;
}

.timeline-range {
  @apply text-xs opacity-75;
}

.timeline-container {
  @apply relative py-4 cursor-pointer;
}

.timeline-track {
  @apply relative h-2 bg-muted rounded-full overflow-visible;
  @apply hover:bg-muted/80 transition-colors duration-200;
}

.timeline-progress {
  @apply h-full bg-primary rounded-full;
  @apply transition-all duration-100 ease-out;
  background: linear-gradient(90deg, 
    hsl(var(--primary)) 0%, 
    hsl(var(--primary) / 0.8) 100%
  );
}

.timeline-handle {
  @apply absolute top-1/2 -translate-y-1/2 -translate-x-1/2;
  @apply w-4 h-4 cursor-grab active:cursor-grabbing;
  @apply transition-transform duration-200;
}

.timeline-handle:hover {
  transform: translate(-50%, -50%) scale(1.1);
}

.handle-core {
  @apply w-full h-full bg-primary rounded-full border-2 border-background;
  @apply shadow-lg relative z-10;
}

.handle-ripple {
  @apply absolute inset-0 bg-primary/20 rounded-full;
  @apply animate-pulse opacity-0;
  transform: scale(1.5);
}

.timeline-handle:hover .handle-ripple {
  @apply opacity-100;
}

.timeline-markers {
  @apply absolute inset-0 pointer-events-none;
}

.timeline-marker {
  @apply absolute top-1/2 -translate-y-1/2 -translate-x-1/2;
}

.marker-dot {
  @apply w-1.5 h-1.5 bg-accent rounded-full;
  @apply border border-background shadow-sm;
}

.marker-label {
  @apply absolute top-6 left-1/2 -translate-x-1/2;
  @apply text-xs text-muted-foreground whitespace-nowrap;
  @apply bg-background px-1 py-0.5 rounded border border-border shadow-sm;
}

.timeline-preview {
  @apply absolute -top-8 -translate-x-1/2;
  @apply text-xs text-foreground bg-foreground text-background;
  @apply px-2 py-1 rounded shadow-lg;
  @apply pointer-events-none;
}

.timeline-preview::after {
  content: '';
  @apply absolute top-full left-1/2 -translate-x-1/2;
  @apply border-4 border-transparent border-t-foreground;
}

.timeline-controls {
  @apply flex items-center gap-2;
}

.timeline-control-btn {
  @apply w-6 h-6 flex items-center justify-center;
  @apply rounded hover:bg-accent hover:text-accent-foreground;
  @apply transition-all duration-200;
  @apply text-muted-foreground hover:text-foreground;
}

.timeline-control-btn:hover {
  transform: scale(1.1);
}

.timeline-control-btn:active {
  transform: scale(0.95);
}

/* Living interface effects */
.timeline-track:hover .timeline-progress {
  box-shadow: 0 0 8px hsl(var(--primary) / 0.5);
}

/* Cursor physics simulation */
@keyframes handlePulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.05); }
}

.timeline-handle.dragging {
  animation: handlePulse 0.5s ease-in-out infinite;
}
</style>