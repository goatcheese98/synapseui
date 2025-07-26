<!--
  Tooltip System Story
  Comprehensive showcase of all tooltip variants for data-centric applications
-->

<template>
  <Story title="Feedback/Tooltip System" :layout="{ type: 'single', iframe: false }">
    <Variant title="Advanced Tooltip System">
      <TooltipProvider>
        <div class="max-w-6xl mx-auto p-8 space-y-12">
          
          <!-- Header -->
          <div class="text-center space-y-4">
            <h1 class="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              💬 Tooltip Variations
            </h1>
            <p class="text-text-secondary text-lg">
              Professional tooltip variations with 70% opacity default and outline styling
            </p>
          </div>

          <!-- Basic Tooltips -->
          <section>
            <h2 class="text-2xl font-semibold mb-6">📝 Opacity Variations</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              <!-- Default Tooltip -->
              <Card class="p-6 text-center">
                <h3 class="font-medium mb-4">Default</h3>
                <TooltipRoot>
                  <TooltipTriggerReka as-child>
                    <Button>
                      Hover me
                    </Button>
                  </TooltipTriggerReka>
                  <TooltipPortal>
                    <TooltipContentPrimitive 
                      class="z-50 overflow-hidden rounded-md border-2 border-slate-300 bg-white/70 backdrop-blur-sm px-3 py-1.5 text-sm text-slate-800 shadow-lg animate-fade-in"
                      side="top"
                      :sideOffset="4"
                    >
                      Default tooltip
                    </TooltipContentPrimitive>
                  </TooltipPortal>
                </TooltipRoot>
              </Card>

              <!-- High Opacity -->
              <Card class="p-6 text-center">
                <h3 class="font-medium mb-4">High Opacity</h3>
                <TooltipRoot>
                  <TooltipTriggerReka as-child>
                    <Button variant="outline">
                      High Opacity
                    </Button>
                  </TooltipTriggerReka>
                  <TooltipPortal>
                    <TooltipContentPrimitive 
                      class="z-50 overflow-hidden rounded-md border-2 border-slate-400 bg-white/95 backdrop-blur-sm px-3 py-1.5 text-sm text-slate-900 shadow-xl animate-fade-in"
                      side="top"
                      :sideOffset="4"
                    >
                      95% opacity tooltip
                    </TooltipContentPrimitive>
                  </TooltipPortal>
                </TooltipRoot>
              </Card>

              <!-- Medium Opacity -->
              <Card class="p-6 text-center">
                <h3 class="font-medium mb-4">Medium Opacity</h3>
                <TooltipRoot>
                  <TooltipTriggerReka as-child>
                    <Button variant="secondary">
                      Medium
                    </Button>
                  </TooltipTriggerReka>
                  <TooltipPortal>
                    <TooltipContentPrimitive 
                      class="z-50 overflow-hidden rounded-md border-2 border-slate-300 bg-white/70 backdrop-blur-sm px-3 py-1.5 text-sm text-slate-800 shadow-lg animate-slide-in-from-bottom"
                      side="top"
                      :sideOffset="4"
                    >
                      70% opacity tooltip (default)
                    </TooltipContentPrimitive>
                  </TooltipPortal>
                </TooltipRoot>
              </Card>

              <!-- Low Opacity -->
              <Card class="p-6 text-center">
                <h3 class="font-medium mb-4">Low Opacity</h3>
                <TooltipRoot>
                  <TooltipTriggerReka as-child>
                    <Button variant="ghost">
                      Low Opacity
                    </Button>
                  </TooltipTriggerReka>
                  <TooltipPortal>
                    <TooltipContentPrimitive 
                      class="z-50 overflow-hidden rounded-md border border-slate-200 bg-white/40 backdrop-blur-sm px-3 py-1.5 text-sm text-slate-700 shadow-md animate-slide-in-from-top"
                      side="top"
                      :sideOffset="4"
                    >
                      40% opacity tooltip
                    </TooltipContentPrimitive>
                  </TooltipPortal>
                </TooltipRoot>
              </Card>
            </div>
          </section>

          <!-- Animation Variations -->
          <section>
            <h2 class="text-2xl font-semibold mb-6">🎬 Animation Styles</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              <!-- Fade In -->
              <Card class="p-6 text-center">
                <h3 class="font-medium mb-4">Fade In</h3>
                <TooltipRoot>
                  <TooltipTriggerReka as-child>
                    <Button variant="outline">
                      Fade
                    </Button>
                  </TooltipTriggerReka>
                  <TooltipPortal>
                    <TooltipContentPrimitive 
                      class="z-50 overflow-hidden rounded-lg border bg-popover px-4 py-2 text-sm text-popover-foreground shadow-lg animate-fade-in"
                      side="top"
                      :sideOffset="8"
                    >
                      Smooth fade animation
                    </TooltipContentPrimitive>
                  </TooltipPortal>
                </TooltipRoot>
              </Card>

              <!-- Zoom In -->
              <Card class="p-6 text-center">
                <h3 class="font-medium mb-4">Zoom In</h3>
                <TooltipRoot>
                  <TooltipTriggerReka as-child>
                    <Button variant="outline">
                      Zoom
                    </Button>
                  </TooltipTriggerReka>
                  <TooltipPortal>
                    <TooltipContentPrimitive 
                      class="z-50 overflow-hidden rounded-lg border bg-primary/10 text-primary px-4 py-2 text-sm shadow-lg animate-zoom-in"
                      side="top"
                      :sideOffset="8"
                    >
                      Zoom scale animation
                    </TooltipContentPrimitive>
                  </TooltipPortal>
                </TooltipRoot>
              </Card>

              <!-- Slide From Bottom -->
              <Card class="p-6 text-center">
                <h3 class="font-medium mb-4">Slide Up</h3>
                <TooltipRoot>
                  <TooltipTriggerReka as-child>
                    <Button variant="outline">
                      Slide Up
                    </Button>
                  </TooltipTriggerReka>
                  <TooltipPortal>
                    <TooltipContentPrimitive 
                      class="z-50 overflow-hidden rounded-lg border bg-success/10 text-success px-4 py-2 text-sm shadow-lg animate-slide-in-from-bottom"
                      side="top"
                      :sideOffset="8"
                    >
                      Slides up from bottom
                    </TooltipContentPrimitive>
                  </TooltipPortal>
                </TooltipRoot>
              </Card>

              <!-- Scale In -->
              <Card class="p-6 text-center">
                <h3 class="font-medium mb-4">Scale In</h3>
                <TooltipRoot>
                  <TooltipTriggerReka as-child>
                    <Button variant="outline">
                      Scale
                    </Button>
                  </TooltipTriggerReka>
                  <TooltipPortal>
                    <TooltipContentPrimitive 
                      class="z-50 overflow-hidden rounded-lg border bg-warning/10 text-warning px-4 py-2 text-sm shadow-lg animate-scale-in"
                      side="top"
                      :sideOffset="8"
                    >
                      Smooth scale animation
                    </TooltipContentPrimitive>
                  </TooltipPortal>
                </TooltipRoot>
              </Card>
            </div>
          </section>

          <!-- Style Variations -->
          <section>
            <h2 class="text-2xl font-semibold mb-6">🎨 Style Variations</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              <!-- Rounded -->
              <Card class="p-6 text-center">
                <h3 class="font-medium mb-4">Rounded</h3>
                <TooltipRoot>
                  <TooltipTriggerReka as-child>
                    <Button variant="outline">
                      Rounded
                    </Button>
                  </TooltipTriggerReka>
                  <TooltipPortal>
                    <TooltipContentPrimitive 
                      class="z-50 overflow-hidden rounded-full bg-slate-800 text-white px-4 py-2 text-sm shadow-lg animate-in fade-in-0 zoom-in-95"
                      side="top"
                      :sideOffset="8"
                    >
                      Fully rounded tooltip
                    </TooltipContentPrimitive>
                  </TooltipPortal>
                </TooltipRoot>
              </Card>

              <!-- Sharp -->
              <Card class="p-6 text-center">
                <h3 class="font-medium mb-4">Sharp</h3>
                <TooltipRoot>
                  <TooltipTriggerReka as-child>
                    <Button variant="outline">
                      Sharp
                    </Button>
                  </TooltipTriggerReka>
                  <TooltipPortal>
                    <TooltipContentPrimitive 
                      class="z-50 overflow-hidden bg-red-600 text-white px-4 py-2 text-sm shadow-lg animate-in fade-in-0 slide-in-from-bottom-1"
                      side="top"
                      :sideOffset="8"
                    >
                      No rounded corners
                    </TooltipContentPrimitive>
                  </TooltipPortal>
                </TooltipRoot>
              </Card>

              <!-- Gradient -->
              <Card class="p-6 text-center">
                <h3 class="font-medium mb-4">Gradient</h3>
                <TooltipRoot>
                  <TooltipTriggerReka as-child>
                    <Button variant="outline">
                      Gradient
                    </Button>
                  </TooltipTriggerReka>
                  <TooltipPortal>
                    <TooltipContentPrimitive 
                      class="z-50 overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 text-sm shadow-xl animate-zoom-in"
                      side="top"
                      :sideOffset="8"
                    >
                      Beautiful gradient background
                    </TooltipContentPrimitive>
                  </TooltipPortal>
                </TooltipRoot>
              </Card>

              <!-- Neon -->
              <Card class="p-6 text-center">
                <h3 class="font-medium mb-4">Neon</h3>
                <TooltipRoot>
                  <TooltipTriggerReka as-child>
                    <Button variant="outline">
                      Neon
                    </Button>
                  </TooltipTriggerReka>
                  <TooltipPortal>
                    <TooltipContentPrimitive 
                      class="z-50 overflow-hidden rounded-lg bg-black border-2 border-cyan-400 text-cyan-400 px-4 py-2 text-sm shadow-[0_0_20px_#22d3ee] animate-fade-in"
                      side="top"
                      :sideOffset="8"
                    >
                      Neon glow effect
                    </TooltipContentPrimitive>
                  </TooltipPortal>
                </TooltipRoot>
              </Card>
            </div>
          </section>

          <!-- Material Design Variations -->
          <section>
            <h2 class="text-2xl font-semibold mb-6">🎨 Material Design Variations</h2>
            <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
              
              <!-- Glass Material -->
              <Card class="p-6 text-center">
                <h3 class="font-medium mb-4">Glass</h3>
                <TooltipRoot>
                  <TooltipTriggerReka as-child>
                    <Button variant="outline">
                      Glass
                    </Button>
                  </TooltipTriggerReka>
                  <TooltipPortal>
                    <TooltipContentPrimitive 
                      class="z-50 overflow-hidden rounded-lg bg-white/70 backdrop-blur-md border-2 border-white/30 shadow-lg text-slate-800 px-4 py-2 text-sm animate-fade-in"
                      side="top"
                      :sideOffset="8"
                    >
                      Glassmorphism design
                    </TooltipContentPrimitive>
                  </TooltipPortal>
                </TooltipRoot>
              </Card>

              <!-- Paper Material -->
              <Card class="p-6 text-center">
                <h3 class="font-medium mb-4">Paper</h3>
                <TooltipRoot>
                  <TooltipTriggerReka as-child>
                    <Button variant="outline">
                      Paper
                    </Button>
                  </TooltipTriggerReka>
                  <TooltipPortal>
                    <TooltipContentPrimitive 
                      class="z-50 overflow-hidden rounded-lg bg-white border border-gray-200 drop-shadow-material-2 text-gray-900 px-4 py-2 text-sm animate-zoom-in"
                      side="top"
                      :sideOffset="8"
                    >
                      Clean paper material
                    </TooltipContentPrimitive>
                  </TooltipPortal>
                </TooltipRoot>
              </Card>

              <!-- Textured Material -->
              <Card class="p-6 text-center">
                <h3 class="font-medium mb-4">Textured</h3>
                <TooltipRoot>
                  <TooltipTriggerReka as-child>
                    <Button variant="outline">
                      Textured
                    </Button>
                  </TooltipTriggerReka>
                  <TooltipPortal>
                    <TooltipContentPrimitive 
                      class="z-50 overflow-hidden rounded-lg bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-sm border border-gray-300 drop-shadow-material-3 text-gray-800 px-4 py-2 text-sm animate-slide-in-from-bottom"
                      side="top"
                      :sideOffset="8"
                    >
                      Textured surface
                    </TooltipContentPrimitive>
                  </TooltipPortal>
                </TooltipRoot>
              </Card>

              <!-- Elevated Material -->
              <Card class="p-6 text-center">
                <h3 class="font-medium mb-4">Elevated</h3>
                <TooltipRoot>
                  <TooltipTriggerReka as-child>
                    <Button variant="outline">
                      Elevated
                    </Button>
                  </TooltipTriggerReka>
                  <TooltipPortal>
                    <TooltipContentPrimitive 
                      class="z-50 overflow-hidden rounded-lg bg-white border-0 drop-shadow-material-4 text-gray-900 px-4 py-2 text-sm animate-scale-in"
                      side="top"
                      :sideOffset="8"
                    >
                      High elevation shadow
                    </TooltipContentPrimitive>
                  </TooltipPortal>
                </TooltipRoot>
              </Card>

              <!-- Frosted Material -->
              <Card class="p-6 text-center">
                <h3 class="font-medium mb-4">Frosted</h3>
                <TooltipRoot>
                  <TooltipTriggerReka as-child>
                    <Button variant="outline">
                      Frosted
                    </Button>
                  </TooltipTriggerReka>
                  <TooltipPortal>
                    <TooltipContentPrimitive 
                      class="z-50 overflow-hidden rounded-lg bg-white/60 backdrop-blur-xl border border-white/40 drop-shadow-material-1 text-slate-700 px-4 py-2 text-sm animate-fade-in"
                      side="top"
                      :sideOffset="8"
                    >
                      Frosted glass effect
                    </TooltipContentPrimitive>
                  </TooltipPortal>
                </TooltipRoot>
              </Card>
            </div>
          </section>

          <!-- Size Variations -->
          <section>
            <h2 class="text-2xl font-semibold mb-6">📏 Size Variations</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              <!-- Small -->
              <Card class="p-6 text-center">
                <h3 class="font-medium mb-4">Small</h3>
                <TooltipRoot>
                  <TooltipTriggerReka as-child>
                    <Button variant="outline" size="sm">
                      Small
                    </Button>
                  </TooltipTriggerReka>
                  <TooltipPortal>
                    <TooltipContentPrimitive 
                      class="z-50 overflow-hidden rounded border bg-popover px-2 py-1 text-xs text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
                      side="top"
                      :sideOffset="4"
                    >
                      Small
                    </TooltipContentPrimitive>
                  </TooltipPortal>
                </TooltipRoot>
              </Card>

              <!-- Medium -->
              <Card class="p-6 text-center">
                <h3 class="font-medium mb-4">Medium</h3>
                <TooltipRoot>
                  <TooltipTriggerReka as-child>
                    <Button variant="outline">
                      Medium
                    </Button>
                  </TooltipTriggerReka>
                  <TooltipPortal>
                    <TooltipContentPrimitive 
                      class="z-50 overflow-hidden rounded-md border bg-popover px-3 py-2 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
                      side="top"
                      :sideOffset="6"
                    >
                      Medium sized tooltip
                    </TooltipContentPrimitive>
                  </TooltipPortal>
                </TooltipRoot>
              </Card>

              <!-- Large -->
              <Card class="p-6 text-center">
                <h3 class="font-medium mb-4">Large</h3>
                <TooltipRoot>
                  <TooltipTriggerReka as-child>
                    <Button variant="outline">
                      Large
                    </Button>
                  </TooltipTriggerReka>
                  <TooltipPortal>
                    <TooltipContentPrimitive 
                      class="z-50 overflow-hidden rounded-lg border bg-popover px-4 py-3 text-base text-popover-foreground shadow-lg animate-in fade-in-0 zoom-in-95"
                      side="top"
                      :sideOffset="8"
                    >
                      Large tooltip with more content
                    </TooltipContentPrimitive>
                  </TooltipPortal>
                </TooltipRoot>
              </Card>

              <!-- Extra Large -->
              <Card class="p-6 text-center">
                <h3 class="font-medium mb-4">Extra Large</h3>
                <TooltipRoot>
                  <TooltipTriggerReka as-child>
                    <Button variant="outline">
                      XL
                    </Button>
                  </TooltipTriggerReka>
                  <TooltipPortal>
                    <TooltipContentPrimitive 
                      class="z-50 max-w-sm overflow-hidden rounded-xl border bg-popover px-6 py-4 text-lg text-popover-foreground shadow-xl animate-in fade-in-0 zoom-in-95"
                      side="top"
                      :sideOffset="12"
                    >
                      <div class="space-y-2">
                        <div class="font-semibold">Extra Large Tooltip</div>
                        <div class="text-sm text-muted-foreground">
                          This tooltip has much more space for detailed information and content.
                        </div>
                      </div>
                    </TooltipContentPrimitive>
                  </TooltipPortal>
                </TooltipRoot>
              </Card>
            </div>
          </section>

          <!-- Timing Variations -->
          <section>
            <h2 class="text-2xl font-semibold mb-6">⏱️ Timing Variations</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              <!-- Instant -->
              <Card class="p-6 text-center">
                <h3 class="font-medium mb-4">Instant</h3>
                <TooltipRoot :delayDuration="0">
                  <TooltipTriggerReka as-child>
                    <Button variant="outline">
                      Instant
                    </Button>
                  </TooltipTriggerReka>
                  <TooltipPortal>
                    <TooltipContentPrimitive 
                      class="z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-fade-in-fast"
                      side="top"
                      :sideOffset="4"
                    >
                      No delay
                    </TooltipContentPrimitive>
                  </TooltipPortal>
                </TooltipRoot>
              </Card>

              <!-- Fast -->
              <Card class="p-6 text-center">
                <h3 class="font-medium mb-4">Fast</h3>
                <TooltipRoot :delayDuration="100">
                  <TooltipTriggerReka as-child>
                    <Button variant="outline">
                      Fast
                    </Button>
                  </TooltipTriggerReka>
                  <TooltipPortal>
                    <TooltipContentPrimitive 
                      class="z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-zoom-in-fast"
                      side="top"
                      :sideOffset="4"
                    >
                      100ms delay
                    </TooltipContentPrimitive>
                  </TooltipPortal>
                </TooltipRoot>
              </Card>

              <!-- Normal -->
              <Card class="p-6 text-center">
                <h3 class="font-medium mb-4">Normal</h3>
                <TooltipRoot :delayDuration="500">
                  <TooltipTriggerReka as-child>
                    <Button variant="outline">
                      Normal
                    </Button>
                  </TooltipTriggerReka>
                  <TooltipPortal>
                    <TooltipContentPrimitive 
                      class="z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 duration-300"
                      side="top"
                      :sideOffset="4"
                    >
                      500ms delay
                    </TooltipContentPrimitive>
                  </TooltipPortal>
                </TooltipRoot>
              </Card>

              <!-- Slow -->
              <Card class="p-6 text-center">
                <h3 class="font-medium mb-4">Slow</h3>
                <TooltipRoot :delayDuration="1000">
                  <TooltipTriggerReka as-child>
                    <Button variant="outline">
                      Slow
                    </Button>
                  </TooltipTriggerReka>
                  <TooltipPortal>
                    <TooltipContentPrimitive 
                      class="z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 duration-500"
                      side="top"
                      :sideOffset="4"
                    >
                      1 second delay
                    </TooltipContentPrimitive>
                  </TooltipPortal>
                </TooltipRoot>
              </Card>
            </div>
          </section>

          <!-- Progressive Tooltip System -->
          <section>
            <h2 class="text-2xl font-semibold mb-6">🔄 Progressive Tooltip System</h2>
            <p class="text-text-secondary mb-6 text-center">
              Two-stage tooltips: immediate basic info, then expanded details after 2.5 seconds
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <!-- User Profile Progressive -->
              <Card class="p-6 text-center">
                <h3 class="font-medium mb-4">User Profile</h3>
                <ProgressiveTooltip
                  title="John Smith"
                  description="Software Engineer"
                  material="glass"
                  :details-loader="loadUserDetails"
                >
                  <template #trigger>
                    <Button variant="outline">
                      <Icon name="user" class="w-4 h-4 mr-2" />
                      User Info
                    </Button>
                  </template>
                </ProgressiveTooltip>
              </Card>

              <!-- Server Status Progressive -->
              <Card class="p-6 text-center">
                <h3 class="font-medium mb-4">Server Status</h3>
                <ProgressiveTooltip
                  title="Server: prod-web-01"
                  description="Status: Online"
                  material="paper"
                  :details-loader="loadServerDetails"
                >
                  <template #trigger>
                    <Button variant="outline">
                      <Icon name="server" class="w-4 h-4 mr-2" />
                      Server Info
                    </Button>
                  </template>
                </ProgressiveTooltip>
              </Card>

              <!-- API Metrics Progressive -->
              <Card class="p-6 text-center">
                <h3 class="font-medium mb-4">API Metrics</h3>
                <ProgressiveTooltip
                  title="API Performance"
                  description="Last 24 hours"
                  material="elevated"
                  :details-loader="loadApiMetrics"
                >
                  <template #trigger>
                    <Button variant="outline">
                      <Icon name="activity" class="w-4 h-4 mr-2" />
                      API Stats
                    </Button>
                  </template>
                </ProgressiveTooltip>
              </Card>

              <!-- Database Info Progressive -->
              <Card class="p-6 text-center">
                <h3 class="font-medium mb-4">Database</h3>
                <ProgressiveTooltip
                  title="Primary Database"
                  description="PostgreSQL 14.2"
                  material="textured"
                  :details-loader="loadDatabaseDetails"
                >
                  <template #trigger>
                    <Button variant="outline">
                      <Icon name="database" class="w-4 h-4 mr-2" />
                      DB Info
                    </Button>
                  </template>
                </ProgressiveTooltip>
              </Card>

              <!-- System Resources Progressive -->
              <Card class="p-6 text-center">
                <h3 class="font-medium mb-4">System Resources</h3>
                <ProgressiveTooltip
                  title="Resource Usage"
                  description="Current system load"
                  material="frosted"
                  :details-loader="loadSystemResources"
                >
                  <template #trigger>
                    <Button variant="outline">
                      <Icon name="cpu" class="w-4 h-4 mr-2" />
                      Resources
                    </Button>
                  </template>
                </ProgressiveTooltip>
              </Card>

              <!-- Custom Data Progressive -->
              <Card class="p-6 text-center">
                <h3 class="font-medium mb-4">Custom Data</h3>
                <ProgressiveTooltip
                  title="Analytics Dashboard"
                  description="Real-time metrics"
                  material="glass"
                  :details-loader="loadCustomAnalytics"
                >
                  <template #trigger>
                    <Button variant="outline">
                      <Icon name="chart" class="w-4 h-4 mr-2" />
                      Analytics
                    </Button>
                  </template>
                  <template #detailed="{ data }">
                    <!-- Custom detailed content template -->
                    <div class="space-y-2">
                      <div class="text-xs font-medium text-current/90">Today's Highlights</div>
                      <div class="grid grid-cols-2 gap-2 text-xs">
                        <div v-for="(value, key) in data.highlights" :key="key" 
                             class="flex justify-between">
                          <span class="text-current/70">{{ key }}:</span>
                          <span class="font-medium">{{ value }}</span>
                        </div>
                      </div>
                      <div class="pt-2 border-t border-current/20">
                        <div class="text-xs text-current/80">{{ data.summary }}</div>
                      </div>
                    </div>
                  </template>
                </ProgressiveTooltip>
              </Card>
            </div>

            <!-- Progressive Tooltip Features -->
            <div class="mt-8 bg-muted p-6 rounded-lg">
              <h3 class="text-xl font-semibold mb-4">✨ Progressive Features</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 class="font-medium mb-2">Two-Stage System</h4>
                  <ul class="space-y-1 text-xs">
                    <li class="text-success">✓ Immediate basic information</li>
                    <li class="text-success">✓ 2.5s delay for detailed expansion</li>
                    <li class="text-success">✓ Smooth transition animations</li>
                    <li class="text-success">✓ Progressive loading simulation</li>
                    <li class="text-success">✓ Content caching for performance</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-medium mb-2">Perfect for Data Applications</h4>
                  <ul class="space-y-1 text-xs">
                    <li class="text-info">• API-intensive applications</li>
                    <li class="text-info">• Slow backend responses</li>
                    <li class="text-info">• Progressive data disclosure</li>
                    <li class="text-info">• User engagement optimization</li>
                    <li class="text-info">• Bandwidth-conscious design</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </TooltipProvider>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/utils'

