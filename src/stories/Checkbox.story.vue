<script setup lang="ts">
import { reactive } from 'vue'
import Checkbox from '@/components/ui/checkbox/BaseCheckbox.vue'
import Label from '@/components/ui/label/BaseLabel.vue'

const state = reactive({
  basic: false,
  withLabel: false,
  disabled: false,
  indeterminate: false,
  multiple: {
    option1: false,
    option2: true,
    option3: false
  }
})
</script>

<template>
  <Story
    title="Forms/Checkbox"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="Basic">
      <div class="space-y-4">
        <div class="flex items-center space-x-2">
          <Checkbox
            id="basic-checkbox"
            v-model:checked="state.basic"
          />
          <label
            for="basic-checkbox"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Basic checkbox
          </label>
        </div>
        <p class="text-sm text-muted-foreground">
          Checked: {{ state.basic }}
        </p>
      </div>
    </Variant>

    <Variant title="With Label Component">
      <div class="space-y-4">
        <div class="flex items-center space-x-2">
          <Checkbox
            id="label-checkbox"
            v-model:checked="state.withLabel"
          />
          <Label for="label-checkbox">
            Accept terms and conditions
          </Label>
        </div>
        <p class="text-sm text-muted-foreground">
          Accepted: {{ state.withLabel }}
        </p>
      </div>
    </Variant>

    <Variant title="Disabled">
      <div class="space-y-4">
        <div class="flex items-center space-x-2">
          <Checkbox
            id="disabled-checkbox"
            v-model:checked="state.disabled"
            disabled
          />
          <Label for="disabled-checkbox">
            Disabled checkbox
          </Label>
        </div>
        
        <div class="flex items-center space-x-2">
          <Checkbox
            id="disabled-checked"
            :checked="true"
            disabled
          />
          <Label for="disabled-checked">
            Disabled and checked
          </Label>
        </div>
      </div>
    </Variant>

    <Variant title="Multiple Options">
      <div class="space-y-4">
        <div class="space-y-3">
          <div class="flex items-center space-x-2">
            <Checkbox
              id="option1"
              v-model:checked="state.multiple.option1"
            />
            <Label for="option1">
              Option 1
            </Label>
          </div>
          
          <div class="flex items-center space-x-2">
            <Checkbox
              id="option2"
              v-model:checked="state.multiple.option2"
            />
            <Label for="option2">
              Option 2 (initially checked)
            </Label>
          </div>
          
          <div class="flex items-center space-x-2">
            <Checkbox
              id="option3"
              v-model:checked="state.multiple.option3"
            />
            <Label for="option3">
              Option 3
            </Label>
          </div>
        </div>
        
        <div class="mt-4 p-3 bg-muted rounded-md">
          <p class="text-sm font-medium mb-2">
            Selected options:
          </p>
          <ul class="text-sm text-muted-foreground space-y-1">
            <li v-if="state.multiple.option1">
              ✓ Option 1
            </li>
            <li v-if="state.multiple.option2">
              ✓ Option 2
            </li>
            <li v-if="state.multiple.option3">
              ✓ Option 3
            </li>
            <li v-if="!state.multiple.option1 && !state.multiple.option2 && !state.multiple.option3">
              No options selected
            </li>
          </ul>
        </div>
      </div>
    </Variant>

    <Variant title="Form Example">
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">
          Preferences
        </h3>
        <div class="space-y-3">
          <div class="flex items-center space-x-2">
            <Checkbox id="newsletter" />
            <Label for="newsletter">
              Subscribe to newsletter
            </Label>
          </div>
          
          <div class="flex items-center space-x-2">
            <Checkbox id="marketing" />
            <Label for="marketing">
              Receive marketing emails
            </Label>
          </div>
          
          <div class="flex items-center space-x-2">
            <Checkbox id="updates" />
            <Label for="updates">
              Product updates and announcements
            </Label>
          </div>
          
          <div class="flex items-center space-x-2">
            <Checkbox
              id="security"
              :checked="true"
            />
            <Label for="security">
              Security notifications (recommended)
            </Label>
          </div>
        </div>
      </div>
    </Variant>

    <Variant title="Different Sizes">
      <div class="space-y-4">
        <div class="flex items-center space-x-2">
          <Checkbox
            id="small"
            class="h-3 w-3"
          />
          <Label
            for="small"
            class="text-xs"
          >
            Small checkbox
          </Label>
        </div>
        
        <div class="flex items-center space-x-2">
          <Checkbox
            id="medium"
          />
          <Label
            for="medium"
            class="text-sm"
          >
            Medium checkbox (default)
          </Label>
        </div>
        
        <div class="flex items-center space-x-2">
          <Checkbox
            id="large"
            class="h-5 w-5"
          />
          <Label
            for="large"
            class="text-base"
          >
            Large checkbox
          </Label>
        </div>
      </div>
    </Variant>
  </Story>
</template>