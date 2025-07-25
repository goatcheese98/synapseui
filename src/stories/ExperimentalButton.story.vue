<script setup lang="ts">
import { reactive } from 'vue'
import { logEvent } from 'histoire/client'
import ExperimentalButton from '../components/ui/button/ExperimentalButton.vue'

const state = reactive({
  text: 'Click me!',
  variant: 'primary',
  size: 'md',
  experiment: 'default',
  disabled: false,
  loading: false
})
</script>

<template>
  <Story
    title="Experimental/Button"
    :layout="{ type: 'grid', width: '200px' }"
  >
    <template #controls>
      <HstText
        v-model="state.text"
        title="Button Text"
      />
      <HstSelect
        v-model="state.variant"
        title="Variant"
        :options="[
          { value: 'neutral', label: 'Neutral' },
          { value: 'primary', label: 'Primary' },
          { value: 'secondary', label: 'Secondary' },
          { value: 'accent', label: 'Accent' },
          { value: 'info', label: 'Info' },
          { value: 'success', label: 'Success' },
          { value: 'warning', label: 'Warning' },
          { value: 'error', label: 'Error' },
          { value: 'outline', label: 'Outline' },
          { value: 'ghost', label: 'Ghost' },
          { value: 'link', label: 'Link' }
        ]"
      />
      <HstSelect
        v-model="state.size"
        title="Size"
        :options="[
          { value: 'xs', label: 'Extra Small' },
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' },
          { value: 'lg', label: 'Large' },
          { value: 'xl', label: 'Extra Large' }
        ]"
      />
      <HstSelect
        v-model="state.experiment"
        title="Animation Experiment"
        :options="[
          { value: 'default', label: 'Default (Corner Detection)' },
          { value: 'ripple', label: 'Ripple Effect' },
          { value: 'glow', label: 'Glow Effect' },
          { value: 'morph', label: 'Morph Corners' },
          { value: 'breathe', label: 'Breathing Animation' },
          { value: 'shimmer', label: 'Shimmer Effect' },
          { value: 'float', label: 'Floating Animation' }
        ]"
      />
      <HstCheckbox
        v-model="state.disabled"
        title="Disabled"
      />
      <HstCheckbox
        v-model="state.loading"
        title="Loading"
      />
    </template>

    <Variant
      title="Default Experiments"
      auto-props-disabled
    >
      <div class="space-y-4 p-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <h3 class="text-sm font-medium text-gray-700">Corner Detection (Default)</h3>
            <ExperimentalButton
              :variant="state.variant"
              :size="state.size"
              :disabled="state.disabled"
              :loading="state.loading"
              experiment="default"
              @click="logEvent('Click', $event)"
            >
              {{ state.text }}
            </ExperimentalButton>
          </div>
          
          <div class="space-y-2">
            <h3 class="text-sm font-medium text-gray-700">Ripple Effect</h3>
            <ExperimentalButton
              :variant="state.variant"
              :size="state.size"
              :disabled="state.disabled"
              :loading="state.loading"
              experiment="ripple"
              @click="logEvent('Ripple Click', $event)"
            >
              {{ state.text }}
            </ExperimentalButton>
          </div>
          
          <div class="space-y-2">
            <h3 class="text-sm font-medium text-gray-700">Glow Effect</h3>
            <ExperimentalButton
              :variant="state.variant"
              :size="state.size"
              :disabled="state.disabled"
              :loading="state.loading"
              experiment="glow"
              @click="logEvent('Glow Click', $event)"
            >
              {{ state.text }}
            </ExperimentalButton>
          </div>
          
          <div class="space-y-2">
            <h3 class="text-sm font-medium text-gray-700">Morph Corners</h3>
            <ExperimentalButton
              :variant="state.variant"
              :size="state.size"
              :disabled="state.disabled"
              :loading="state.loading"
              experiment="morph"
              @click="logEvent('Morph Click', $event)"
            >
              {{ state.text }}
            </ExperimentalButton>
          </div>
          
          <div class="space-y-2">
            <h3 class="text-sm font-medium text-gray-700">Breathing Animation</h3>
            <ExperimentalButton
              :variant="state.variant"
              :size="state.size"
              :disabled="state.disabled"
              :loading="state.loading"
              experiment="breathe"
              @click="logEvent('Breathe Click', $event)"
            >
              {{ state.text }}
            </ExperimentalButton>
          </div>
          
          <div class="space-y-2">
            <h3 class="text-sm font-medium text-gray-700">Shimmer Effect</h3>
            <ExperimentalButton
              :variant="state.variant"
              :size="state.size"
              :disabled="state.disabled"
              :loading="state.loading"
              experiment="shimmer"
              @click="logEvent('Shimmer Click', $event)"
            >
              {{ state.text }}
            </ExperimentalButton>
          </div>
          
          <div class="space-y-2">
            <h3 class="text-sm font-medium text-gray-700">Floating Animation</h3>
            <ExperimentalButton
              :variant="state.variant"
              :size="state.size"
              :disabled="state.disabled"
              :loading="state.loading"
              experiment="float"
              @click="logEvent('Float Click', $event)"
            >
              {{ state.text }}
            </ExperimentalButton>
          </div>
        </div>
      </div>
    </Variant>

    <Variant
      title="Interactive Playground"
      auto-props-disabled
    >
      <div class="p-4">
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-800">Interactive Experiment</h3>
          <p class="text-sm text-gray-600">
            Use the controls to test different combinations. The selected experiment: <strong>{{ state.experiment }}</strong>
          </p>
          <ExperimentalButton
            :variant="state.variant"
            :size="state.size"
            :disabled="state.disabled"
            :loading="state.loading"
            :experiment="state.experiment"
            @click="logEvent('Interactive Click', $event)"
          >
            {{ state.text }}
          </ExperimentalButton>
        </div>
      </div>
    </Variant>

    <Variant
      title="Comparison with Original"
      auto-props-disabled
    >
      <div class="p-4">
        <div class="grid grid-cols-2 gap-8">
          <div class="space-y-2">
            <h3 class="text-sm font-medium text-gray-700">Original Button</h3>
            <button
              :class="`px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors`"
              @click="logEvent('Original Click', $event)"
            >
              {{ state.text }}
            </button>
          </div>
          
          <div class="space-y-2">
            <h3 class="text-sm font-medium text-gray-700">Experimental Button</h3>
            <ExperimentalButton
              :variant="state.variant"
              :size="state.size"
              :disabled="state.disabled"
              :loading="state.loading"
              :experiment="state.experiment"
              @click="logEvent('Experimental Click', $event)"
            >
              {{ state.text }}
            </ExperimentalButton>
          </div>
        </div>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.space-y-2 > * + * {
  margin-top: 0.5rem;
}

.space-y-4 > * + * {
  margin-top: 1rem;
}

.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.gap-4 {
  gap: 1rem;
}

.gap-8 {
  gap: 2rem;
}
</style>

