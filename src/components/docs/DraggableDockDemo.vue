<script setup lang="ts">
import { ref, nextTick } from 'vue'
import FloatingDock from '@/components/patterns/floating-dock/FloatingDock.vue'
import Button from '@/components/ui/button/BaseButton.vue'

defineProps<{ theme: 'light' | 'dark' }>()
const active = ref('Overview')
const actions = ref(0)
const generation = ref(0)
async function navigatePanels(event: KeyboardEvent) {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
  event.preventDefault()
  active.value = event.key === 'Home' ? 'Overview' : event.key === 'End' ? 'Details' : active.value === 'Overview' ? 'Details' : 'Overview'
  const list = event.currentTarget as HTMLElement
  await nextTick()
  list.querySelector<HTMLElement>('[aria-selected="true"]')?.focus()
}
</script>

<template>
  <main
    class="dock-demo"
    :data-synapse-theme="theme"
  >
    <header>
      <p class="eyebrow">
        SYNAPSE UI / PATTERNS
      </p>
      <h1>Floating dock</h1>
      <p>Move the handle. The dock stays inside its workspace; controls keep their state.</p>
    </header>
    <div class="dock-tools">
      <Button
        variant="secondary"
        @click="generation++"
      >
        Reset position
      </Button>
      <span>Pointer and touch · bounded movement</span>
    </div>
    <section
      class="dock-stage"
      data-dock-stage
      aria-label="Dock workspace"
    >
      <span class="workspace-label">Workspace</span>
      <FloatingDock
        :key="generation"
        draggable
        inertia
        bounds="[data-dock-stage]"
        aria-label="Floating dock"
      >
        <template #handle>
          Move dock <span aria-hidden="true">⠿</span>
        </template>
        <div class="dock-body">
          <div
            role="tablist"
            aria-label="Dock panels"
            class="dock-tabs"
            @keydown="navigatePanels"
          >
            <button
              v-for="name in ['Overview', 'Details']"
              :id="`dock-tab-${theme}-${name}`"
              :key="name"
              role="tab"
              type="button"
              :aria-selected="active === name"
              :tabindex="active === name ? 0 : -1"
              :aria-controls="`dock-panel-${theme}`"
              @click="active = name"
            >
              {{ name }}
            </button>
          </div>
          <div
            :id="`dock-panel-${theme}`"
            role="tabpanel"
            :aria-labelledby="`dock-tab-${theme}-${active}`"
          >
            <h2>{{ active }}</h2>
            <p>{{ active === 'Overview' ? 'A movable home for compact controls.' : 'Panel selection and actions survive every drag.' }}</p>
            <Button
              size="sm"
              @click="actions++"
            >
              Run action
            </Button>
            <output aria-live="polite">Actions: {{ actions }}</output>
          </div>
        </div>
      </FloatingDock>
    </section>
    <p class="dock-note">
      Drag the handle or focus it and use arrow keys (Shift for larger steps). Use Reset position to return the dock without moving its controls.
    </p>
  </main>
</template>

<style scoped>
.dock-demo { padding: 32px; min-width: 0; }
.eyebrow { color: var(--mut); font: 11px var(--font-mono); letter-spacing: .08em; }
h1 { margin: 12px 0 8px; font-size: 30px; font-weight: 600; letter-spacing: -.03em; }
header > p:last-child, .dock-note { color: var(--mut); font-size: 14px; line-height: 1.6; }
.dock-tools { margin: 24px 0 16px; display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
.dock-tools span { font: 12px var(--font-mono); color: var(--mut); }
.dock-stage { position: relative; transform: translateZ(0); height: 420px; border: 1px solid var(--line); border-radius: var(--r-xl); background: var(--panel2); }
.workspace-label { position: absolute; top: 16px; left: 20px; color: var(--mut); font: 12px var(--font-mono); }
.dock-stage :deep(.floating-dock) { top: 64px; left: 24px; bottom: auto; right: auto; transform: none; width: min(290px, calc(100% - 48px)); padding: 0; }
.dock-stage :deep(.dock-drag-handle) { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid var(--line); font-size: 13px; font-weight: 500; }
.dock-body { width: 100%; min-width: 0; }
.dock-tabs { display: flex; padding: 8px; border-bottom: 1px solid var(--line); gap: 4px; }
.dock-tabs button { flex: 1; min-height: 44px; border-radius: var(--r-xs); color: var(--mut); }
.dock-tabs button[aria-selected='true'] { background: var(--panel2); color: var(--fg); }
.dock-tabs button:focus-visible { outline: 2px solid var(--fg); outline-offset: 2px; }
[role='tabpanel'] { padding: 16px; }
h2 { font-size: 16px; font-weight: 500; }
[role='tabpanel'] p { margin: 8px 0 16px; color: var(--mut); font-size: 13px; line-height: 1.5; }
output { display: block; margin-top: 12px; color: var(--mut); font: 12px var(--font-mono); }
.dock-note { margin-top: 16px; max-width: 600px; }
@media (max-width: 600px) { .dock-demo { padding: 16px; } .dock-stage { height: 460px; } }
</style>
