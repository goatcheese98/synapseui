<!--
  Progressive Tooltip Demo Story
  Dedicated showcase for the two-stage progressive tooltip system
-->

<template>
  <Story title="Advanced/Progressive Tooltips" :layout="{ type: 'single', iframe: false }">
    <Variant title="Two-Stage Progressive System">
      <TooltipProvider>
        <div class="max-w-6xl mx-auto p-8 space-y-12">
          
          <!-- Header -->
          <div class="text-center space-y-4">
            <h1 class="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              🔄 Progressive Tooltip System
            </h1>
            <p class="text-text-secondary text-lg max-w-2xl mx-auto">
              Revolutionary two-stage tooltip system designed for data-centric applications. 
              Shows immediate info, then progressively loads detailed content after user engagement.
            </p>
          </div>

          <!-- How It Works -->
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
            <h2 class="text-xl font-semibold mb-4 text-center">⚡ How It Works</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div class="space-y-2">
                <div class="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto font-bold">1</div>
                <h3 class="font-medium">Immediate Display</h3>
                <p class="text-sm text-gray-600">Basic tooltip appears instantly on hover with essential information</p>
              </div>
              <div class="space-y-2">
                <div class="w-12 h-12 bg-indigo-500 text-white rounded-full flex items-center justify-center mx-auto font-bold">2</div>
                <h3 class="font-medium">Progressive Loading</h3>
                <p class="text-sm text-gray-600">After 2.5s, tooltip expands and loads detailed data from API</p>
              </div>
              <div class="space-y-2">
                <div class="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto font-bold">3</div>
                <h3 class="font-medium">Rich Content</h3>
                <p class="text-sm text-gray-600">Displays comprehensive data with actions and interactive elements</p>
              </div>
            </div>
          </div>

          <!-- Live Demo Section -->
          <section>
            <h2 class="text-2xl font-semibold mb-6 text-center">🎯 Live Demo - Hover and Wait</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <!-- Real-time Metrics -->
              <Card class="p-6 text-center bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <div class="mb-4">
                  <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Icon name="activity" class="w-8 h-8 text-white" />
                  </div>
                  <h3 class="font-semibold">System Metrics</h3>
                </div>
                
                <ProgressiveTooltip
                  title="Live System Status"
                  description="Real-time monitoring"
                  material="glass"
                  :details-loader="loadLiveMetrics"
                  :expand-delay="2000"
                >
                  <template #trigger>
                    <Button class="bg-green-600 hover:bg-green-700 text-white">
                      <Icon name="server" class="w-4 h-4 mr-2" />
                      Check Status
                    </Button>
                  </template>
                </ProgressiveTooltip>
              </Card>

              <!-- User Analytics -->
              <Card class="p-6 text-center bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                <div class="mb-4">
                  <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Icon name="users" class="w-8 h-8 text-white" />
                  </div>
                  <h3 class="font-semibold">User Analytics</h3>
                </div>
                
                <ProgressiveTooltip
                  title="User Engagement"
                  description="Current session data"
                  material="paper"
                  :details-loader="loadUserAnalytics"
                  :expand-delay="2500"
                >
                  <template #trigger>
                    <Button class="bg-blue-600 hover:bg-blue-700 text-white">
                      <Icon name="chart" class="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                  </template>
                </ProgressiveTooltip>
              </Card>

              <!-- API Performance -->
              <Card class="p-6 text-center bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
                <div class="mb-4">
                  <div class="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Icon name="zap" class="w-8 h-8 text-white" />
                  </div>
                  <h3 class="font-semibold">API Performance</h3>
                </div>
                
                <ProgressiveTooltip
                  title="API Health Check"
                  description="Endpoint monitoring"
                  material="elevated"
                  :details-loader="loadApiPerformance"
                  :expand-delay="3000"
                >
                  <template #trigger>
                    <Button class="bg-purple-600 hover:bg-purple-700 text-white">
                      <Icon name="activity" class="w-4 h-4 mr-2" />
                      API Status
                    </Button>
                  </template>
                </ProgressiveTooltip>
              </Card>

              <!-- Database Stats -->
              <Card class="p-6 text-center bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
                <div class="mb-4">
                  <div class="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Icon name="database" class="w-8 h-8 text-white" />
                  </div>
                  <h3 class="font-semibold">Database Health</h3>
                </div>
                
                <ProgressiveTooltip
                  title="Database Cluster"
                  description="Connection pool status"
                  material="textured"
                  :details-loader="loadDatabaseStats"
                  :expand-delay="2200"
                >
                  <template #trigger>
                    <Button class="bg-orange-600 hover:bg-orange-700 text-white">
                      <Icon name="database" class="w-4 h-4 mr-2" />
                      DB Status
                    </Button>
                  </template>
                </ProgressiveTooltip>
              </Card>

              <!-- Security Alerts -->
              <Card class="p-6 text-center bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
                <div class="mb-4">
                  <div class="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Icon name="shield" class="w-8 h-8 text-white" />
                  </div>
                  <h3 class="font-semibold">Security Monitor</h3>
                </div>
                
                <ProgressiveTooltip
                  title="Security Status"
                  description="Threat monitoring"
                  material="frosted"
                  :details-loader="loadSecurityAlerts"
                  :expand-delay="1800"
                >
                  <template #trigger>
                    <Button class="bg-red-600 hover:bg-red-700 text-white">
                      <Icon name="shield" class="w-4 h-4 mr-2" />
                      Security
                    </Button>
                  </template>
                </ProgressiveTooltip>
              </Card>

              <!-- Custom Integration -->
              <Card class="p-6 text-center bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
                <div class="mb-4">
                  <div class="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Icon name="code" class="w-8 h-8 text-white" />
                  </div>
                  <h3 class="font-semibold">Custom Integration</h3>
                </div>
                
                <ProgressiveTooltip
                  title="Integration Status"
                  description="Third-party services"
                  material="glass"
                  :details-loader="loadIntegrationStatus"
                  :expand-delay="2800"
                >
                  <template #trigger>
                    <Button class="bg-teal-600 hover:bg-teal-700 text-white">
                      <Icon name="code" class="w-4 h-4 mr-2" />
                      Integrations
                    </Button>
                  </template>
                  <template #detailed="{ data }">
                    <!-- Custom template for integration data -->
                    <div class="space-y-3">
                      <div class="text-xs font-medium text-current/90">Service Status</div>
                      <div class="space-y-1">
                        <div v-for="service in data.services" :key="service.name" 
                             class="flex items-center justify-between text-xs">
                          <span class="flex items-center">
                            <div :class="[
                              'w-2 h-2 rounded-full mr-2',
                              service.status === 'online' ? 'bg-green-400' :
                              service.status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                            ]"></div>
                            {{ service.name }}
                          </span>
                          <span class="font-medium">{{ service.uptime }}</span>
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
          </section>

          <!-- Material Variations -->
          <section>
            <h2 class="text-2xl font-semibold mb-6 text-center">🎨 Material Design Variations</h2>
            <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
              
              <div v-for="material in materials" :key="material.name">
                <Card class="p-4 text-center">
                  <h3 class="font-medium mb-3 text-sm">{{ material.name }}</h3>
                  <ProgressiveTooltip
                    :title="`${material.name} Material`"
                    :description="material.description"
                    :material="material.key"
                    :details-loader="() => loadMaterialDemo(material.name)"
                  >
                    <template #trigger>
                      <Button variant="outline" size="sm">
                        Test {{ material.name }}
                      </Button>
                    </template>
                  </ProgressiveTooltip>
                </Card>
              </div>
            </div>
          </section>

          <!-- Technical Benefits -->
          <div class="bg-slate-50 p-8 rounded-xl">
            <h2 class="text-2xl font-semibold mb-6 text-center">🚀 Technical Benefits</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div class="space-y-3">
                <h3 class="font-semibold text-lg flex items-center">
                  <Icon name="zap" class="w-5 h-5 mr-2 text-yellow-500" />
                  Performance Optimized
                </h3>
                <ul class="space-y-1 text-sm text-gray-600">
                  <li>• Lazy loading of detailed content</li>
                  <li>• Content caching for repeat views</li>
                  <li>• Debounced API calls</li>
                  <li>• Minimal initial bundle size</li>
                </ul>
              </div>
              
              <div class="space-y-3">
                <h3 class="font-semibold text-lg flex items-center">
                  <Icon name="users" class="w-5 h-5 mr-2 text-blue-500" />
                  User Experience
                </h3>
                <ul class="space-y-1 text-sm text-gray-600">
                  <li>• Immediate visual feedback</li>
                  <li>• Progressive information disclosure</li>
                  <li>• Smooth, non-blocking animations</li>
                  <li>• Contextual loading states</li>
                </ul>
              </div>
              
              <div class="space-y-3">
                <h3 class="font-semibold text-lg flex items-center">
                  <Icon name="code" class="w-5 h-5 mr-2 text-green-500" />
                  Developer Friendly
                </h3>
                <ul class="space-y-1 text-sm text-gray-600">
                  <li>• Simple async data loader API</li>
                  <li>• Custom template slots</li>
                  <li>• TypeScript support</li>
                  <li>• Configurable timing and materials</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Component imports
