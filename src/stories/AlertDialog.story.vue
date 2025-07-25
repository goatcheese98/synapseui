<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

const isLoading = ref(false)
const asyncOpen = ref(false)

const handleAsyncAction = async () => {
  isLoading.value = true
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 2000))
  isLoading.value = false
  asyncOpen.value = false
}

const handleDestructiveAction = () => {
  console.log('Destructive action confirmed')
}

const handleFormSubmit = () => {
  console.log('Form submitted successfully')
}
</script>

<template>
  <Story
    title="Components/Alert Dialog"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="Basic Usage">
      <div class="flex items-center justify-center p-8">
        <AlertDialog>
          <AlertDialogTrigger>Show Dialog</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction variant="destructive">Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Variant>

    <Variant title="Destructive Action">
      <div class="flex items-center justify-center p-8">
        <AlertDialog>
          <AlertDialogTrigger variant="destructive">
            <Icon icon="lucide:trash-2" class="w-4 h-4" />
            Delete Account
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle class="flex items-center gap-2 text-destructive">
                <Icon icon="lucide:alert-triangle" class="w-5 h-5" />
                Delete Account
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers. All your projects, files, and 
                settings will be lost forever.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                variant="destructive" 
                @click="handleDestructiveAction"
              >
                Yes, delete account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Variant>

    <Variant title="Confirmation with Details">
      <div class="flex items-center justify-center p-8">
        <AlertDialog>
          <AlertDialogTrigger variant="outline">
            <Icon icon="lucide:upload" class="w-4 h-4" />
            Publish Project
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle class="flex items-center gap-2">
                <Icon icon="lucide:rocket" class="w-5 h-5 text-primary" />
                Publish Project
              </AlertDialogTitle>
              <AlertDialogDescription>
                Your project will be made publicly available. Once published, anyone
                with the link will be able to view and interact with your project.
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            <div class="my-4 p-4 bg-muted rounded-lg">
              <h4 class="text-sm font-medium mb-2">Project Details:</h4>
              <ul class="text-sm text-muted-foreground space-y-1">
                <li>• Name: Synapse UI Component Library</li>
                <li>• Version: 1.0.0</li>
                <li>• Last updated: 2 minutes ago</li>
                <li>• Components: 15</li>
              </ul>
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Publish Project</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Variant>

    <Variant title="Async Action with Loading">
      <div class="flex items-center justify-center p-8">
        <AlertDialog v-model:open="asyncOpen">
          <AlertDialogTrigger>
            <Icon icon="lucide:save" class="w-4 h-4" />
            Save Changes
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Save Changes</AlertDialogTitle>
              <AlertDialogDescription>
                Do you want to save your changes? This will update your project
                configuration and apply all pending modifications.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel :disabled="isLoading">Cancel</AlertDialogCancel>
              <AlertDialogAction 
                :disabled="isLoading"
                @click="handleAsyncAction"
              >
                <Icon 
                  v-if="isLoading" 
                  icon="lucide:loader-2" 
                  class="w-4 h-4 animate-spin" 
                />
                <Icon 
                  v-else 
                  icon="lucide:save" 
                  class="w-4 h-4" 
                />
                {{ isLoading ? 'Saving...' : 'Save Changes' }}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Variant>

    <Variant title="Form Submission">
      <div class="flex items-center justify-center p-8">
        <AlertDialog>
          <AlertDialogTrigger variant="secondary">
            <Icon icon="lucide:user-plus" class="w-4 h-4" />
            Invite User
          </AlertDialogTrigger>
          <AlertDialogContent class="max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle>Invite Team Member</AlertDialogTitle>
              <AlertDialogDescription>
                Send an invitation to join your team. They'll receive an email
                with instructions to get started.
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            <form @submit.prevent="handleFormSubmit" class="space-y-4">
              <div>
                <label for="email" class="text-sm font-medium">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="colleague@company.com"
                  class="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                />
              </div>
              
              <div>
                <label for="role" class="text-sm font-medium">Role</label>
                <select
                  id="role"
                  class="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>

              <AlertDialogFooter class="mt-6">
                <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
                <AlertDialogAction type="submit">
                  <Icon icon="lucide:send" class="w-4 h-4" />
                  Send Invitation
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Variant>

    <Variant title="Success Confirmation">
      <div class="flex items-center justify-center p-8">
        <AlertDialog>
          <AlertDialogTrigger variant="default">
            Complete Setup
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle class="flex items-center gap-2 text-success">
                <Icon icon="lucide:check-circle" class="w-6 h-6" />
                Setup Complete!
              </AlertDialogTitle>
              <AlertDialogDescription>
                Congratulations! Your Synapse UI component library has been successfully
                configured and is ready to use.
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            <div class="my-4 p-4 bg-success/10 border border-success/20 rounded-lg">
              <h4 class="text-sm font-medium text-success mb-2">What's next?</h4>
              <ul class="text-sm text-success/80 space-y-1">
                <li>✓ Start building components</li>
                <li>✓ Explore the component gallery</li>
                <li>✓ Check out the documentation</li>
                <li>✓ Join our community</li>
              </ul>
            </div>

            <AlertDialogFooter>
              <AlertDialogAction class="w-full">
                <Icon icon="lucide:arrow-right" class="w-4 h-4" />
                Get Started
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Variant>

    <Variant title="Warning Dialog">
      <div class="flex items-center justify-center p-8">
        <AlertDialog>
          <AlertDialogTrigger variant="outline">
            <Icon icon="lucide:alert-triangle" class="w-4 h-4" />
            Clear Cache
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle class="flex items-center gap-2 text-warning">
                <Icon icon="lucide:alert-triangle" class="w-5 h-5" />
                Clear Application Cache
              </AlertDialogTitle>
              <AlertDialogDescription>
                This will clear all cached data including user preferences, temporary files,
                and session data. You may need to reconfigure some settings.
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            <div class="my-4 p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <p class="text-sm text-warning-foreground">
                <strong>Warning:</strong> This action will log you out of all devices
                and reset your workspace preferences.
              </p>
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction variant="destructive">
                Clear Cache
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Variant>

    <Variant title="Multiple Actions">
      <div class="flex items-center justify-center p-8">
        <AlertDialog>
          <AlertDialogTrigger variant="outline">
            <Icon icon="lucide:settings" class="w-4 h-4" />
            Project Settings
          </AlertDialogTrigger>
          <AlertDialogContent class="max-w-lg">
            <AlertDialogHeader>
              <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
              <AlertDialogDescription>
                You have unsaved changes in your project. What would you like to do?
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            <div class="my-4 space-y-3">
              <div class="p-3 border rounded-lg">
                <h4 class="text-sm font-medium">Modified Files:</h4>
                <ul class="mt-2 text-sm text-muted-foreground">
                  <li>• components/Button.vue</li>
                  <li>• components/Input.vue</li>
                  <li>• styles/globals.css</li>
                </ul>
              </div>
            </div>

            <AlertDialogFooter class="flex-col gap-2 sm:flex-col">
              <AlertDialogAction class="w-full">
                <Icon icon="lucide:save" class="w-4 h-4" />
                Save and Continue
              </AlertDialogAction>
              <div class="flex gap-2 w-full">
                <AlertDialogAction variant="destructive" class="flex-1">
                  <Icon icon="lucide:trash" class="w-4 h-4" />
                  Discard
                </AlertDialogAction>
                <AlertDialogCancel class="flex-1">
                  Cancel
                </AlertDialogCancel>
              </div>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Variant>
  </Story>
</template>