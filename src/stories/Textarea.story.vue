<script setup lang="ts">
import { reactive } from 'vue'
import Textarea from '@/components/ui/textarea/Textarea.vue'

const state = reactive({
  basic: '',
  disabled: '',
  placeholder: '',
  resizable: ''
})
</script>

<template>
  <Story title="Forms/Textarea" :layout="{ type: 'single', iframe: false }">
    <Variant title="Basic">
      <div class="space-y-4">
        <div>
          <label for="basic-textarea" class="block text-sm font-medium text-foreground mb-2">
            Basic Textarea
          </label>
          <Textarea
            id="basic-textarea"
            v-model="state.basic"
            placeholder="Type your message here..."
          />
        </div>
        <p class="text-sm text-muted-foreground">Value: {{ state.basic }}</p>
      </div>
    </Variant>

    <Variant title="With Placeholder">
      <div class="space-y-4">
        <div>
          <label for="placeholder-textarea" class="block text-sm font-medium text-foreground mb-2">
            With Placeholder
          </label>
          <Textarea
            id="placeholder-textarea"
            v-model="state.placeholder"
            placeholder="Tell us about your project requirements..."
          />
        </div>
      </div>
    </Variant>

    <Variant title="Disabled">
      <div class="space-y-4">
        <div>
          <label for="disabled-textarea" class="block text-sm font-medium text-foreground mb-2">
            Disabled Textarea
          </label>
          <Textarea
            id="disabled-textarea"
            v-model="state.disabled"
            placeholder="This textarea is disabled"
            disabled
          />
        </div>
      </div>
    </Variant>

    <Variant title="Different Sizes">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-foreground mb-2">
            Small (min-h-[60px])
          </label>
          <Textarea
            placeholder="Small textarea..."
            class="min-h-[60px]"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-foreground mb-2">
            Medium (default)
          </label>
          <Textarea
            placeholder="Medium textarea..."
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-foreground mb-2">
            Large (min-h-[120px])
          </label>
          <Textarea
            placeholder="Large textarea..."
            class="min-h-[120px]"
          />
        </div>
      </div>
    </Variant>

    <Variant title="Resizable">
      <div class="space-y-4">
        <div>
          <label for="resizable-textarea" class="block text-sm font-medium text-foreground mb-2">
            Resizable Textarea
          </label>
          <Textarea
            id="resizable-textarea"
            v-model="state.resizable"
            placeholder="This textarea can be resized..."
            class="resize-y"
          />
        </div>
      </div>
    </Variant>

    <Variant title="Corner Animation Demo">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-foreground mb-2">
            Hover over corners to see animation
          </label>
          <Textarea
            placeholder="Move your mouse to the corners of this textarea to see the corner detection animation..."
            class="min-h-[100px]"
          />
        </div>
        <p class="text-xs text-muted-foreground">
          ✨ Try hovering over the corners of the textarea above
        </p>
      </div>
    </Variant>
  </Story>
</template>