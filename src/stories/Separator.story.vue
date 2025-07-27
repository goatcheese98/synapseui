<script setup lang="ts">
import Separator from '@/components/ui/separator/BaseSeparator.vue'
import Button from '@/components/ui/button/BaseButton.vue'
import VStack from '@/components/ui/stack/VStack.vue'
import HStack from '@/components/ui/stack/HStack.vue'
</script>

<template>
  <Story
    title="Layout/Separator"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="Horizontal Separator">
      <div class="space-y-6">
        <VStack spacing="md">
          <p class="text-sm">
            Content above the separator
          </p>
          <Separator />
          <p class="text-sm">
            Content below the separator
          </p>
        </VStack>
      </div>
    </Variant>

    <Variant title="Vertical Separator">
      <div class="space-y-6">
        <HStack
          spacing="md"
          justify="center"
          class="h-12"
        >
          <span class="text-sm">Left content</span>
          <Separator orientation="vertical" />
          <span class="text-sm">Right content</span>
        </HStack>
      </div>
    </Variant>

    <Variant title="In Navigation">
      <div class="space-y-6">
        <div class="border rounded-lg p-4 bg-card">
          <HStack
            align="between"
            justify="center"
          >
            <div class="font-bold text-lg">
              Logo
            </div>
            <HStack>
              <Button
                variant="ghost"
                size="sm"
              >
                Home
              </Button>
              <Separator
                orientation="vertical"
                class="h-4"
              />
              <Button
                variant="ghost"
                size="sm"
              >
                About
              </Button>
              <Separator
                orientation="vertical"
                class="h-4"
              />
              <Button
                variant="ghost"
                size="sm"
              >
                Services
              </Button>
              <Separator
                orientation="vertical"
                class="h-4"
              />
              <Button
                variant="ghost"
                size="sm"
              >
                Contact
              </Button>
            </HStack>
            <Button size="sm">
              Sign Up
            </Button>
          </HStack>
        </div>
      </div>
    </Variant>

    <Variant title="In Content Sections">
      <div class="space-y-6">
        <div class="border rounded-lg p-6 bg-card max-w-md">
          <VStack spacing="lg">
            <div>
              <h3 class="font-semibold text-lg mb-2">
                Profile Settings
              </h3>
              <p class="text-muted-foreground text-sm">
                Manage your account preferences and personal information.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h4 class="font-medium mb-2">
                Personal Information
              </h4>
              <VStack spacing="sm">
                <div class="flex justify-between items-center text-sm">
                  <span>Full Name</span>
                  <span class="text-muted-foreground">John Doe</span>
                </div>
                <div class="flex justify-between items-center text-sm">
                  <span>Email</span>
                  <span class="text-muted-foreground">john@example.com</span>
                </div>
              </VStack>
            </div>
            
            <Separator />
            
            <div>
              <h4 class="font-medium mb-2">
                Preferences
              </h4>
              <VStack spacing="sm">
                <div class="flex justify-between items-center text-sm">
                  <span>Language</span>
                  <span class="text-muted-foreground">English</span>
                </div>
                <div class="flex justify-between items-center text-sm">
                  <span>Timezone</span>
                  <span class="text-muted-foreground">UTC-5</span>
                </div>
              </VStack>
            </div>
          </VStack>
        </div>
      </div>
    </Variant>

    <Variant title="Different Styles">
      <div class="space-y-8">
        <div>
          <h3 class="text-sm font-medium mb-4">
            Default
          </h3>
          <VStack spacing="md">
            <p class="text-sm">
              Default separator style
            </p>
            <Separator />
            <p class="text-sm">
              Uses border color
            </p>
          </VStack>
        </div>

        <div>
          <h3 class="text-sm font-medium mb-4">
            Custom Colors
          </h3>
          <VStack spacing="md">
            <p class="text-sm">
              Custom colored separators
            </p>
            <Separator class="bg-red-200" />
            <p class="text-sm">
              Red separator
            </p>
            <Separator class="bg-blue-200" />
            <p class="text-sm">
              Blue separator
            </p>
            <Separator class="bg-green-200" />
            <p class="text-sm">
              Green separator
            </p>
          </VStack>
        </div>

        <div>
          <h3 class="text-sm font-medium mb-4">
            Thickness Variations
          </h3>
          <VStack spacing="md">
            <p class="text-sm">
              Thin separator
            </p>
            <Separator class="h-px" />
            <p class="text-sm">
              Medium separator
            </p>
            <Separator class="h-0.5" />
            <p class="text-sm">
              Thick separator
            </p>
            <Separator class="h-1" />
            <p class="text-sm">
              Very thick separator
            </p>
            <Separator class="h-2" />
          </VStack>
        </div>
      </div>
    </Variant>

    <Variant title="In Lists">
      <div class="space-y-6">
        <div class="border rounded-lg bg-card max-w-sm">
          <VStack spacing="xs">
            <div class="p-4 hover:bg-accent/50 transition-colors cursor-pointer">
              <div class="font-medium">
                Inbox
              </div>
              <div class="text-sm text-muted-foreground">
                12 new messages
              </div>
            </div>
            
            <Separator />
            
            <div class="p-4 hover:bg-accent/50 transition-colors cursor-pointer">
              <div class="font-medium">
                Sent
              </div>
              <div class="text-sm text-muted-foreground">
                45 messages
              </div>
            </div>
            
            <Separator />
            
            <div class="p-4 hover:bg-accent/50 transition-colors cursor-pointer">
              <div class="font-medium">
                Drafts
              </div>
              <div class="text-sm text-muted-foreground">
                3 drafts
              </div>
            </div>
            
            <Separator />
            
            <div class="p-4 hover:bg-accent/50 transition-colors cursor-pointer">
              <div class="font-medium">
                Trash
              </div>
              <div class="text-sm text-muted-foreground">
                Empty
              </div>
            </div>
          </VStack>
        </div>
      </div>
    </Variant>

    <Variant title="Toolbar Example">
      <div class="space-y-6">
        <div class="border rounded-lg p-3 bg-card">
          <HStack
            spacing="sm"
            justify="center"
          >
            <Button
              variant="ghost"
              size="sm"
            >
              Bold
            </Button>
            <Button
              variant="ghost"
              size="sm"
            >
              Italic
            </Button>
            <Button
              variant="ghost"
              size="sm"
            >
              Underline
            </Button>
            
            <Separator
              orientation="vertical"
              class="h-6"
            />
            
            <Button
              variant="ghost"
              size="sm"
            >
              Left
            </Button>
            <Button
              variant="ghost"
              size="sm"
            >
              Center
            </Button>
            <Button
              variant="ghost"
              size="sm"
            >
              Right
            </Button>
            
            <Separator
              orientation="vertical"
              class="h-6"
            />
            
            <Button
              variant="ghost"
              size="sm"
            >
              Link
            </Button>
            <Button
              variant="ghost"
              size="sm"
            >
              Image
            </Button>
            
            <Separator
              orientation="vertical"
              class="h-6"
            />
            
            <Button
              variant="ghost"
              size="sm"
            >
              Save
            </Button>
          </HStack>
        </div>
        
        <p class="text-xs text-muted-foreground">
          Vertical separators help group related toolbar actions together.
        </p>
      </div>
    </Variant>
  </Story>
</template>