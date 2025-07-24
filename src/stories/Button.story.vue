<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <Story title="Components/Button" :layout="{ type: 'grid', width: '200px' }">
    <Variant title="Default">
      <Button>Default Button</Button>
    </Variant>

    <Variant title="Variants">
      <template #default>
        <div class="flex flex-col gap-4">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </template>
    </Variant>

    <Variant title="Sizes">
      <template #default>
        <div class="flex flex-col gap-4 items-start">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">🔥</Button>
        </div>
      </template>
    </Variant>

    <Variant title="States">
      <template #default>
        <div class="flex flex-col gap-4">
          <Button>Normal</Button>
          <Button disabled>Disabled</Button>
        </div>
      </template>
    </Variant>

    <Variant title="Interactive" :controls="{ variant: 'default', size: 'default', disabled: false }">
      <template #default="{ state }">
        <Button 
          :variant="state.variant" 
          :size="state.size" 
          :disabled="state.disabled"
          @click="() => console.log('Button clicked!')"
        >
          {{ state.variant === 'icon' ? '🔥' : 'Interactive Button' }}
        </Button>
      </template>
    </Variant>
  </Story>
</template>