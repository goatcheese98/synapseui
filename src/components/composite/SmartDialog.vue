<template>
  <DialogProvider 
    :variant="variant" 
    :size="size"
  >
    <Dialog v-model:open="isOpen">
      <DialogContent 
        :class="cn(dialogClasses, contentClass)"
        @escapeKeyDown="handleEscape"
        @pointerDownOutside="handleOutsideClick"
      >
        <!-- Header -->
        <DialogHeader v-if="title || description || $slots.header" :class="headerClasses">
          <slot name="header">
            <DialogTitle v-if="title" :class="titleClasses">
              {{ title }}
            </DialogTitle>
            <DialogDescription v-if="description" :class="descriptionClasses">
              {{ description }}
            </DialogDescription>
          </slot>
        </DialogHeader>

        <!-- Content -->
        <div :class="cn('flex-1', bodyClasses)">
          <slot 
            :close="close"
            :isOpen="isOpen"
            :variant="variant"
            :size="size"
          />
        </div>

        <!-- Footer -->
        <DialogFooter v-if="showFooter || $slots.footer" :class="footerClasses">
          <slot name="footer">
            <div class="flex gap-2 justify-end">
              <UltraSmartButton 
                v-if="showCancel"
                variant="outline" 
                @click="handleCancel"
                :disabled="loading"
              >
                {{ cancelText }}
              </UltraSmartButton>
              <UltraSmartButton 
                v-if="showConfirm"
                @click="handleConfirm"
                :loading="loading"
                :disabled="confirmDisabled"
              >
                {{ confirmText }}
              </UltraSmartButton>
            </div>
          </slot>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </DialogProvider>
</template>

<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'
import { cn } from '@/lib/utils'
import { 
  createDialogContext, 
  DIALOG_CONTEXT_KEY,
  type DialogContext 
} from '@/composables/useComposition'
import UltraSmartButton from '@/components/ui/button/UltraSmartButton.vue'

// Mock Dialog components - replace with your actual dialog components
import Dialog from '@/components/ui/dialog/Dialog.vue'
import DialogContent from '@/components/ui/dialog/DialogContent.vue'
import DialogHeader from '@/components/ui/dialog/DialogHeader.vue'
import DialogTitle from '@/components/ui/dialog/DialogTitle.vue'
import DialogDescription from '@/components/ui/dialog/DialogDescription.vue'
import DialogFooter from '@/components/ui/dialog/DialogFooter.vue'

export interface SmartDialogProps {
  open?: boolean
  variant?: DialogContext['variant']
  size?: DialogContext['size']
  title?: string
  description?: string
  // Behavior
  closeOnEscape?: boolean
  closeOnOutsideClick?: boolean
  showFooter?: boolean
  showCancel?: boolean
  showConfirm?: boolean
  confirmText?: string
  cancelText?: string
  confirmDisabled?: boolean
  loading?: boolean
  // Styling
  contentClass?: string
  headerClass?: string
  bodyClass?: string
  footerClass?: string
}

interface Emits {
  (e: 'update:open', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
  (e: 'close'): void
}

const props = withDefaults(defineProps<SmartDialogProps>(), {
  open: false,
  variant: 'default',
  size: 'md',
  closeOnEscape: true,
  closeOnOutsideClick: true,
  showFooter: true,
  showCancel: true,
  showConfirm: true,
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  confirmDisabled: false,
  loading: false
})

const emit = defineEmits<Emits>()

// Two-way binding for open state
const isOpen = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value)
})

// Dialog classes based on variant and size
const dialogClasses = computed(() => {
  const baseClasses = [
    'fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%]',
    'gap-4 border bg-background p-6 shadow-lg duration-200',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
    'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
    'sm:rounded-lg'
  ]

  // Size classes
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  }

  // Variant-specific styling
  const variantClasses = {
    default: 'border-border',
    destructive: 'border-red-200 bg-red-50',
    warning: 'border-amber-200 bg-amber-50',
    success: 'border-green-200 bg-green-50'
  }

  return cn(
    baseClasses,
    sizeClasses[props.size],
    variantClasses[props.variant]
  )
})

// Header styling
const headerClasses = computed(() => {
  const contexts = createDialogContext(props.variant, props.size)
  return cn(
    'flex flex-col space-y-1.5 text-center sm:text-left',
    contexts.value.density === 'compact' ? 'space-y-1' : contexts.value.density === 'spacious' ? 'space-y-3' : 'space-y-1.5'
  )
})

const titleClasses = computed(() => {
  const variantClasses = {
    default: 'text-lg font-semibold',
    destructive: 'text-lg font-semibold text-red-900',
    warning: 'text-lg font-semibold text-amber-900',
    success: 'text-lg font-semibold text-green-900'
  }
  
  return variantClasses[props.variant]
})

const descriptionClasses = computed(() => {
  const variantClasses = {
    default: 'text-sm text-muted-foreground',
    destructive: 'text-sm text-red-700',
    warning: 'text-sm text-amber-700',
    success: 'text-sm text-green-700'
  }
  
  return variantClasses[props.variant]
})

const bodyClasses = computed(() => {
  const contexts = createDialogContext(props.variant, props.size)
  return cn(
    contexts.value.density === 'compact' ? 'py-2' : contexts.value.density === 'spacious' ? 'py-6' : 'py-4'
  )
})

const footerClasses = computed(() => {
  return cn(
    'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
    props.size === 'sm' ? 'gap-2' : 'gap-3'
  )
})

// Create and provide dialog context
const dialogContext = createDialogContext(props.variant, props.size)
provide(DIALOG_CONTEXT_KEY, dialogContext)

// Event handlers
const close = () => {
  isOpen.value = false
  emit('close')
}

const handleEscape = () => {
  if (props.closeOnEscape) {
    close()
  }
}

const handleOutsideClick = () => {
  if (props.closeOnOutsideClick) {
    close()
  }
}

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
  close()
}

// Dialog Provider component
const DialogProvider = {
  props: ['variant', 'size'],
  setup(props: any, { slots }: any) {
    const dialogContext = createDialogContext(props.variant, props.size)
    provide(DIALOG_CONTEXT_KEY, dialogContext)
    return () => slots.default()
  }
}

// Expose dialog methods
defineExpose({
  close,
  open: () => isOpen.value = true,
  isOpen: computed(() => isOpen.value)
})
</script>