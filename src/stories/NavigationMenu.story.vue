<script setup lang="ts">
import { reactive } from 'vue'
import { Icon } from '@iconify/vue'
import {
  NavigationMenuRoot,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport,
  NavigationMenuIndicator,
} from '@/components/ui/navigation-menu'

// Also import raw RekaUI components for testing
import {
  NavigationMenuRoot as RawNavigationMenuRoot,
  NavigationMenuList as RawNavigationMenuList,
  NavigationMenuItem as RawNavigationMenuItem,
  NavigationMenuTrigger as RawNavigationMenuTrigger,
  NavigationMenuContent as RawNavigationMenuContent,
  NavigationMenuViewport as RawNavigationMenuViewport,
} from 'reka-ui'

const state = reactive({
  orientation: 'horizontal',
  showIndicator: true,
  variant: 'default'
})
</script>

<template>
  <Story
    title="Components/NavigationMenu"
    :layout="{ type: 'single', iframe: false }"
  >
    <template #controls>
      <HstSelect
        v-model="state.orientation"
        title="Orientation"
        :options="[
          { value: 'horizontal', label: 'Horizontal' },
          { value: 'vertical', label: 'Vertical' }
        ]"
      />
      <HstCheckbox
        v-model="state.showIndicator"
        title="Show Indicator"
      />
      <HstSelect
        v-model="state.variant"
        title="Variant"
        :options="[
          { value: 'default', label: 'Default' },
          { value: 'with-icons', label: 'With Icons' }
        ]"
      />
    </template>

    <Variant
      title="Basic Navigation Menu"
      auto-props-disabled
    >
      <div class="relative flex w-full justify-center">
        <NavigationMenuRoot :orientation="state.orientation">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul class="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li class="row-span-3">
                    <NavigationMenuLink as-child>
                      <a
                        class="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <Icon icon="lucide:activity" class="h-6 w-6" />
                        <div class="mb-2 mt-4 text-lg font-medium">
                          Synapse UI
                        </div>
                        <p class="text-sm leading-tight text-muted-foreground">
                          Beautifully designed components built with Tailwind CSS and corner detection animations.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink as-child>
                      <a href="/docs" class="block">
                        <div class="text-sm font-medium leading-none">Introduction</div>
                        <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Re-usable components built using Tailwind CSS.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink as-child>
                      <a href="/docs/installation" class="block">
                        <div class="text-sm font-medium leading-none">Installation</div>
                        <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          How to install dependencies and structure your app.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink as-child>
                      <a href="/docs/primitives/typography" class="block">
                        <div class="text-sm font-medium leading-none">Typography</div>
                        <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Styles for headings, paragraphs, lists...etc
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Components</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li>
                    <NavigationMenuLink as-child>
                      <a href="/docs/primitives/alert-dialog" class="block">
                        <div class="text-sm font-medium leading-none">Alert Dialog</div>
                        <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          A modal dialog that interrupts the user with important content.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink as-child>
                      <a href="/docs/primitives/hover-card" class="block">
                        <div class="text-sm font-medium leading-none">Hover Card</div>
                        <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          For sighted users to preview content available behind a link.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink as-child>
                      <a href="/docs/primitives/progress" class="block">
                        <div class="text-sm font-medium leading-none">Progress</div>
                        <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Displays an indicator showing the completion progress.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink as-child>
                      <a href="/docs/primitives/scroll-area" class="block">
                        <div class="text-sm font-medium leading-none">Scroll-area</div>
                        <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Visually or semantically separates content.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink as-child>
                      <a href="/docs/primitives/tabs" class="block">
                        <div class="text-sm font-medium leading-none">Tabs</div>
                        <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          A set of layered sections of content.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink as-child>
                      <a href="/docs/primitives/tooltip" class="block">
                        <div class="text-sm font-medium leading-none">Tooltip</div>
                        <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          A popup that displays information related to an element.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/docs" class="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                Documentation
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuIndicator v-if="state.showIndicator" />
          </NavigationMenuList>

          <NavigationMenuViewport />
        </NavigationMenuRoot>
      </div>
    </Variant>

    <Variant
      title="Minimal Test (Raw RekaUI)"
      auto-props-disabled
    >
      <div class="flex justify-center p-8">
        <!-- Test with raw RekaUI components to isolate the issue -->
        <RawNavigationMenuRoot class="relative z-10 flex max-w-max flex-1 items-center justify-center">
          <RawNavigationMenuList class="group relative flex flex-1 list-none items-center justify-center space-x-1">
            <RawNavigationMenuItem>
              <RawNavigationMenuTrigger class="group inline-flex h-10 w-max items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Raw Test Menu
                <Icon icon="lucide:chevron-down" class="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" />
              </RawNavigationMenuTrigger>
              <RawNavigationMenuContent class="left-0 top-0 w-full md:absolute md:w-auto">
                <div class="p-4 w-[200px] bg-white dark:bg-gray-800 border rounded-md shadow-lg">
                  <p class="text-sm text-gray-900 dark:text-gray-100">This should be visible when clicking the trigger above!</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">If you see this, raw RekaUI works</p>
                </div>
              </RawNavigationMenuContent>
            </RawNavigationMenuItem>
          </RawNavigationMenuList>
          <RawNavigationMenuViewport class="absolute left-0 top-full z-50 mt-1.5 h-[var(--reka-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-white dark:bg-gray-800 shadow-lg md:w-[var(--reka-navigation-menu-viewport-width)]" />
        </RawNavigationMenuRoot>
      </div>
    </Variant>

    <Variant
      title="Fixed Navigation Menu Test"
      auto-props-disabled
    >
      <div class="space-y-4 p-4">
        <div class="text-center">
          <h3 class="text-lg font-medium text-foreground">Fixed styled components (hover to test)</h3>
          <p class="text-sm text-muted-foreground">• Should now work like the raw RekaUI version</p>
          <p class="text-sm text-muted-foreground">• Viewport has frosted glass backdrop blur effect</p>
          <p class="text-sm text-muted-foreground">• Corner detection animations temporarily disabled to fix core functionality</p>
        </div>
        
        <div class="flex justify-center">
          <NavigationMenuRoot>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>First Menu</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div class="grid gap-3 p-6 w-[400px]">
                    <NavigationMenuLink as-child>
                      <a href="#" class="block">
                        <div class="text-sm font-medium leading-none">Navigation Link 1</div>
                        <p class="text-sm leading-snug text-muted-foreground">
                          This should appear in a frosted glass dropdown
                        </p>
                      </a>
                    </NavigationMenuLink>
                    <NavigationMenuLink as-child>
                      <a href="#" class="block">
                        <div class="text-sm font-medium leading-none">Navigation Link 2</div>
                        <p class="text-sm leading-snug text-muted-foreground">
                          Testing fixed navigation menu functionality
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Second Menu</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div class="p-6 w-[300px]">
                    <p class="text-sm text-muted-foreground">
                      The backdrop blur effect creates a frosted glass appearance, 
                      blurring content behind while maintaining readability.
                    </p>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuViewport />
          </NavigationMenuRoot>
        </div>
      </div>
    </Variant>

    <Variant
      title="Vertical Navigation"
      auto-props-disabled
    >
      <div class="flex justify-center">
        <NavigationMenuRoot orientation="vertical">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div class="grid gap-3 p-4 w-[200px]">
                  <NavigationMenuLink href="#" class="block">
                    <div class="text-sm font-medium">Web Analytics</div>
                    <p class="text-xs text-muted-foreground">Track your website performance</p>
                  </NavigationMenuLink>
                  <NavigationMenuLink href="#" class="block">
                    <div class="text-sm font-medium">Email Marketing</div>
                    <p class="text-xs text-muted-foreground">Send targeted campaigns</p>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div class="grid gap-3 p-4 w-[200px]">
                  <NavigationMenuLink href="#" class="block">
                    <div class="text-sm font-medium">For Startups</div>
                    <p class="text-xs text-muted-foreground">Scale your business</p>
                  </NavigationMenuLink>
                  <NavigationMenuLink href="#" class="block">
                    <div class="text-sm font-medium">For Enterprise</div>
                    <p class="text-xs text-muted-foreground">Enterprise solutions</p>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#" class="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none">
                Pricing
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuViewport />
        </NavigationMenuRoot>
      </div>
    </Variant>
  </Story>
</template>