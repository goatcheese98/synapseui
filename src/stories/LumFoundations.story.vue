<script setup lang="ts">
import LumFoundations from '../components/docs/LumFoundations.vue'
</script>

<template>
  <Story
    responsive-disabled
    title="Foundations/LUM Button &amp; Input"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="Light">
      <LumFoundations theme="light" />
    </Variant>
    <Variant title="Dark">
      <LumFoundations theme="dark" />
    </Variant>
    <Variant title="System">
      <LumFoundations theme="system" />
    </Variant>
  </Story>
</template>
