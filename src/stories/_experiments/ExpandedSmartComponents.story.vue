<template>
  <Story
    title="System/Expanded Smart Components"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="Complete Smart Component Ecosystem">
      <div class="p-8 space-y-12">
        <!-- Smart Form Demo -->
        <section>
          <h2 class="text-2xl font-bold mb-6">
            🧠 Smart Form with Context Propagation
          </h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Success Form -->
            <SmartForm 
              size="md" 
              layout="vertical"
              :auto-validate="true"
              @submit="handleFormSubmit"
              @validate="handleFormValidate"
            >
              <InterconnectedCard
                variant="success"
                size="md"
              >
                <CardHeader>
                  <CardTitle>User Registration (Success State)</CardTitle>
                  <CardDescription>All form controls automatically adapt to success context</CardDescription>
                </CardHeader>
                <CardContent class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium mb-1">Name</label>
                    <SmartInput 
                      v-model="formData.name"
                      placeholder="Enter your name"
                      :is-valid="!!formData.name"
                      :touched="true"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-1">Email</label>
                    <SmartInput 
                      v-model="formData.email"
                      type="email"
                      placeholder="Enter your email"
                      :is-valid="!!formData.email"
                      :touched="true"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-1">Country</label>
                    <SmartSelect 
                      v-model="formData.country"
                      placeholder="Select your country"
                      :is-success="!!formData.country"
                    >
                      <SmartSelectItem value="us">
                        United States
                      </SmartSelectItem>
                      <SmartSelectItem value="ca">
                        Canada
                      </SmartSelectItem>
                      <SmartSelectItem value="uk">
                        United Kingdom
                      </SmartSelectItem>
                    </SmartSelect>
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-1">Bio</label>
                    <SmartTextarea 
                      v-model="formData.bio"
                      placeholder="Tell us about yourself"
                      :auto-resize="true"
                      :max-rows="6"
                    />
                  </div>
                  <div>
                    <SmartCheckbox 
                      v-model="formData.terms"
                      label="I agree to the terms and conditions"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <UltraSmartButton
                    type="submit"
                    intelligence="full"
                  >
                    Register
                  </UltraSmartButton>
                  <UltraSmartButton
                    variant="outline"
                    intelligence="full"
                  >
                    Cancel
                  </UltraSmartButton>
                </CardFooter>
              </InterconnectedCard>
            </SmartForm>

            <!-- Error Form -->
            <SmartForm 
              size="md" 
              layout="vertical"
              :auto-validate="true"
            >
              <InterconnectedCard
                variant="error"
                size="md"
              >
                <CardHeader>
                  <CardTitle>Contact Form (Error State)</CardTitle>
                  <CardDescription>Watch how error states propagate through all components</CardDescription>
                </CardHeader>
                <CardContent class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium mb-1">Subject</label>
                    <SmartInput 
                      placeholder="Enter subject"
                      :has-error="true"
                      error-message="Subject is required"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-1">Priority</label>
                    <SmartSelect 
                      placeholder="Select priority"
                      :is-error="true"
                    >
                      <SmartSelectItem value="low">
                        Low
                      </SmartSelectItem>
                      <SmartSelectItem value="medium">
                        Medium
                      </SmartSelectItem>
                      <SmartSelectItem value="high">
                        High
                      </SmartSelectItem>
                    </SmartSelect>
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-1">Message</label>
                    <SmartTextarea 
                      placeholder="Describe your issue"
                      :has-error="true"
                      error-message="Message cannot be empty"
                    />
                  </div>
                  <div>
                    <SmartCheckbox 
                      label="Send me a copy"
                      :has-error="true"
                      error-message="Please confirm email preferences"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <UltraSmartButton
                    type="submit"
                    intelligence="full"
                  >
                    Send Message
                  </UltraSmartButton>
                </CardFooter>
              </InterconnectedCard>
            </SmartForm>
          </div>
        </section>

        <!-- Smart Dialog Demo -->
        <section>
          <h2 class="text-2xl font-bold mb-6">
            💬 Smart Dialogs with Context
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <UltraSmartButton @click="showDialog('default')">
              Default Dialog
            </UltraSmartButton>
            <UltraSmartButton
              variant="error"
              @click="showDialog('destructive')"
            >
              Destructive Dialog
            </UltraSmartButton>
            <UltraSmartButton
              variant="warning"
              @click="showDialog('warning')"
            >
              Warning Dialog
            </UltraSmartButton>
            <UltraSmartButton
              variant="success"
              @click="showDialog('success')"
            >
              Success Dialog
            </UltraSmartButton>
          </div>

          <!-- The dialogs -->
          <SmartDialog
            v-model:open="dialogs.default"
            variant="default"
            title="Default Dialog"
            description="This is a default dialog with context-aware components."
            @confirm="handleDialogConfirm('default')"
          >
            <div class="space-y-4">
              <SmartInput placeholder="Type something..." />
              <SmartSelect placeholder="Choose option">
                <SmartSelectItem value="1">
                  Option 1
                </SmartSelectItem>
                <SmartSelectItem value="2">
                  Option 2
                </SmartSelectItem>
              </SmartSelect>
            </div>
          </SmartDialog>

          <SmartDialog
            v-model:open="dialogs.destructive"
            variant="destructive"
            title="Delete Confirmation"
            description="This action cannot be undone. All components adapt to the destructive context."
            confirm-text="Delete"
            @confirm="handleDialogConfirm('destructive')"
          >
            <div class="space-y-4">
              <SmartInput placeholder="Type 'DELETE' to confirm" />
              <SmartCheckbox label="I understand this action is irreversible" />
            </div>
          </SmartDialog>

          <SmartDialog
            v-model:open="dialogs.warning"
            variant="warning"
            title="Warning"
            description="Please review the information before proceeding."
            @confirm="handleDialogConfirm('warning')"
          >
            <SmartTextarea placeholder="Add a note about this warning..." />
          </SmartDialog>

          <SmartDialog
            v-model:open="dialogs.success"
            variant="success"
            title="Success!"
            description="Operation completed successfully."
            confirm-text="Continue"
            :show-cancel="false"
            @confirm="handleDialogConfirm('success')"
          >
            <div class="text-center py-4">
              <Icon
                icon="lucide:check-circle"
                class="h-16 w-16 text-green-500 mx-auto mb-4"
              />
              <p>All components inside this dialog are success-themed!</p>
            </div>
          </SmartDialog>
        </section>

        <!-- Smart Data Table Demo -->
        <section>
          <h2 class="text-2xl font-bold mb-6">
            📊 Smart Data Table with Intelligence
          </h2>
          
          <div class="space-y-6">
            <!-- Table Controls -->
            <InterconnectedCard
              variant="muted"
              size="sm"
            >
              <CardContent class="flex items-center justify-between py-4">
                <div class="flex items-center gap-4">
                  <SmartSelect
                    v-model="tableVariant"
                    placeholder="Table Style"
                  >
                    <SmartSelectItem value="default">
                      Default
                    </SmartSelectItem>
                    <SmartSelectItem value="striped">
                      Striped
                    </SmartSelectItem>
                    <SmartSelectItem value="bordered">
                      Bordered
                    </SmartSelectItem>
                    <SmartSelectItem value="compact">
                      Compact
                    </SmartSelectItem>
                  </SmartSelect>
                  <SmartSelect
                    v-model="tableSize"
                    placeholder="Size"
                  >
                    <SmartSelectItem value="sm">
                      Small
                    </SmartSelectItem>
                    <SmartSelectItem value="md">
                      Medium
                    </SmartSelectItem>
                    <SmartSelectItem value="lg">
                      Large
                    </SmartSelectItem>
                  </SmartSelect>
                </div>
                <div class="flex items-center gap-2">
                  <SmartCheckbox
                    v-model="tableInteractive"
                    label="Interactive"
                  />
                  <SmartCheckbox
                    v-model="tableSelectable"
                    label="Selectable"
                  />
                </div>
              </CardContent>
            </InterconnectedCard>

            <!-- The Table -->
            <SmartDataTable
              :data="tableData"
              :columns="tableColumns"
              :variant="tableVariant"
              :size="tableSize"
              :interactive="tableInteractive"
              :selectable="tableSelectable"
              :has-actions="true"
              :paginated="true"
              :page-size="5"
              @row-click="handleRowClick"
              @edit="handleEdit"
              @delete="handleDelete"
            >
              <template #cell-status="{ value }">
                <span
                  :class="cn(
                    'px-2 py-1 rounded-full text-xs font-medium',
                    value === 'active' ? 'bg-green-100 text-green-800' :
                    value === 'inactive' ? 'bg-gray-100 text-gray-800' :
                    'bg-red-100 text-red-800'
                  )"
                >
                  {{ value }}
                </span>
              </template>
            </SmartDataTable>
          </div>
        </section>

        <!-- Intelligence Showcase -->
        <section>
          <h2 class="text-2xl font-bold mb-6">
            🎯 Intelligence Level Demonstration
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InterconnectedCard
              variant="primary"
              size="md"
            >
              <CardHeader>
                <CardTitle>No Intelligence</CardTitle>
                <CardDescription>Manual control, no adaptation</CardDescription>
              </CardHeader>
              <CardContent class="space-y-3">
                <UltraSmartButton
                  intelligence="none"
                  variant="error"
                >
                  Stays Error (ignores card context)
                </UltraSmartButton>
                <SmartInput
                  intelligence="none"
                  variant="warning"
                  placeholder="Stays warning"
                />
                <SmartCheckbox
                  intelligence="none"
                  variant="error"
                  label="Stays error"
                />
              </CardContent>
            </InterconnectedCard>

            <InterconnectedCard
              variant="primary"
              size="md"
            >
              <CardHeader>
                <CardTitle>Basic Intelligence</CardTitle>
                <CardDescription>Adapts to immediate parent only</CardDescription>
              </CardHeader>
              <CardContent class="space-y-3">
                <UltraSmartButton intelligence="basic">
                  Becomes Accent (card context)
                </UltraSmartButton>
                <SmartInput
                  intelligence="basic"
                  placeholder="Adapts to card"
                />
                <SmartCheckbox
                  intelligence="basic"
                  label="Adapts to card"
                />
              </CardContent>
            </InterconnectedCard>

            <InterconnectedCard
              variant="primary"
              size="md"
            >
              <CardHeader>
                <CardTitle>Full Intelligence</CardTitle>
                <CardDescription>Multi-context awareness with priority</CardDescription>
              </CardHeader>
              <CardContent class="space-y-3">
                <UltraSmartButton intelligence="full">
                  Smart Multi-Context
                </UltraSmartButton>
                <SmartInput
                  intelligence="full"
                  placeholder="Full intelligence"
                />
                <SmartCheckbox
                  intelligence="full"
                  label="Full intelligence"
                />
              </CardContent>
            </InterconnectedCard>
          </div>
        </section>
      </div>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { cn } from '@/lib/utils'

