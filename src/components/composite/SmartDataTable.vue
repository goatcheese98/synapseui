<template>
  <TableProvider 
    :variant="variant" 
    :size="size"
    :interactive="interactive"
  >
    <div :class="cn('rounded-md border', wrapperClasses)">
      <table :class="cn('w-full caption-bottom text-sm', tableClasses)">
        <!-- Header -->
        <thead v-if="showHeader" :class="headerClasses">
          <tr>
            <th 
              v-if="selectable"
              :class="cn('w-12 text-center', cellClasses)"
            >
              <SmartCheckbox 
                :checked="allSelected"
                :indeterminate="someSelected"
                @update:checked="(value) => handleSelectAll(value === true)"
              />
            </th>
            <th 
              v-for="column in columns"
              :key="column.key"
              :class="cn(
                'h-12 px-4 text-left align-middle font-medium text-muted-foreground',
                cellClasses,
                column.sortable && 'cursor-pointer hover:text-foreground',
                column.align === 'center' && 'text-center',
                column.align === 'right' && 'text-right'
              )"
              @click="column.sortable && handleSort(column.key)"
            >
              <div class="flex items-center gap-2">
                {{ column.title }}
                <Icon 
                  v-if="column.sortable"
                  :icon="getSortIcon(column.key)"
                  class="h-4 w-4"
                />
              </div>
            </th>
            <th v-if="hasActions" :class="cn('w-20 text-center', cellClasses)">
              Actions
            </th>
          </tr>
        </thead>

        <!-- Body -->
        <tbody :class="bodyClasses">
          <tr 
            v-for="(row, index) in paginatedData"
            :key="getRowKey(row, index)"
            :class="cn(
              'border-b transition-colors',
              interactive && 'hover:bg-muted/50 cursor-pointer',
              selectedRows.includes(getRowKey(row, index)) && 'bg-muted',
              rowClasses
            )"
            @click="interactive && handleRowClick(row, index)"
          >
            <!-- Selection checkbox -->
            <td v-if="selectable" :class="cn('text-center', cellClasses)">
              <SmartCheckbox 
                :checked="selectedRows.includes(getRowKey(row, index))"
                @update:checked="(value) => handleRowSelect(getRowKey(row, index), value === true)"
              />
            </td>

            <!-- Data cells -->
            <td 
              v-for="column in columns"
              :key="column.key"
              :class="cn(
                'px-4 py-3 align-middle',
                cellClasses,
                column.align === 'center' && 'text-center',
                column.align === 'right' && 'text-right'
              )"
            >
              <slot 
                :name="`cell-${column.key}`" 
                :row="row" 
                :column="column" 
                :value="row[column.key]"
                :index="index"
              >
                {{ formatCellValue(row[column.key], column) }}
              </slot>
            </td>

            <!-- Actions -->
            <td v-if="hasActions" :class="cn('text-center', cellClasses)">
              <slot 
                name="actions" 
                :row="row" 
                :index="index"
                :edit="() => handleEdit(row, index)"
                :delete="() => handleDelete(row, index)"
              >
                <div class="flex justify-center gap-1">
                  <UltraSmartButton 
                    size="icon-xs" 
                    variant="ghost"
                    @click.stop="handleEdit(row, index)"
                  >
                    <Icon icon="lucide:edit" class="h-3 w-3" />
                  </UltraSmartButton>
                  <UltraSmartButton 
                    size="icon-xs" 
                    variant="ghost"
                    @click.stop="handleDelete(row, index)"
                  >
                    <Icon icon="lucide:trash" class="h-3 w-3" />
                  </UltraSmartButton>
                </div>
              </slot>
            </td>
          </tr>

          <!-- Empty state -->
          <tr v-if="paginatedData.length === 0">
            <td :colspan="totalColumns" :class="cn('text-center py-8 text-muted-foreground', cellClasses)">
              <slot name="empty">
                <div class="flex flex-col items-center gap-2">
                  <Icon icon="lucide:inbox" class="h-8 w-8" />
                  <p>No data available</p>
                </div>
              </slot>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div v-if="paginated && totalPages > 1" :class="cn('flex items-center justify-between px-4 py-2 border-t', paginationClasses)">
        <div class="text-sm text-muted-foreground">
          Showing {{ (currentPage - 1) * pageSize + 1 }} to {{ Math.min(currentPage * pageSize, data.length) }} of {{ data.length }} results
        </div>
        <div class="flex gap-1">
          <UltraSmartButton 
            size="sm" 
            variant="outline"
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            Previous
          </UltraSmartButton>
          <UltraSmartButton 
            size="sm" 
            variant="outline"
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            Next
          </UltraSmartButton>
        </div>
      </div>
    </div>
  </TableProvider>
</template>

<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { cn } from '@/lib/utils'
import { 
  createTableContext, 
  TABLE_CONTEXT_KEY,
  type TableContext 
} from '@/composables/useComposition'
import UltraSmartButton from '@/components/ui/button/UltraSmartButton.vue'
import SmartCheckbox from '@/components/ui/checkbox/SmartCheckbox.vue'

export interface TableColumn {
  key: string
  title: string
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
  width?: string
  formatter?: (value: any) => string
}

export interface SmartDataTableProps {
  data: any[]
  columns: TableColumn[]
  variant?: TableContext['variant']
  size?: TableContext['size']
  interactive?: boolean
  selectable?: boolean
  showHeader?: boolean
  paginated?: boolean
  pageSize?: number
  // Styling
  wrapperClass?: string
  tableClass?: string
  // Features
  sortable?: boolean
  hasActions?: boolean
  rowKey?: string | ((row: any, index: number) => string)
}