// Direct Reka UI imports for basic tooltips
import { 
  TooltipRoot, 
  TooltipTrigger as TooltipTriggerReka, 
  TooltipContent as TooltipContentPrimitive, 
  TooltipPortal 
} from 'reka-ui'

// Our wrapper components
import Tooltip from '@/components/ui/tooltip/Tooltip.vue'
import TooltipTrigger from '@/components/ui/tooltip/TooltipTrigger.vue'
import TooltipContent from '@/components/ui/tooltip/TooltipContent.vue'
import TooltipProvider from '@/components/ui/tooltip/TooltipProvider.vue'

// Specialized tooltip components
import DataTooltip from '@/components/ui/tooltip/DataTooltip.vue'
import InteractiveTooltip from '@/components/ui/tooltip/InteractiveTooltip.vue'
import HelpTooltip from '@/components/ui/tooltip/HelpTooltip.vue'
import StatusTooltip from '@/components/ui/tooltip/StatusTooltip.vue'
import QuickActionsTooltip from '@/components/ui/tooltip/QuickActionsTooltip.vue'
import ProgressiveTooltip from '@/components/ui/tooltip/ProgressiveTooltip.vue'

// UI components
import Button from '@/components/ui/button/Button.vue'
import Card from '@/components/ui/card/Card.vue'
import Badge from '@/components/ui/badge/Badge.vue'
import Input from '@/components/ui/input/Input.vue'
import Label from '@/components/ui/label/Label.vue'
import Icon from '@/components/ui/icon/Icon.vue'