// Import all the smart components
import SmartForm from '@/components/composite/SmartForm.vue'
import SmartDialog from '@/components/composite/SmartDialog.vue'
import SmartDataTable from '@/components/composite/SmartDataTable.vue'
import InterconnectedCard from '@/components/ui/card/InterconnectedCard.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import CardFooter from '@/components/ui/card/CardFooter.vue'
import CardTitle from '@/components/ui/card/CardTitle.vue'
import CardDescription from '@/components/ui/card/CardDescription.vue'
import UltraSmartButton from '@/components/ui/button/BaseButton.vue'
import SmartInput from '@/components/ui/input/SmartInput.vue'
import SmartSelect from '@/components/ui/select/SmartSelect.vue'
import SmartSelectItem from '@/components/ui/select/SmartSelectItem.vue'
import SmartTextarea from '@/components/ui/textarea/SmartTextarea.vue'
import SmartCheckbox from '@/components/ui/checkbox/SmartCheckbox.vue'

// Form data
const formData = ref({
  name: 'John Doe',
  email: 'john@example.com',
  country: 'us',
  bio: 'Software developer passionate about UI/UX',
  terms: true
})

// Dialog states
const dialogs = ref({
  default: false,
  destructive: false,
  warning: false,
  success: false
})

// Table data and configuration
const tableVariant = ref('default')
const tableSize = ref('md')
const tableInteractive = ref(true)
const tableSelectable = ref(true)

