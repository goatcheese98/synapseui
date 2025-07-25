
<style scoped>
.dialog-cancel-button {
  position: relative;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.button-content {
  position: relative;
  z-index: 1;
  transition: opacity 200ms ease-out;
}

/* Corner detection animations */
.corner-top-left {
  border-radius: 18px 6px 6px 6px;
  transform: scale(1.02);
}

.corner-top-right {
  border-radius: 6px 18px 6px 6px;
  transform: scale(1.02);
}

.corner-bottom-left {
  border-radius: 6px 6px 6px 18px;
  transform: scale(1.02);
}

.corner-bottom-right {
  border-radius: 6px 6px 18px 6px;
  transform: scale(1.02);
}

/* Hover states */
[data-state="idle"].dialog-cancel-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

[data-state="idle"].dialog-cancel-button:active {
  transform: translateY(0px);
  transition: transform 100ms ease-out;
}

/* Disabled state */
[data-state="disabled"] {
  cursor: not-allowed;
  opacity: 0.6;
}

[data-state="disabled"]:hover {
  transform: none;
  box-shadow: none;
}
</style><template>
  <AlertDialogCancel
    ref="buttonRef"
    :class="cn(
      dialogButtonVariants({ 
        variant: 'dialog-cancel', 
        size,
        withIcon: hasIcon 
      }), 
      $attrs.class,
      'dialog-cancel-button mt-2 sm:mt-0',
      activeAnimation
    )"
    :data-state="disabled ? 'disabled' : 'idle'"
    :disabled="disabled"
    v-bind="$attrs"
    @mouseenter="handleMouseEnter"
    @mousemove="handleMouseMove" 
    @mouseleave="handleMouseLeave"
  >
    <span :class="cn('button-content')">
      <slot />
    </span>
  </AlertDialogCancel>
</template>

<script setup lang="ts">
import { ref, computed, useSlots } from 'vue'
import { AlertDialogCancel } from 'reka-ui'
import { cn } from '@/lib/utils'
import { dialogButtonVariants } from './dialogVariants'

interface Props {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  disabled: false
})

const slots = useSlots()
const buttonRef = ref<HTMLElement>()
const activeAnimation = ref('')

const hasIcon = computed(() => {
  const defaultSlot = slots.default?.()
  return defaultSlot?.some(vnode => 
    vnode.type?.name === 'Icon' || 
    (typeof vnode.children === 'string' && vnode.children.includes('icon'))
  ) || false
})

const handleMouseEnter = (event: MouseEvent) => {
  if (props.disabled) return
  detectCornerEntry(event)
}

const handleMouseMove = (event: MouseEvent) => {
  // Preserve for future enhancements
}

const handleMouseLeave = () => {
  activeAnimation.value = ''
}

const detectCornerEntry = (event: MouseEvent) => {
  if (!buttonRef.value) return
  
  const element = buttonRef.value.$el || buttonRef.value
  if (!element || typeof element.getBoundingClientRect !== 'function') return
  
  const rect = element.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  const threshold = 15
  
  let cornerClass = ''
  
  if (x <= threshold && y <= threshold) {
    cornerClass = 'corner-top-left'
  } else if (x >= rect.width - threshold && y <= threshold) {
    cornerClass = 'corner-top-right'
  } else if (x <= threshold && y >= rect.height - threshold) {
    cornerClass = 'corner-bottom-left'
  } else if (x >= rect.width - threshold && y >= rect.height - threshold) {
    cornerClass = 'corner-bottom-right'
  }
  
  if (cornerClass) {
    activeAnimation.value = cornerClass
    setTimeout(() => {
      if (activeAnimation.value === cornerClass) {
        activeAnimation.value = ''
      }
    }, 500)
  }
}
</script>