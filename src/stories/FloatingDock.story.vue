<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { createPinia } from 'pinia'
import { FloatingDock, DockPanel, TimelineSlider } from '@/components/patterns/floating-dock'
import { useDockStore } from '@/lib/stores/useDockStore'

// Create Pinia instance for the story
const pinia = createPinia()

const timelineValue = ref(45)
const demoTimelineValue = ref(25)
const animationSpeed = ref(1)
const enableInertia = ref(true)
const enableMagnetism = ref(true)

const timelineMarkers = [
  { id: '1', position: 25, label: 'Intro', showLabel: true },
  { id: '2', position: 50, label: 'Main', showLabel: true },
  { id: '3', position: 75, label: 'Outro', showLabel: true }
]

const playlist = [
  { title: 'Cosmic Journey', artist: 'Space Odyssey' },
  { title: 'Digital Dreams', artist: 'Synth Wave' },
  { title: 'Neon Lights', artist: 'Retro Future' },
  { title: 'Binary Sunset', artist: 'Tech Noir' }
]

const panelCount = computed(() => {
  const dockStore = useDockStore()
  return dockStore.panels.length
})

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function addRandomPanel() {
  const dockStore = useDockStore()
  const panelId = `panel-${Date.now()}`
  dockStore.addPanel({
    id: panelId,
    title: `Panel ${dockStore.panels.length + 1}`
  })
}

function resetDock() {
  const dockStore = useDockStore()
  dockStore.reset()
  setupDemoPanels()
}

function setupDemoPanels() {
  const dockStore = useDockStore()
  // Add demo panels
  dockStore.addPanel({ id: 'timeline', title: 'Timeline' })
  dockStore.addPanel({ id: 'controls', title: 'Controls' })
  dockStore.addPanel({ id: 'playlist', title: 'Playlist' })
  
  dockStore.addPanel({ id: 'demo-timeline', title: 'Demo Timeline' })
  dockStore.addPanel({ id: 'demo-controls', title: 'Demo Controls' })
  dockStore.addPanel({ id: 'demo-settings', title: 'Settings' })
}

// Setup demo panels without onMounted to avoid store access before initialization
</script>

