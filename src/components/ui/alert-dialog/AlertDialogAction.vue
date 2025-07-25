
<style scoped>
.dialog-action-button {
  position: relative;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.loading-spinner {
  display: inline-block;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 8px;
}

.button-content {
  position: relative;
  z-index: 1;
  transition: opacity 200ms ease-out;
}

.button-content-loading {
  opacity: 0.7;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
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
[data-state="idle"].dialog-action-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

[data-state="idle"].dialog-action-button:active {
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
  <AlertDialogAction
    ref="buttonRef"
    :class="cn(
      dialogButtonVariants({ 
        variant: getDialogVariant(), 
        size, 
        withIcon: hasIcon 
      }), 
      $attrs.class,
      'dialog-action-button',
      activeAnimation
    )"
    :data-state="disabled || loading ? 'disabled' : 'idle'"
    :disabled="disabled || loading"
    v-bind="$attrs"
    @mouseenter="handleMouseEnter"
    @mousemove="handleMouseMove" 
    @mouseleave="handleMouseLeave"
  >
    <span
      v-if="loading"
      class="loading-spinner"
      :style="{ width: `${getSpinnerSize()}px`, height: `${getSpinnerSize()}px` }"
    />
    
    <span :class="cn('button-content flex items-center gap-2', loading && 'button-content-loading')">
      <slot />
    </span>
  </AlertDialogAction>
</template>

<script setup lang="ts">
import { ref, computed, useSlots } from 'vue'
import { AlertDialogAction } from 'reka-ui'
import { cn } from '@/lib/utils'
import { dialogButtonVariants } from './dialogVariants'

interface Props {
  variant?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'destructive'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false
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

const getDialogVariant = () => {
  const variantMap = {
    neutral: 'dialog-cancel',
    primary: 'dialog-primary', 
    secondary: 'dialog-secondary',
    success: 'dialog-success',
    destructive: 'dialog-destructive'
  }
  return variantMap[props.variant] || 'dialog-primary'
}

const getSpinnerSize = () => {
  const sizeMap = {
    xs: 12, sm: 14, md: 16, lg: 18, xl: 20
  }
  return sizeMap[props.size] || 16
}

const handleMouseEnter = (event: MouseEvent) => {
  if (props.disabled || props.loading) return
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