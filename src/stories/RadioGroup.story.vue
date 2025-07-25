<script setup lang="ts">
import { reactive } from 'vue'
import RadioGroup from '@/components/ui/radio-group/RadioGroup.vue'
import RadioGroupItem from '@/components/ui/radio-group/RadioGroupItem.vue'
import Label from '@/components/ui/label/Label.vue'

const state = reactive({
  basic: 'option2',
  plan: 'pro',
  theme: 'system',
  notification: 'all'
})
</script>

<template>
  <Story title="Forms/RadioGroup" :layout="{ type: 'single', iframe: false }">
    <Variant title="Basic">
      <div class="space-y-4">
        <RadioGroup v-model="state.basic">
          <div class="flex items-center space-x-2">
            <RadioGroupItem value="option1" id="r1" />
            <Label for="r1">Option 1</Label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem value="option2" id="r2" />
            <Label for="r2">Option 2</Label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem value="option3" id="r3" />
            <Label for="r3">Option 3</Label>
          </div>
        </RadioGroup>
        <p class="text-sm text-muted-foreground">Selected: {{ state.basic }}</p>
      </div>
    </Variant>

    <Variant title="Disabled Options">
      <div class="space-y-4">
        <RadioGroup default-value="option2">
          <div class="flex items-center space-x-2">
            <RadioGroupItem value="option1" id="d1" />
            <Label for="d1">Available option</Label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem value="option2" id="d2" />
            <Label for="d2">Selected option</Label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem value="option3" id="d3" disabled />
            <Label for="d3" class="opacity-50">Disabled option</Label>
          </div>
        </RadioGroup>
      </div>
    </Variant>

    <Variant title="Pricing Plan">
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Choose your plan</h3>
        <RadioGroup v-model="state.plan">
          <div class="space-y-3">
            <div class="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
              <RadioGroupItem value="free" id="free" />
              <div class="flex-1">
                <Label for="free" class="font-medium">Free</Label>
                <p class="text-sm text-muted-foreground">Perfect for getting started</p>
                <p class="text-lg font-bold">$0<span class="text-sm font-normal">/month</span></p>
              </div>
            </div>
            
            <div class="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
              <RadioGroupItem value="pro" id="pro" />
              <div class="flex-1">
                <Label for="pro" class="font-medium">Pro</Label>
                <p class="text-sm text-muted-foreground">For growing businesses</p>
                <p class="text-lg font-bold">$15<span class="text-sm font-normal">/month</span></p>
              </div>
            </div>
            
            <div class="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
              <RadioGroupItem value="enterprise" id="enterprise" />
              <div class="flex-1">
                <Label for="enterprise" class="font-medium">Enterprise</Label>
                <p class="text-sm text-muted-foreground">For large organizations</p>
                <p class="text-lg font-bold">$50<span class="text-sm font-normal">/month</span></p>
              </div>
            </div>
          </div>
        </RadioGroup>
        <p class="text-sm text-muted-foreground">Selected plan: {{ state.plan }}</p>
      </div>
    </Variant>

    <Variant title="Theme Selection">
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Theme preference</h3>
        <RadioGroup v-model="state.theme">
          <div class="flex items-center space-x-2">
            <RadioGroupItem value="light" id="light" />
            <Label for="light">Light</Label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem value="dark" id="dark" />
            <Label for="dark">Dark</Label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem value="system" id="system" />
            <Label for="system">System</Label>
          </div>
        </RadioGroup>
        <p class="text-sm text-muted-foreground">Theme: {{ state.theme }}</p>
      </div>
    </Variant>

    <Variant title="Horizontal Layout">
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Notification preferences</h3>
        <RadioGroup v-model="state.notification" class="flex space-x-6">
          <div class="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label for="all">All</Label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem value="mentions" id="mentions" />
            <Label for="mentions">Mentions only</Label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem value="none" id="none" />
            <Label for="none">None</Label>
          </div>
        </RadioGroup>
        <p class="text-sm text-muted-foreground">Notifications: {{ state.notification }}</p>
      </div>
    </Variant>

    <Variant title="Different Sizes">
      <div class="space-y-4">
        <div class="space-y-3">
          <div class="flex items-center space-x-2">
            <RadioGroupItem value="small" id="size-small" class="h-3 w-3" />
            <Label for="size-small" class="text-xs">Small radio</Label>
          </div>
          
          <div class="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="size-medium" />
            <Label for="size-medium" class="text-sm">Medium radio (default)</Label>
          </div>
          
          <div class="flex items-center space-x-2">
            <RadioGroupItem value="large" id="size-large" class="h-5 w-5" />
            <Label for="size-large" class="text-base">Large radio</Label>
          </div>
        </div>
      </div>
    </Variant>
  </Story>
</template>