
<style scoped>
/* Corner detection animations for menu items */
.corner-top-left {
  border-radius: 12px 4px 4px 4px;
  transform: scale(1.01);
}

.corner-top-right {
  border-radius: 4px 12px 4px 4px;
  transform: scale(1.01);
}

.corner-bottom-left {
  border-radius: 4px 4px 4px 12px;
  transform: scale(1.01);
}

.corner-bottom-right {
  border-radius: 4px 4px 12px 4px;
  transform: scale(1.01);
}
</style><template>
  <SelectItem
    ref="itemRef"
    :class="cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-all duration-200 cubic-bezier(0.4, 0, 0.2, 1)',
      'focus:bg-accent focus:text-accent-foreground hover:bg-accent/50',
      'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      $attrs.class,
      activeAnimation
    )"
    v-bind="$attrs"
    @mouseenter="handleMouseEnter"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectItemIndicator>
        <Icon icon="lucide:check" class="h-4 w-4" />
      </SelectItemIndicator>
    </span>

    <SelectItemText>
      <slot />
    </SelectItemText>
  </SelectItem>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SelectItem, SelectItemIndicator, SelectItemText } from 'reka-ui'
import { Icon } from '@iconify/vue'
import { cn } from '@/lib/utils'

const itemRef = ref<HTMLElement>()
const activeAnimation = ref('')

const handleMouseEnter = (event: MouseEvent) => {
  detectCornerEntry(event)
}

const handleMouseMove = (event: MouseEvent) => {
  // Future enhancements
}

const handleMouseLeave = () => {
  activeAnimation.value = ''
}

const detectCornerEntry = (event: MouseEvent) => {
  if (!itemRef.value) return
  
  const element = itemRef.value.$el || itemRef.value
  if (!element || typeof element.getBoundingClientRect !== 'function') return
  
  const rect = element.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  const threshold = 12 // Smaller threshold for menu items
  
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
    }, 400)
  }
}
</script>