<template>
  <Stack
    direction="vertical"
    :spacing="spacing"
    :align="align"
    :justify="justify"
    :wrap="wrap"
    :class="($attrs.class as string | undefined)"
  >
    <slot />
  </Stack>
</template>

<script setup lang="ts">
import Stack from './Stack.vue'

interface Props {
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  align?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  justify?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  wrap?: boolean
}

withDefaults(defineProps<Props>(), {
  spacing: 'md',
  align: 'start',
  justify: 'stretch',
  wrap: false
})
</script>