import ProgressiveTooltip from '@/components/ui/tooltip/ProgressiveTooltip.vue'
import TooltipProvider from '@/components/ui/tooltip/TooltipProvider.vue'
import Button from '@/components/ui/button/Button.vue'
import Card from '@/components/ui/card/Card.vue'
import Icon from '@/components/ui/icon/Icon.vue'

// Material variations for demo
const materials = ref([
  { name: 'Glass', key: 'glass', description: 'Glassmorphism effect' },
  { name: 'Paper', key: 'paper', description: 'Clean material design' },
  { name: 'Textured', key: 'textured', description: 'Subtle texture' },
  { name: 'Elevated', key: 'elevated', description: 'High shadow' },
  { name: 'Frosted', key: 'frosted', description: 'Frosted glass' }
])

// Progressive tooltip data loaders with realistic delays
const loadLiveMetrics = async () => {
  await new Promise(resolve => setTimeout(resolve, 1100))
  
  return {
    stats: {
      'CPU Usage': '34%',
      'Memory': '2.1GB / 8GB',
      'Disk I/O': '145 MB/s',
      'Network': '12.3 MB/s',
      'Uptime': '7d 14h 23m'
    },
    description: 'All systems operating normally. Peak usage was 67% CPU at 2:15 PM during data processing.',
    actions: [
      { label: 'Dashboard', handler: () => console.log('Open monitoring dashboard') },
      { label: 'Alerts', handler: () => console.log('Configure alerts') },
      { label: 'Scale', handler: () => console.log('Auto-scale resources') }
    ]
  }
}

