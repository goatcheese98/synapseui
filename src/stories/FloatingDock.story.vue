<script setup lang="ts">
import { FloatingDock } from '@/components/patterns/floating-dock'
</script>

<template>
  <Story title="Patterns/FloatingDock">
    <!-- Default Dock -->
    <Variant title="Default">
      <template #default>
        <div class="h-96 relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg overflow-hidden">
          <FloatingDock>
            <template #icon>
              📊
            </template>
            Dashboard
          </FloatingDock>
        </div>
      </template>
    </Variant>

    <!-- Size Variants -->
    <Variant title="Sizes">
      <template #default>
        <div class="h-96 relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg overflow-hidden">
          <FloatingDock size="sm" position="top">
            <template #icon>🔍</template>
            Small
          </FloatingDock>
          
          <FloatingDock size="md" position="bottom">
            <template #icon>📁</template>
            Medium
          </FloatingDock>
          
          <FloatingDock size="lg" position="left">
            <template #icon>⚙️</template>
            Large
          </FloatingDock>
        </div>
      </template>
    </Variant>

    <!-- Position Variants -->
    <Variant title="Positions">
      <template #default>
        <div class="h-96 relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg overflow-hidden">
          <FloatingDock position="top">
            <template #icon>⬆️</template>
            Top
          </FloatingDock>
          
          <FloatingDock position="bottom">
            <template #icon>⬇️</template>
            Bottom
          </FloatingDock>
          
          <FloatingDock position="left">
            <template #icon>⬅️</template>
            Left
          </FloatingDock>
          
          <FloatingDock position="right">
            <template #icon>➡️</template>
            Right
          </FloatingDock>
        </div>
      </template>
    </Variant>

    <!-- Style Variants -->
    <Variant title="Styles">
      <template #default>
        <div class="h-96 relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg overflow-hidden">
          <FloatingDock variant="default" position="top">
            <template #icon>🎨</template>
            Default
          </FloatingDock>
          
          <FloatingDock variant="compact" style="bottom: 120px;">
            <template #icon>📦</template>
            Compact
          </FloatingDock>
          
          <FloatingDock variant="minimal" position="left">
            <template #icon>✨</template>
            Minimal
          </FloatingDock>
        </div>
      </template>
    </Variant>
  </Story>
</template>