const tableColumns = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'email', title: 'Email', sortable: true },
  { key: 'role', title: 'Role', sortable: true },
  { key: 'status', title: 'Status', sortable: true, align: 'center' }
]

const tableData = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator', status: 'inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'suspended' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'active' },
  { id: 6, name: 'Diana Prince', email: 'diana@example.com', role: 'User', status: 'active' },
  { id: 7, name: 'Edward Norton', email: 'edward@example.com', role: 'Moderator', status: 'inactive' }
])

// Event handlers
const handleFormSubmit = (event: Event, formData: FormData) => {
  console.log('Form submitted:', Object.fromEntries(formData))
}

const handleFormValidate = (isValid: boolean, errors: Record<string, string>) => {
  console.log('Form validation:', { isValid, errors })
}

const showDialog = (type: keyof typeof dialogs.value) => {
  dialogs.value[type] = true
}

const handleDialogConfirm = (type: string) => {
  console.log(`${type} dialog confirmed`)
  dialogs.value[type as keyof typeof dialogs.value] = false
}

const handleRowClick = (row: any, index: number) => {
  console.log('Row clicked:', row)
}

const handleEdit = (row: any, index: number) => {
  console.log('Edit:', row)
}

const handleDelete = (row: any, index: number) => {
  console.log('Delete:', row)
}
</script>