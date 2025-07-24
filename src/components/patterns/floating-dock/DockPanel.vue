<template>
  <div
    :class="dockPanelClasses"
    :data-panel-id="id"
  >
    <!-- Panel Header -->
    <div v-if="showHeader" class="panel-header">
      <div class="panel-title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="panel-actions">
        <slot name="actions">
          <button
            v-if="minimizable"
            class="panel-action-btn"
            @click="minimize"
            aria-label="Minimize panel"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 5h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
          <button
            v-if="closable"
            class="panel-action-btn"
            @click="close"
            aria-label="Close panel"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="m1 1 8 8M9 1l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
        </slot>
      </div>
    </div>

    <!-- Panel Content -->
    <div class="panel-content">
      <slot />
    </div>

    <!-- Panel Footer -->
    <div v-if="$slots.footer" class="panel-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useDockStore } from '@/lib/stores/useDockStore'
import { cn } from '@/lib/utils'

interface DockPanelProps {
  id: string
  title: string
  showHeader?: boolean
  minimizable?: boolean
  closable?: boolean
  autoRegister?: boolean
  className?: string
}

const props = withDefaults(defineProps<DockPanelProps>(), {
  showHeader: true,
  minimizable: true,
  closable: true,
  autoRegister: true
})

const emit = defineEmits<{
  minimize: [id: string]
  close: [id: string]
  activate: [id: string]
}>()

const dockStore = useDockStore()

const dockPanelClasses = computed(() => cn(
  'dock-panel',
  'h-full flex flex-col',
  'bg-background border border-border/50 rounded-md',
  'shadow-sm',
  props.className
))


function minimize() {
  dockStore.minimizePanel(props.id)
  emit('minimize', props.id)
}

function close() {
  dockStore.removePanel(props.id)
  emit('close', props.id)
}


onMounted(() => {
  if (props.autoRegister) {
    // Register this panel with the dock store
    dockStore.addPanel({
      id: props.id,
      title: props.title
    })
  }
})
</script>

<style scoped>
.dock-panel {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  animation: panelSlideIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes panelSlideIn {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.panel-header {
  @apply flex items-center justify-between px-3 py-2;
  @apply border-b border-white/10 dark:border-white/5;
  @apply bg-white/5 dark:bg-white/3;
  backdrop-filter: blur(8px);
}

.panel-title {
  @apply text-sm font-medium text-foreground;
  @apply truncate flex-1;
}

.panel-actions {
  @apply flex items-center gap-1 ml-2;
}

.panel-action-btn {
  @apply w-5 h-5 flex items-center justify-center;
  @apply rounded hover:bg-white/20 dark:hover:bg-white/10;
  @apply transition-colors duration-200;
  @apply text-foreground/60 hover:text-foreground;
}

.panel-action-btn:hover {
  transform: scale(1.1);
}

.panel-content {
  @apply flex-1 p-3 overflow-auto;
  @apply text-sm text-foreground;
  background: transparent;
}

.panel-footer {
  @apply px-3 py-2 border-t border-white/10 dark:border-white/5;
  @apply bg-white/5 dark:bg-white/3 text-xs text-foreground/70;
  backdrop-filter: blur(8px);
}

/* Content area scroll styling */
.panel-content::-webkit-scrollbar {
  width: 4px;
}

.panel-content::-webkit-scrollbar-track {
  background: transparent;
}

.panel-content::-webkit-scrollbar-thumb {
  background: hsl(var(--border));
  border-radius: 2px;
}

.panel-content::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground));
}

/* Living interface effects */
.dock-panel:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

/* Edge morphing effect on hover */
.dock-panel::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, 
    hsla(var(--primary), 0.1) 0%, 
    transparent 50%, 
    hsla(var(--accent), 0.05) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.dock-panel:hover::before {
  opacity: 1;
}
</style>