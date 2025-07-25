
<style scoped>
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
</style><template>
  <input
    :id="fieldId"
    ref="inputRef"
    :value="modelValue"
    :class="cn(
      'flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background transition-all duration-200 cubic-bezier(0.4, 0, 0.2, 1)',
      'file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-ring',
      'hover:border-slate-700 hover:shadow-sm hover:bg-accent/50 dark:hover:border-slate-300',
      'disabled:cursor-not-allowed disabled:opacity-50',
      // Error state styling
      hasError 
        ? 'border-error focus-visible:ring-error focus-visible:border-error' 
        : 'border-input',
      // Success state styling
      isValid && touched 
        ? 'border-success focus-visible:ring-success focus-visible:border-success' 
        : '',
      $attrs.class,
      activeAnimation
    )"
    :disabled="disabled"
    :placeholder="placeholder"
    :type="type"
    @input="handleInput"
    @change="handleChange"
    @blur="handleBlur"
    @focus="handleFocus"
    @mouseenter="handleMouseEnter"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  modelValue?: string | number
  type?: string
  placeholder?: string
  disabled?: boolean
  fieldId?: string
  hasError?: boolean
  isValid?: boolean
  touched?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  hasError: false,
  isValid: false,
  touched: false
})

const emit = defineEmits<Emits>()

const inputRef = ref<HTMLInputElement>()
const activeAnimation = ref('')

// Event handlers
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('change', target.value)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

// Synapse corner detection
const handleMouseEnter = (event: MouseEvent) => {
  detectCornerEntry(event)
}

const handleMouseMove = (event: MouseEvent) => {
  // Future enhancements for cursor tracking
}

const handleMouseLeave = () => {
  activeAnimation.value = ''
}

const detectCornerEntry = (event: MouseEvent) => {
  if (!inputRef.value) return
  
  const element = inputRef.value
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

// Expose input element for parent access
defineExpose({
  inputRef,
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur()
})
</script>