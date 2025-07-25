<script setup lang="ts">
import { ref } from 'vue'
import { Button, Card, Form } from '@/components/families'
import VStack from '@/components/ui/stack/VStack.vue'
import HStack from '@/components/ui/stack/HStack.vue'

// Demo data
const isLoading = ref(false)
const profileData = ref({
  firstName: 'Sarah',
  lastName: 'Chen', 
  email: 'sarah.chen@example.com',
  bio: 'Senior Product Designer passionate about creating beautiful, accessible user experiences.'
})

const sampleUser = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  status: 'active' as const,
  bio: 'Full-stack developer who loves building amazing user experiences.',
  skills: ['Vue.js', 'TypeScript', 'Node.js', 'Design Systems'],
  stats: { posts: 32, followers: 567, following: 123 }
}

const handleFormSubmit = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    alert('Form submitted successfully!')
  }, 2000)
}

const handleIconClick = (icon: string) => {
  alert(`${icon} icon clicked!`)
}
</script>

<template>
  <Story title="Component Families" :layout="{ type: 'single', iframe: false }">
    
    <Variant title="Button Family">
      <div class="space-y-12 p-8">
        <div class="text-center">
          <h2 class="text-2xl font-bold mb-4">Button Family</h2>
          <p class="text-lg text-text-secondary mb-8">
            Elegant API: <code class="bg-background-muted px-2 py-1 rounded text-sm">Button.Primary</code>, 
            <code class="bg-background-muted px-2 py-1 rounded text-sm">Button.Ghost</code>, 
            <code class="bg-background-muted px-2 py-1 rounded text-sm">Button.Icon</code>
          </p>
        </div>

        <!-- Semantic Variants -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Semantic Variants</h3>
          <HStack spacing="md" class="flex-wrap">
            <Button.Primary>Primary Action</Button.Primary>
            <Button.Secondary>Secondary</Button.Secondary>
            <Button.Success>Success</Button.Success>
            <Button.Warning>Warning</Button.Warning>
            <Button.Error>Delete</Button.Error>
          </HStack>
        </div>

        <!-- Style Variants -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Style Variants</h3>
          <HStack spacing="md" class="flex-wrap">
            <Button.Outline>Outlined</Button.Outline>
            <Button.Ghost>Ghost Button</Button.Ghost>
            <Button.Link>Link Style</Button.Link>
          </HStack>
        </div>

        <!-- Size Variants -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Size Variants</h3>
          <HStack spacing="md" align="center" class="flex-wrap">
            <Button.Small>Small</Button.Small>
            <Button.Primary>Default</Button.Primary>
            <Button.Large>Large Button</Button.Large>
          </HStack>
        </div>

        <!-- Icon Buttons -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Icon Buttons</h3>
          <HStack spacing="md" class="flex-wrap">
            <Button.Icon icon="settings" @click="() => handleIconClick('settings')" />
            <Button.Icon icon="user" variant="primary" @click="() => handleIconClick('user')" />
            <Button.Icon icon="trash" variant="error" @click="() => handleIconClick('trash')" />
            <Button.Icon icon="edit" variant="success" size="lg" @click="() => handleIconClick('edit')" />
          </HStack>
        </div>

        <!-- Loading States -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Loading States</h3>
          <HStack spacing="md" class="flex-wrap">
            <Button.Primary :loading="true">Processing...</Button.Primary>
            <Button.Secondary :loading="true">Loading</Button.Secondary>
            <Button.Outline :loading="true">Please wait</Button.Outline>
          </HStack>
        </div>

        <!-- Text Warping Effects -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Text Warping Effects</h3>
          <p class="text-sm text-text-secondary mb-4">Click buttons to see individual letter warping animations!</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-medium mb-3">Warp Types</h4>
              <VStack spacing="sm">
                <Button.Primary>Default (Compress 0.8)</Button.Primary>
                <Button.Success text-warp-type="wave">Wave Effect</Button.Success>
                <Button.Warning text-warp-type="bend">Bend Effect</Button.Warning>
                <Button.Secondary text-warp-type="ripple">Ripple Effect</Button.Secondary>
              </VStack>
            </div>
            
            <div>
              <h4 class="font-medium mb-3">Intensity Levels</h4>
              <VStack spacing="sm">
                <Button.Primary :text-warp-intensity="0.5">Subtle (0.5)</Button.Primary>
                <Button.Primary>Default (0.8)</Button.Primary>
                <Button.Primary :text-warp-intensity="1.2">Strong (1.2)</Button.Primary>
                <Button.Outline :enable-text-warp="false">No Warp</Button.Outline>
              </VStack>
            </div>
          </div>
        </div>
      </div>
    </Variant>

    <Variant title="Card Family">
      <div class="space-y-12 p-8">
        <div class="text-center">
          <h2 class="text-2xl font-bold mb-4">Card Family</h2>
          <p class="text-lg text-text-secondary mb-8">
            Elegant API: <code class="bg-background-muted px-2 py-1 rounded text-sm">Card.User</code>, 
            <code class="bg-background-muted px-2 py-1 rounded text-sm">Card.Interactive</code>, 
            <code class="bg-background-muted px-2 py-1 rounded text-sm">Card.Feature</code>
          </p>
        </div>

        <!-- Card Variants -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Default Card -->
          <Card.Default>
            <div class="p-6">
              <h3 class="font-semibold mb-2">Default Card</h3>
              <p class="text-text-secondary">Standard card with basic styling and no special behaviors.</p>
            </div>
          </Card.Default>

          <!-- Interactive Card -->
          <Card.Interactive>
            <div class="p-6">
              <h3 class="font-semibold mb-2">Interactive Card</h3>
              <p class="text-text-secondary">Hover me! This card has interactive animations and hover effects.</p>
            </div>
          </Card.Interactive>

          <!-- Elevated Card -->
          <Card.Elevated>
            <div class="p-6">
              <h3 class="font-semibold mb-2">Elevated Card</h3>
              <p class="text-text-secondary">Elevated with stronger shadow and no border for floating effect.</p>
            </div>
          </Card.Elevated>
        </div>

        <!-- Specialized Cards -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Specialized Cards</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <!-- User Card -->
            <Card.User 
              :user="sampleUser" 
              :is-online="true"
              @view-profile="() => alert('View profile clicked')"
              @send-message="() => alert('Send message clicked')"
            />

            <!-- Feature Card -->
            <Card.Feature
              icon="🚀"
              title="Fast Performance"
              description="Built with modern technologies for blazing fast user experiences and optimal performance."
            />
          </div>
        </div>

        <!-- Card Sizes -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Card Sizes</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card.Compact>
              <div class="p-4">
                <h4 class="font-medium">Compact</h4>
                <p class="text-sm text-text-secondary">Small card for tight spaces</p>
              </div>
            </Card.Compact>

            <Card.Default>
              <div class="p-6">
                <h4 class="font-medium">Default</h4>
                <p class="text-sm text-text-secondary">Standard card size for most use cases</p>
              </div>
            </Card.Default>

            <Card.Wide>
              <div class="p-6">
                <h4 class="font-medium">Wide Card</h4>
                <p class="text-sm text-text-secondary">Extra wide card for dashboards and detailed content display</p>
              </div>
            </Card.Wide>
          </div>
        </div>
      </div>
    </Variant>

    <Variant title="Form Family">
      <div class="space-y-12 p-8">
        <div class="text-center">
          <h2 class="text-2xl font-bold mb-4">Form Family</h2>
          <p class="text-lg text-text-secondary mb-8">
            Elegant API: <code class="bg-background-muted px-2 py-1 rounded text-sm">Form.Field</code>, 
            <code class="bg-background-muted px-2 py-1 rounded text-sm">Form.Section</code>, 
            <code class="bg-background-muted px-2 py-1 rounded text-sm">Form.Actions</code>
          </p>
        </div>

        <!-- Form Components -->
        <div class="max-w-2xl mx-auto">
          <Card.Default>
            <div class="p-8">
              <h3 class="text-xl font-semibold mb-6">Profile Form Example</h3>
              
              <form @submit.prevent="handleFormSubmit">
                <VStack spacing="xl">
                  <!-- Personal Information Section -->
                  <Form.Section 
                    title="Personal Information"
                    description="Update your basic profile information"
                  >
                    <HStack spacing="md" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Form.Field
                        v-model="profileData.firstName"
                        label="First Name"
                        placeholder="Enter first name"
                        required
                      />
                      <Form.Field
                        v-model="profileData.lastName"
                        label="Last Name"
                        placeholder="Enter last name"
                        required
                      />
                    </HStack>
                    
                    <Form.Field
                      v-model="profileData.email"
                      label="Email Address"
                      type="email"
                      placeholder="Enter your email"
                      help-text="We'll never share your email with anyone"
                      required
                    />
                    
                    <Form.Field
                      v-model="profileData.bio"
                      label="Bio"
                      as="textarea"
                      placeholder="Tell us about yourself..."
                      help-text="Brief description of yourself (optional)"
                      rows="3"
                    />
                  </Form.Section>

                  <!-- Form Actions -->
                  <Form.Actions align="between">
                    <Button.Ghost>Cancel</Button.Ghost>
                    <Button.Primary 
                      type="submit" 
                      :loading="isLoading"
                      :disabled="isLoading"
                    >
                      {{ isLoading ? 'Saving...' : 'Save Changes' }}
                    </Button.Primary>
                  </Form.Actions>
                </VStack>
              </form>
            </div>
          </Card.Default>
        </div>

        <!-- Pre-built Form Examples -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Pre-built Forms</h3>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <!-- Contact Form -->
            <Card.Default>
              <div class="p-6">
                <h4 class="font-semibold mb-4">Contact Form</h4>
                <Form.Contact 
                  :loading="false"
                  @submit="() => alert('Contact form submitted!')"
                />
              </div>
            </Card.Default>

            <!-- Login Form -->
            <Card.Default>
              <div class="p-6">
                <h4 class="font-semibold mb-4">Login Form</h4>
                <Form.Login 
                  :is-loading="false"
                  @submit="() => alert('Login attempted!')"
                  @forgot-password="() => alert('Forgot password clicked!')"
                  @sign-up="() => alert('Sign up clicked!')"
                />
              </div>
            </Card.Default>
          </div>
        </div>
      </div>
    </Variant>

    <Variant title="Family Showcase">
      <div class="space-y-16 p-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold mb-4">Component Families Showcase</h2>
          <p class="text-xl text-text-secondary max-w-3xl mx-auto">
            Beautiful, intuitive APIs that make your components feel like a cohesive design system.
            Each family provides specialized variants while maintaining perfect design token consistency.
          </p>
        </div>

        <!-- Benefits Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card.Feature
            icon="⚡"
            title="Developer Experience"
            description="Intuitive APIs like Button.Primary and Card.Interactive make development a joy"
          />
          
          <Card.Feature
            icon="🎨"
            title="Design Consistency"
            description="All family components share the same design tokens for perfect visual harmony"
          />
          
          <Card.Feature
            icon="🔧"
            title="Type Safety"
            description="Full TypeScript support with intelligent autocomplete and error checking"
          />
        </div>

        <!-- Code Example -->
        <div class="max-w-4xl mx-auto">
          <Card.Default>
            <div class="p-8">
              <h3 class="text-xl font-semibold mb-4">Usage Example</h3>
              <div class="bg-background-muted p-6 rounded-lg font-mono text-sm overflow-x-auto">
                <div class="text-text-secondary"># Before (verbose)</div>
                <div class="mb-4">
                  &lt;Button variant="primary" size="lg" loading="true"&gt;Submit&lt;/Button&gt;<br>
                  &lt;Card class="hover:shadow-lg cursor-pointer"&gt;...&lt;/Card&gt;
                </div>
                
                <div class="text-text-secondary"># After (elegant)</div>
                <div>
                  &lt;Button.Primary size="lg" loading="true"&gt;Submit&lt;/Button.Primary&gt;<br>
                  &lt;Card.Interactive&gt;...&lt;/Card.Interactive&gt;
                </div>
              </div>
            </div>
          </Card.Default>
        </div>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
code {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}
</style>