interface Emits {
  (e: 'rowClick', row: any, index: number): void
  (e: 'rowSelect', selectedRows: string[]): void
  (e: 'sort', column: string, direction: 'asc' | 'desc'): void
  (e: 'edit', row: any, index: number): void
  (e: 'delete', row: any, index: number): void
}

const props = withDefaults(defineProps<SmartDataTableProps>(), {
  variant: 'default',
  size: 'md',
  interactive: false,
  selectable: false,
  showHeader: true,
  paginated: false,
  pageSize: 10,
  sortable: true,
  hasActions: false,
  rowKey: 'id'
})

const emit = defineEmits<Emits>()

// Table state
const selectedRows = ref<string[]>([])
const sortColumn = ref<string>('')
const sortDirection = ref<'asc' | 'desc'>('asc')
const currentPage = ref(1)

// Computed properties
const totalColumns = computed(() => {
  let count = props.columns.length
  if (props.selectable) count++
  if (props.hasActions) count++
  return count
})

const totalPages = computed(() => 
  props.paginated ? Math.ceil(props.data.length / props.pageSize) : 1
)

// Selection logic
const allSelected = computed(() => 
  props.data.length > 0 && selectedRows.value.length === props.data.length
)

const someSelected = computed(() => 
  selectedRows.value.length > 0 && selectedRows.value.length < props.data.length
)

// Data processing
const sortedData = computed(() => {
  if (!sortColumn.value) return props.data
  
  return [...props.data].sort((a, b) => {
    const aVal = a[sortColumn.value]
    const bVal = b[sortColumn.value]
    
    if (aVal < bVal) return sortDirection.value === 'asc' ? -1 : 1
    if (aVal > bVal) return sortDirection.value === 'asc' ? 1 : -1
    return 0
  })
})

const paginatedData = computed(() => {
  if (!props.paginated) return sortedData.value
  
  const start = (currentPage.value - 1) * props.pageSize
  const end = start + props.pageSize
  return sortedData.value.slice(start, end)
})

// Styling
const wrapperClasses = computed(() => {
  const contexts = createTableContext(props.variant, props.size, props.interactive)
  return cn(
    contexts.value.density === 'compact' ? 'text-xs' : contexts.value.density === 'spacious' ? 'text-base' : 'text-sm'
  )
})

const tableClasses = computed(() => {
  const variantClasses = {
    default: '',
    bordered: 'border-separate border-spacing-0',
    striped: '',
    compact: ''
  }
  
  return variantClasses[props.variant]
})

const headerClasses = computed(() => {
  return cn(
    '[&_tr]:border-b',
    props.variant === 'striped' && 'bg-muted/50'
  )
})

const bodyClasses = computed(() => {
  return cn(
    '[&_tr:last-child]:border-0',
    props.variant === 'striped' && '[&_tr:nth-child(even)]:bg-muted/50'
  )
})

const cellClasses = computed(() => {
  const sizeClasses = {
    sm: 'h-8 px-2',
    md: 'h-10 px-4',
    lg: 'h-12 px-6'
  }
  
  return sizeClasses[props.size]
})

const rowClasses = computed(() => {
  return cn(
    props.variant === 'bordered' && 'border border-border'
  )
})

const paginationClasses = computed(() => {
  return cn(
    'bg-background',
    props.size === 'sm' ? 'text-xs' : 'text-sm'
  )
})

// Helper functions
const getRowKey = (row: any, index: number): string => {
  if (typeof props.rowKey === 'function') {
    return props.rowKey(row, index)
  }
  return row[props.rowKey] || index.toString()
}

const formatCellValue = (value: any, column: TableColumn): string => {
  if (column.formatter) {
    return column.formatter(value)
  }
  return value?.toString() || ''
}

const getSortIcon = (columnKey: string): string => {
  if (sortColumn.value !== columnKey) return 'lucide:chevrons-up-down'
  return sortDirection.value === 'asc' ? 'lucide:chevron-up' : 'lucide:chevron-down'
}

// Event handlers
const handleSort = (columnKey: string) => {
  if (sortColumn.value === columnKey) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = columnKey
    sortDirection.value = 'asc'
  }
  
  emit('sort', columnKey, sortDirection.value)
}

const handleRowClick = (row: any, index: number) => {
  emit('rowClick', row, index)
}

const handleSelectAll = (checked: boolean) => {
  if (checked) {
    selectedRows.value = props.data.map((row, index) => getRowKey(row, index))
  } else {
    selectedRows.value = []
  }
  emit('rowSelect', selectedRows.value)
}

const handleRowSelect = (rowKey: string, checked: boolean) => {
  if (checked) {
    selectedRows.value.push(rowKey)
  } else {
    selectedRows.value = selectedRows.value.filter(key => key !== rowKey)
  }
  emit('rowSelect', selectedRows.value)
}

const handleEdit = (row: any, index: number) => {
  emit('edit', row, index)
}

const handleDelete = (row: any, index: number) => {
  emit('delete', row, index)
}

// Create and provide table context
const tableContext = createTableContext(props.variant, props.size, props.interactive)
provide(TABLE_CONTEXT_KEY, tableContext)

// Table Provider component
const TableProvider = {
  props: ['variant', 'size', 'interactive'],
  setup(props: any, { slots }: any) {
    const tableContext = createTableContext(props.variant, props.size, props.interactive)
    provide(TABLE_CONTEXT_KEY, tableContext)
    return () => slots.default()
  }
}

// Expose table methods
defineExpose({
  selectedRows: computed(() => selectedRows.value),
  clearSelection: () => selectedRows.value = [],
  selectAll: () => handleSelectAll(true),
  getCurrentPage: () => currentPage.value,
  goToPage: (page: number) => currentPage.value = Math.max(1, Math.min(page, totalPages.value))
})
</script>