<template>
  <AlertDialogPortal>
    <AlertDialogOverlay
      :class="cn(
        'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        overlayClass
      )"
    />
    <AlertDialogContent
      :class="cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
        $attrs.class
      )"
      v-bind="$attrs"
    >
      <slot />
    </AlertDialogContent>
  </AlertDialogPortal>
</template>

<script setup lang="ts">
import { AlertDialogContent, AlertDialogOverlay, AlertDialogPortal } from 'reka-ui'
import { cn } from '@/lib/utils'

interface Props {
  overlayClass?: string
}

defineProps<Props>()
</script>

<style>
@keyframes in {
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes out {
  from {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.95);
  }
}

.animate-in {
  animation: in 0.2s ease-out;
}

.animate-out {
  animation: out 0.2s ease-out;
}

.fade-in-0 {
  animation: fadeIn 0.2s ease-out;
}

.fade-out-0 {
  animation: fadeOut 0.2s ease-out;
}

.zoom-in-95 {
  animation: zoomIn 0.2s ease-out;
}

.zoom-out-95 {
  animation: zoomOut 0.2s ease-out;
}

.slide-in-from-left-1\/2 {
  animation: slideInFromLeft 0.2s ease-out;
}

.slide-in-from-top-48 {
  animation: slideInFromTop 0.2s ease-out;
}

.slide-out-to-left-1\/2 {
  animation: slideOutToLeft 0.2s ease-out;
}

.slide-out-to-top-48 {
  animation: slideOutToTop 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes zoomIn {
  from { transform: translate(-50%, -50%) scale(0.95); }
  to { transform: translate(-50%, -50%) scale(1); }
}

@keyframes zoomOut {
  from { transform: translate(-50%, -50%) scale(1); }
  to { transform: translate(-50%, -50%) scale(0.95); }
}

@keyframes slideInFromLeft {
  from { transform: translate(-52%, -50%); }
  to { transform: translate(-50%, -50%); }
}

@keyframes slideInFromTop {
  from { transform: translate(-50%, -52%); }
  to { transform: translate(-50%, -50%); }
}

@keyframes slideOutToLeft {
  from { transform: translate(-50%, -50%); }
  to { transform: translate(-48%, -50%); }
}

@keyframes slideOutToTop {
  from { transform: translate(-50%, -50%); }
  to { transform: translate(-50%, -48%); }
}
</style>