// State
const tooltipInteractions = ref(0)
const activeTooltipType = ref('')
const tooltipTypes = ref({})

// Track tooltip interactions
const trackTooltip = (type: string) => {
  tooltipInteractions.value++
  activeTooltipType.value = type
  tooltipTypes.value[type] = (tooltipTypes.value[type] || 0) + 1
  
  // Reset active type after a delay
  setTimeout(() => {
    if (activeTooltipType.value === type) {
      activeTooltipType.value = ''
    }
  }, 2000)
}

// Handle actions
const handleAction = (action: string) => {
  console.log('Action triggered:', action)
  // Add visual feedback or actual functionality here
}

// Progressive tooltip data loaders (simulate API calls)
const loadUserDetails = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200))
  
  return {
    stats: {
      'Experience': '5 years',
      'Projects': '47',
      'Team': 'Frontend',
      'Location': 'San Francisco'
    },
    description: 'Lead developer specializing in Vue.js and TypeScript. Currently working on the data visualization platform.',
    actions: [
      { label: 'Profile', handler: () => console.log('View profile') },
      { label: 'Message', handler: () => console.log('Send message') }
    ]
  }
}

const loadServerDetails = async () => {
  await new Promise(resolve => setTimeout(resolve, 900))
  
  return {
    stats: {
      'Uptime': '99.9%',
      'CPU': '23%',
      'Memory': '4.2GB',
      'Load': '0.8'
    },
    description: 'Primary web server handling production traffic. Last restart: 3 days ago.',
    actions: [
      { label: 'Logs', handler: () => console.log('View logs') },
      { label: 'Restart', handler: () => console.log('Restart server') }
    ]
  }
}