const loadUserAnalytics = async () => {
  await new Promise(resolve => setTimeout(resolve, 1400))
  
  return {
    stats: {
      'Active Users': '1,247',
      'Session Duration': '8m 34s',
      'Page Views': '18,432',
      'Bounce Rate': '28.4%',
      'Conversion': '4.2%'
    },
    description: 'User engagement is 15% higher than yesterday. Mobile users account for 68% of traffic.',
    actions: [
      { label: 'Full Report', handler: () => console.log('Open analytics report') },
      { label: 'Segments', handler: () => console.log('View user segments') }
    ]
  }
}

const loadApiPerformance = async () => {
  await new Promise(resolve => setTimeout(resolve, 900))
  
  return {
    stats: {
      'Response Time': '142ms avg',
      'Requests/min': '3,847',
      'Error Rate': '0.08%',
      'Throughput': '847 req/s',
      'Availability': '99.94%'
    },
    description: 'API performance is excellent. All endpoints responding within SLA. No rate limiting active.',
    actions: [
      { label: 'Logs', handler: () => console.log('View API logs') },
      { label: 'Endpoints', handler: () => console.log('Monitor endpoints') }
    ]
  }
}

const loadDatabaseStats = async () => {
  await new Promise(resolve => setTimeout(resolve, 1200))
  
  return {
    stats: {
      'Connections': '156 / 500',
      'Queries/sec': '2,847',
      'Cache Hit Rate': '96.7%',
      'Slow Queries': '3',
      'Replication Lag': '12ms'
    },
    description: 'Database cluster healthy. Primary and replicas synchronized. Latest backup: 2 hours ago.',
    actions: [
      { label: 'Query Analyzer', handler: () => console.log('Open query analyzer') },
      { label: 'Backup Now', handler: () => console.log('Trigger backup') }
    ]
  }
}

const loadSecurityAlerts = async () => {
  await new Promise(resolve => setTimeout(resolve, 800))
  
  return {
    stats: {
      'Threat Level': 'Low',
      'Failed Logins': '12 (24h)',
      'Blocked IPs': '4',
      'SSL Expiry': '87 days',
      'Vulnerability Scan': 'Clean'
    },
    description: 'No active security threats detected. All systems pass security audit. Next scan in 6 hours.',
    actions: [
      { label: 'Security Log', handler: () => console.log('View security logs') },
      { label: 'Scan Now', handler: () => console.log('Run security scan') }
    ]
  }
}

const loadIntegrationStatus = async () => {
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  return {
    services: [
      { name: 'Stripe', status: 'online', uptime: '99.9%' },
      { name: 'SendGrid', status: 'online', uptime: '100%' },
      { name: 'Slack', status: 'warning', uptime: '98.1%' },
      { name: 'GitHub', status: 'online', uptime: '99.7%' },
      { name: 'AWS S3', status: 'online', uptime: '99.99%' }
    ],
    summary: 'Most integrations running smoothly. Slack API experiencing intermittent issues but auto-retry is active.'
  }
}

const loadMaterialDemo = async (materialName: string) => {
  await new Promise(resolve => setTimeout(resolve, 600))
  
  return {
    stats: {
      'Material': materialName,
      'Blur Level': materialName === 'Frosted' ? 'High' : 'Medium',
      'Opacity': materialName === 'Glass' ? '70%' : '90%',
      'Shadow': materialName === 'Elevated' ? 'High' : 'Standard'
    },
    description: `${materialName} material design provides excellent visual hierarchy and modern aesthetics.`
  }
}
</script>