<template>
  <Story title="Patterns/FloatingDock">
    <!-- Basic Floating Dock -->
    <Variant title="Basic Dock">
      <template #default>
        <div class="h-96 relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg overflow-hidden">
          <!-- Background text to test glass effect -->
          <div class="absolute inset-0 p-8 text-slate-400 dark:text-slate-500 text-sm leading-relaxed">
            <h2 class="text-lg font-semibold mb-4">Sample Background Content</h2>
            <p class="mb-4">This text should be visible through the translucent glass dock panels, creating a beautiful liquid glass effect similar to Apple's design language.</p>
            <p class="mb-4">The dock panels use backdrop-blur and transparency to allow content behind to show through while maintaining readability of the dock content.</p>
            <p>Move the dock around to see how the glass effect works with different background elements.</p>
          </div>
          <FloatingDock :initial-position="{ x: 70, y: 80 }" :width="260" :height="180">
            <template #title>
              <span class="flex items-center gap-2">
                📊 Control Panel
              </span>
            </template>
            
            <DockPanel id="info" title="Information" :auto-register="true">
              <div class="space-y-4">
                <h3 class="font-semibold">System Status</h3>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span>CPU Usage:</span>
                    <span class="font-mono">45%</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Memory:</span>
                    <span class="font-mono">8.2GB</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Storage:</span>
                    <span class="font-mono">234GB</span>
                  </div>
                </div>
              </div>
            </DockPanel>
          </FloatingDock>
        </div>
      </template>
    </Variant>

    <!-- Multi-Panel Dock -->
    <Variant title="Multi-Panel Dock">
      <template #default>
        <div class="h-96 relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900 dark:to-indigo-800 rounded-lg overflow-hidden">
          <!-- Background content for glass effect demo -->
          <div class="absolute inset-0 p-6">
            <div class="grid grid-cols-3 gap-4 h-full">
              <div class="bg-blue-200/30 dark:bg-blue-700/30 rounded-lg p-4">
                <h3 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">Video Timeline</h3>
                <div class="space-y-2">
                  <div class="h-2 bg-blue-300/50 dark:bg-blue-600/50 rounded"></div>
                  <div class="h-2 bg-blue-300/30 dark:bg-blue-600/30 rounded"></div>
                  <div class="h-2 bg-blue-300/40 dark:bg-blue-600/40 rounded"></div>
                </div>
              </div>
              <div class="bg-indigo-200/30 dark:bg-indigo-700/30 rounded-lg p-4">
                <h3 class="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">Media Controls</h3>
                <div class="flex justify-center gap-2 mt-4">
                  <div class="w-8 h-8 bg-indigo-300/50 dark:bg-indigo-600/50 rounded-full"></div>
                  <div class="w-8 h-8 bg-indigo-300/60 dark:bg-indigo-600/60 rounded-full"></div>
                  <div class="w-8 h-8 bg-indigo-300/50 dark:bg-indigo-600/50 rounded-full"></div>
                </div>
              </div>
              <div class="bg-purple-200/30 dark:bg-purple-700/30 rounded-lg p-4">
                <h3 class="font-semibold text-purple-800 dark:text-purple-200 mb-2">Playlist</h3>
                <div class="space-y-1">
                  <div class="text-xs text-purple-700 dark:text-purple-300">Track 1</div>
                  <div class="text-xs text-purple-700 dark:text-purple-300">Track 2</div>
                  <div class="text-xs text-purple-700 dark:text-purple-300">Track 3</div>
                </div>
              </div>
            </div>
          </div>
          <FloatingDock :initial-position="{ x: 70, y: 80 }" :width="260" :height="180">
            <template #title>
              <span class="flex items-center gap-2">
                🎬 Media Controller
              </span>
            </template>

            <template #panel="{ panel }">
              <DockPanel 
                v-if="panel.id === 'timeline'" 
                :id="panel.id" 
                :title="panel.title"
                :auto-register="false"
              >
                <TimelineSlider
                  v-model="timelineValue"
                  :min="0"
                  :max="120"
                  :show-markers="true"
                  :markers="timelineMarkers"
                  :format-value="formatTime"
                />
              </DockPanel>

              <DockPanel 
                v-else-if="panel.id === 'controls'" 
                :id="panel.id" 
                :title="panel.title"
                :auto-register="false"
              >
                <div class="space-y-4">
                  <div class="grid grid-cols-3 gap-2">
                    <button class="p-2 rounded bg-primary/10 hover:bg-primary/20 text-center text-sm">⏮️</button>
                    <button class="p-2 rounded bg-primary text-primary-foreground text-center text-sm">▶️</button>
                    <button class="p-2 rounded bg-primary/10 hover:bg-primary/20 text-center text-sm">⏭️</button>
                  </div>
                  <div class="space-y-2">
                    <label class="text-xs font-medium">Volume</label>
                    <input type="range" min="0" max="100" value="75" class="w-full">
                  </div>
                </div>
              </DockPanel>

              <DockPanel 
                v-else-if="panel.id === 'playlist'" 
                :id="panel.id" 
                :title="panel.title"
                :auto-register="false"
              >
                <div class="space-y-2">
                  <div 
                    v-for="(track, index) in playlist" 
                    :key="index"
                    class="p-2 rounded hover:bg-accent/50 cursor-pointer text-sm"
                    :class="{ 'bg-primary/10': index === 1 }"
                  >
                    <div class="font-medium">{{ track.title }}</div>
                    <div class="text-xs text-muted-foreground">{{ track.artist }}</div>
                  </div>
                </div>
              </DockPanel>
            </template>
          </FloatingDock>
        </div>
      </template>
    </Variant>

    <!-- Interactive Demo -->
    <Variant title="Interactive Demo" :controls="{ showTimeline: true, showControls: true, showPlaylist: true }">
      <template #default="{ state }">
        <div class="h-96 relative bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900 dark:to-pink-800 rounded-lg overflow-hidden">
          <!-- Interactive background elements -->
          <div class="absolute inset-0 p-4">
            <div class="grid grid-cols-2 gap-4 h-full">
              <div class="space-y-4">
                <div class="bg-purple-200/40 dark:bg-purple-700/40 rounded-xl p-4 h-20">
                  <h4 class="text-purple-800 dark:text-purple-200 font-medium">Dashboard</h4>
                  <p class="text-xs text-purple-600 dark:text-purple-300 mt-1">Real-time data visualization</p>
                </div>
                <div class="bg-pink-200/40 dark:bg-pink-700/40 rounded-xl p-4 h-20">
                  <h4 class="text-pink-800 dark:text-pink-200 font-medium">Analytics</h4>
                  <p class="text-xs text-pink-600 dark:text-pink-300 mt-1">Performance metrics</p>
                </div>
              </div>
              <div class="space-y-2">
                <div class="h-3 bg-gradient-to-r from-purple-300/50 to-pink-300/50 dark:from-purple-600/50 dark:to-pink-600/50 rounded"></div>
                <div class="h-3 bg-gradient-to-r from-pink-300/30 to-purple-300/30 dark:from-pink-600/30 dark:to-purple-600/30 rounded"></div>
                <div class="h-3 bg-gradient-to-r from-purple-300/40 to-pink-300/40 dark:from-purple-600/40 dark:to-pink-600/40 rounded"></div>
                <div class="h-3 bg-gradient-to-r from-pink-300/50 to-purple-300/50 dark:from-pink-600/50 dark:to-purple-600/50 rounded"></div>
              </div>
            </div>
          </div>
          <FloatingDock :initial-position="{ x: 70, y: 80 }" :width="260" :height="180">
            <template #title>
              <span class="flex items-center gap-2">
                ⚡ Interactive Dock
              </span>
            </template>

            <template #panel="{ panel }">
              <DockPanel 
                v-if="panel.id === 'demo-timeline' && state.showTimeline"
                :id="panel.id" 
                :title="panel.title"
                :auto-register="false"
              >
                <div class="space-y-4">
                  <TimelineSlider
                    v-model="demoTimelineValue"
                    :min="0"
                    :max="100"
                    :show-controls="true"
                    :format-value="(v: number) => `${v}%`"
                  />
                  <div class="text-xs text-muted-foreground">
                    Try dragging the handle or clicking on the timeline!
                  </div>
                </div>
              </DockPanel>

              <DockPanel 
                v-else-if="panel.id === 'demo-controls' && state.showControls"
                :id="panel.id" 
                :title="panel.title"
                :auto-register="false"
              >
                <div class="space-y-3">
                  <div class="grid grid-cols-2 gap-2">
                    <button 
                      @click="addRandomPanel"
                      class="p-2 rounded bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800 text-xs"
                    >
                      Add Panel
                    </button>
                    <button 
                      @click="resetDock"
                      class="p-2 rounded bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 text-xs"
                    >
                      Reset
                    </button>
                  </div>
                  <div class="text-xs text-muted-foreground">
                    Panel Count: {{ panelCount }}
                  </div>
                </div>
              </DockPanel>

              <DockPanel 
                v-else-if="panel.id === 'demo-settings' && state.showPlaylist"
                :id="panel.id" 
                :title="panel.title"
                :auto-register="false"
              >
                <div class="space-y-3">
                  <div class="space-y-2">
                    <label class="text-xs font-medium">Animation Speed</label>
                    <input 
                      v-model="animationSpeed"
                      type="range" 
                      min="0.5" 
                      max="2" 
                      step="0.1" 
                      class="w-full"
                    >
                    <div class="text-xs text-muted-foreground">{{ (animationSpeed * 100).toFixed(0) }}%</div>
                  </div>
                  <div class="space-y-2">
                    <label class="text-xs font-medium">Physics</label>
                    <div class="flex gap-2">
                      <label class="flex items-center gap-1 text-xs">
                        <input v-model="enableInertia" type="checkbox" class="rounded">
                        Inertia
                      </label>
                      <label class="flex items-center gap-1 text-xs">
                        <input v-model="enableMagnetism" type="checkbox" class="rounded">
                        Magnetism
                      </label>
                    </div>
                  </div>
                </div>
              </DockPanel>
            </template>
          </FloatingDock>
        </div>
      </template>
    </Variant>
  </Story>
</template>

