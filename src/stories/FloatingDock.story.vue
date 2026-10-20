<script setup lang="ts">
import DraggableDockDemo from '@/components/docs/DraggableDockDemo.vue'
</script>

<template>
  <Story
    title="Patterns/FloatingDock"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant
      title="Light"
      responsive-disabled
    >
      <DraggableDockDemo theme="light" />
    </Variant>
    <Variant
      title="Dark"
      responsive-disabled
    >
      <DraggableDockDemo theme="dark" />
    </Variant>
  </Story>
</template>
