<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
</script>

<template>
  <Story
    title="Components/Accordion"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="Default">
      <div class="w-full max-w-md mx-auto">
        <Accordion
          type="single"
          collapsible
          class="w-full"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Variant>

    <Variant title="Multiple">
      <div class="w-full max-w-md mx-auto">
        <Accordion
          type="multiple"
          class="w-full"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Can I open multiple items?</AccordionTrigger>
            <AccordionContent>
              Yes! When type is set to "multiple", you can have multiple accordion items open at the same time.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Keyboard Navigation</AccordionTrigger>
            <AccordionContent>
              Full keyboard navigation is supported. Use Tab to move between triggers, Space/Enter to toggle, and arrow keys to navigate.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Right to Left Support</AccordionTrigger>
            <AccordionContent>
              The accordion supports RTL layouts and can be configured with the dir prop.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Variant>

    <Variant title="Expanded by Default">
      <div class="w-full max-w-md mx-auto">
        <Accordion
          type="single"
          default-value="item-2"
          class="w-full"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>First Item</AccordionTrigger>
            <AccordionContent>
              This item is not expanded by default.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Second Item (Default Open)</AccordionTrigger>
            <AccordionContent>
              This item is expanded by default using the defaultValue prop.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Third Item</AccordionTrigger>
            <AccordionContent>
              This item is also not expanded by default.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Variant>

    <Variant title="Horizontal Orientation">
      <div class="w-full max-w-2xl mx-auto">
        <Accordion
          type="single"
          orientation="horizontal"
          class="flex w-full"
        >
          <AccordionItem
            value="item-1"
            class="flex-1"
          >
            <AccordionTrigger class="flex-col h-20">
              <span>Features</span>
            </AccordionTrigger>
            <AccordionContent class="mt-2">
              <div class="p-4 bg-gray-50 rounded">
                <ul class="list-disc list-inside space-y-1">
                  <li>Full keyboard navigation</li>
                  <li>Horizontal/vertical orientation</li>
                  <li>RTL direction support</li>
                  <li>Multiple or single expand</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-2"
            class="flex-1"
          >
            <AccordionTrigger class="flex-col h-20">
              <span>Installation</span>
            </AccordionTrigger>
            <AccordionContent class="mt-2">
              <div class="p-4 bg-gray-50 rounded">
                <code class="text-sm">npm add reka-ui</code>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-3"
            class="flex-1"
          >
            <AccordionTrigger class="flex-col h-20">
              <span>Usage</span>
            </AccordionTrigger>
            <AccordionContent class="mt-2">
              <div class="p-4 bg-gray-50 rounded">
                Import components and compose them together following the anatomy structure.
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Variant>

    <Variant title="Disabled Items">
      <div class="w-full max-w-md mx-auto">
        <Accordion
          type="single"
          class="w-full"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Enabled Item</AccordionTrigger>
            <AccordionContent>
              This item is fully functional and can be opened.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-2"
            disabled
          >
            <AccordionTrigger>Disabled Item</AccordionTrigger>
            <AccordionContent>
              This content cannot be accessed because the item is disabled.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Another Enabled Item</AccordionTrigger>
            <AccordionContent>
              This item works normally.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Variant>
  </Story>
</template>