const loadApiMetrics = async () => {
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  return {
    stats: {
      'Requests': '142.3K',
      'Avg Response': '187ms',
      'Error Rate': '0.12%',
      'Uptime': '99.8%'
    },
    description: 'API performance metrics for the last 24 hours. Peak traffic occurred at 2 PM EST.',
    actions: [
      { label: 'Details', handler: () => console.log('View details') },
      { label: 'Alerts', handler: () => console.log('Configure alerts') }
    ]
  }
}

const loadDatabaseDetails = async () => {
  await new Promise(resolve => setTimeout(resolve, 800))
  
  return {
    stats: {
      'Connections': '45/100',
      'Size': '2.8TB',
      'Queries/sec': '1.2K',
      'Cache Hit': '94.2%'
    },
    description: 'Primary PostgreSQL database cluster. Automatic backups enabled.',
    actions: [
      { label: 'Query', handler: () => console.log('Open query tool') },
      { label: 'Backup', handler: () => console.log('Backup now') }
    ]
  }
}

const loadSystemResources = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return {
    stats: {
      'CPU': '31%',
      'Memory': '68%',
      'Disk': '42%',
      'Network': '156 Mbps'
    },
    description: 'System resources are within normal operating ranges. No alerts detected.',
    actions: [
      { label: 'Monitor', handler: () => console.log('Open monitoring') },
      { label: 'Scale', handler: () => console.log('Scale resources') }
    ]
  }
}

const loadCustomAnalytics = async () => {
  await new Promise(resolve => setTimeout(resolve, 1300))
  
  return {
    highlights: {
      'Sessions': '2.4K',
      'Conversion': '3.2%',
      'Revenue': '$12.5K',
      'Bounce Rate': '32%'
    },
    summary: 'Strong performance today with 15% increase in conversions compared to yesterday. Mobile traffic is up 22%.'
  }
}
</script>