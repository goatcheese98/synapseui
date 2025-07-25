<script setup lang="ts">
import { reactive } from 'vue'
import { Icon } from '@iconify/vue'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'

const state = reactive({
  value: 'apple',
  placeholder: 'Select a fruit...',
  disabled: false,
  position: 'popper'
})
</script>

<template>
  <Story
    title="Components/Select"
    :layout="{ type: 'grid', width: '300px' }"
  >
    <template #controls>
      <HstText
        v-model="state.placeholder"
        title="Placeholder"
      />
      <HstSelect
        v-model="state.position"
        title="Position"
        :options="[
          { value: 'popper', label: 'Popper' },
          { value: 'item-aligned', label: 'Item Aligned' }
        ]"
      />
      <HstCheckbox
        v-model="state.disabled"
        title="Disabled"
      />
    </template>

    <Variant title="Basic Usage">
      <div class="space-y-4 p-4">
        <div class="space-y-2">
          <Label>Choose a fruit</Label>
          <Select v-model="state.value" :disabled="state.disabled">
            <SelectTrigger>
              <SelectValue :placeholder="state.placeholder" />
            </SelectTrigger>
            <SelectContent :position="state.position">
              <SelectItem value="apple">
                <Icon icon="lucide:apple" class="w-4 h-4 mr-2" />
                Apple
              </SelectItem>
              <SelectItem value="banana">
                <Icon icon="lucide:banana" class="w-4 h-4 mr-2" />
                Banana
              </SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
              <SelectItem value="grape">Grape</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <p class="text-sm text-muted-foreground">Selected: {{ state.value || 'None' }}</p>
      </div>
    </Variant>

    <Variant title="With Groups">
      <div class="space-y-4 p-4">
        <div class="space-y-2">
          <Label>Choose a programming language</Label>
          <Select default-value="javascript">
            <SelectTrigger>
              <SelectValue placeholder="Select a language..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Frontend</SelectLabel>
                <SelectItem value="javascript">
                  <Icon icon="logos:javascript" class="w-4 h-4 mr-2" />
                  JavaScript
                </SelectItem>
                <SelectItem value="typescript">
                  <Icon icon="logos:typescript-icon" class="w-4 h-4 mr-2" />
                  TypeScript
                </SelectItem>
                <SelectItem value="vue">
                  <Icon icon="logos:vue" class="w-4 h-4 mr-2" />
                  Vue.js
                </SelectItem>
                <SelectItem value="react">
                  <Icon icon="logos:react" class="w-4 h-4 mr-2" />
                  React
                </SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Backend</SelectLabel>
                <SelectItem value="nodejs">
                  <Icon icon="logos:nodejs-icon" class="w-4 h-4 mr-2" />
                  Node.js
                </SelectItem>
                <SelectItem value="python">
                  <Icon icon="logos:python" class="w-4 h-4 mr-2" />
                  Python
                </SelectItem>
                <SelectItem value="golang">
                  <Icon icon="logos:go" class="w-4 h-4 mr-2" />
                  Go
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Variant>

    <Variant title="Corner Detection Demo">
      <div class="space-y-4 p-4">
        <div class="space-y-2">
          <Label>Hover near corners to see animation</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Try hovering near the corners..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="corner1">Top-left corner detection</SelectItem>
              <SelectItem value="corner2">Top-right corner detection</SelectItem>
              <SelectItem value="corner3">Bottom-left corner detection</SelectItem>
              <SelectItem value="corner4">Bottom-right corner detection</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="text-xs text-muted-foreground space-y-1">
          <p>• Hover near corners of the trigger to see border radius morph</p>
          <p>• Menu items also have corner detection</p>
          <p>• Uses your button design language with 700-series colors</p>
        </div>
      </div>
    </Variant>

    <Variant title="Multiple Selects">
      <div class="space-y-6 p-4">
        <div class="space-y-2">
          <Label>Country</Label>
          <Select default-value="us">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">🇺🇸 United States</SelectItem>
              <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
              <SelectItem value="ca">🇨🇦 Canada</SelectItem>
              <SelectItem value="au">🇦🇺 Australia</SelectItem>
              <SelectItem value="de">🇩🇪 Germany</SelectItem>
              <SelectItem value="fr">🇫🇷 France</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="space-y-2">
          <Label>Time Zone</Label>
          <Select default-value="pst">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pst">PST (UTC-8)</SelectItem>
              <SelectItem value="mst">MST (UTC-7)</SelectItem>
              <SelectItem value="cst">CST (UTC-6)</SelectItem>
              <SelectItem value="est">EST (UTC-5)</SelectItem>
              <SelectItem value="utc">UTC (UTC+0)</SelectItem>
              <SelectItem value="cet">CET (UTC+1)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="space-y-2">
          <Label>Theme</Label>
          <Select default-value="system">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">
                <Icon icon="lucide:sun" class="w-4 h-4 mr-2" />
                Light
              </SelectItem>
              <SelectItem value="dark">
                <Icon icon="lucide:moon" class="w-4 h-4 mr-2" />
                Dark
              </SelectItem>
              <SelectItem value="system">
                <Icon icon="lucide:monitor" class="w-4 h-4 mr-2" />
                System
              </SelectItem>
            </SelectContent>
          </Select>
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

.space-y-6 > * + * {
  margin-top: 1.5rem;
}
</style>