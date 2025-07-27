<!--
  UserCard Composite Component
  Beautiful user profile card using Card + Badge + Button + Stack components
-->

<template>
  <Card :class="cardClasses">
    <CardHeader>
      <div class="flex items-start justify-between gap-token-md">
        <!-- User Avatar & Info -->
        <div class="flex items-center gap-token-md flex-1 min-w-0">
          <div class="relative flex-shrink-0">
            <div 
              class="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-text font-semibold text-lg"
              :style="{ backgroundColor: avatarColor }"
            >
              {{ initials }}
            </div>
            <div 
              v-if="isOnline"
              class="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-background-primary"
              title="Online"
            />
          </div>
          
          <div class="flex flex-col gap-token-xs min-w-0 flex-1">
            <CardTitle class="mb-0 text-left truncate">
              {{ user.name }}
            </CardTitle>
            <CardDescription class="flex items-center gap-token-xs text-left truncate">
              <Icon
                name="mail"
                size="14"
                class="flex-shrink-0"
              />
              <span class="truncate">{{ user.email }}</span>
            </CardDescription>
          </div>
        </div>

        <!-- Status Badge -->
        <div class="flex-shrink-0">
          <Badge
            :variant="statusVariant"
            class="whitespace-nowrap"
          >
            {{ user.status }}
          </Badge>
        </div>
      </div>
    </CardHeader>

    <CardContent>
      <VStack spacing="md">
        <!-- User Stats -->
        <div class="grid grid-cols-3 gap-4 text-center">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="flex flex-col"
          >
            <div class="text-token-lg font-semibold text-text-primary">
              {{ stat.value }}
            </div>
            <div class="text-token-sm text-text-secondary">
              {{ stat.label }}
            </div>
          </div>
        </div>

        <!-- User Bio -->
        <p
          v-if="user.bio"
          class="text-token-sm text-text-secondary leading-relaxed"
        >
          {{ user.bio }}
        </p>

        <!-- Skills/Tags -->
        <div
          v-if="user.skills?.length"
          class="flex flex-wrap gap-token-xs"
        >
          <Badge 
            v-for="skill in user.skills" 
            :key="skill"
            variant="secondary"
            size="sm"
            class="text-xs"
          >
            {{ skill }}
          </Badge>
        </div>
      </VStack>
    </CardContent>

    <CardFooter>
      <div class="flex gap-token-sm w-full">
        <Button
          variant="primary"
          size="sm"
          class="flex-1 justify-center"
        >
          <Icon
            name="user"
            size="16"
            class="mr-2"
          />
          View Profile
        </Button>
        <Button
          variant="outline"
          size="sm"
          class="flex-1 justify-center"
        >
          <Icon
            name="mail"
            size="16"
            class="mr-2"
          />
          Message
        </Button>
        <Button
          variant="ghost"
          size="sm"
          class="w-10 h-8 p-0 justify-center"
        >
          <Icon
            name="settings"
            size="16"
          />
        </Button>
      </div>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Card from '@/components/ui/card/BaseCard.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import CardTitle from '@/components/ui/card/CardTitle.vue'
import CardDescription from '@/components/ui/card/CardDescription.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import CardFooter from '@/components/ui/card/CardFooter.vue'
import Badge from '@/components/ui/badge/BaseBadge.vue'
import Button from "@/components/ui/button/BaseButton.vue"
import VStack from '@/components/ui/stack/VStack.vue'
import Icon from '@/components/ui/icon/BaseIcon.vue'

interface User {
  name: string
  email: string
  status: 'active' | 'inactive' | 'pending' | 'banned'
  bio?: string
  skills?: string[]
  avatar?: string
  stats?: {
    posts?: number
    followers?: number
    following?: number
  }
}

interface Props {
  user: User
  isOnline?: boolean
  variant?: 'default' | 'compact' | 'detailed'
  interactive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isOnline: false,
  variant: 'default',
  interactive: true
})

// Commenting out unused emit
// const emit = defineEmits<{
//   'view-profile': [user: User]
//   'send-message': [user: User]
//   'edit-user': [user: User]
// }>()

// Generate initials from name
const initials = computed(() => {
  return props.user.name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
})

// Generate avatar color based on name
const avatarColor = computed(() => {
  const colors = [
    '#ef4444', // red
    '#f97316', // orange  
    '#eab308', // yellow
    '#22c55e', // green
    '#06b6d4', // cyan
    '#3b82f6', // blue
    '#8b5cf6', // violet
    '#ec4899', // pink
  ]
  
  const hash = props.user.name
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0)
  
  return colors[hash % colors.length]
})

// Status badge variant
const statusVariant = computed(() => {
  const variants = {
    active: 'success',
    inactive: 'secondary',
    pending: 'warning',
    banned: 'destructive' // Changed from 'error' to 'destructive' to match Badge variants
  } as const
  
  return variants[props.user.status] || 'secondary'
})

// User stats for display
const stats = computed(() => {
  const userStats = props.user.stats || {}
  return [
    { label: 'Posts', value: userStats.posts || 0 },
    { label: 'Followers', value: userStats.followers || 0 },
    { label: 'Following', value: userStats.following || 0 },
  ]
})

// Dynamic card classes
const cardClasses = computed(() => [
  'user-card transition-all duration-token-normal overflow-hidden',
  {
    'hover:shadow-token-md cursor-pointer': props.interactive,
    'max-w-sm': props.variant === 'compact',
    'max-w-md': props.variant === 'default',
    'max-w-lg': props.variant === 'detailed',
  }
])
</script>

<style scoped>
.user-card:hover {
  transform: translateY(-2px);
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .user-card {
    max-width: 100%;
  }
}
</style>