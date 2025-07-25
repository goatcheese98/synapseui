<script setup lang="ts">
import Card from '@/components/ui/card/Card.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import CardTitle from '@/components/ui/card/CardTitle.vue'
import CardDescription from '@/components/ui/card/CardDescription.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import CardFooter from '@/components/ui/card/CardFooter.vue'
import Button from '@/components/ui/button/Button.vue'
import Badge from '@/components/ui/badge/Badge.vue'
import HStack from '@/components/ui/stack/HStack.vue'
import VStack from '@/components/ui/stack/VStack.vue'
import Separator from '@/components/ui/separator/Separator.vue'
import { Icon } from '@iconify/vue'
</script>

<template>
  <Story title="Data Display/Card" :layout="{ type: 'single', iframe: false }">
    <Variant title="Basic Card">
      <div class="space-y-6">
        <div class="max-w-sm">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>
                This is a basic card with a title and description.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p class="text-sm">
                Card content goes here. You can add any content you want in this section.
              </p>
            </CardContent>
            <CardFooter>
              <Button>Action</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Variant>

    <Variant title="Product Cards">
      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card class="overflow-hidden">
            <div class="aspect-square bg-gradient-to-br from-blue-400 to-purple-600"></div>
            <CardHeader>
              <CardTitle class="text-lg">Premium Subscription</CardTitle>
              <CardDescription>
                Access to all premium features and unlimited usage.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div class="text-3xl font-bold">$29<span class="text-sm font-normal text-muted-foreground">/month</span></div>
            </CardContent>
            <CardFooter>
              <Button class="w-full">Subscribe</Button>
            </CardFooter>
          </Card>

          <Card class="overflow-hidden">
            <div class="aspect-square bg-gradient-to-br from-green-400 to-blue-600"></div>
            <CardHeader>
              <CardTitle class="text-lg">Basic Plan</CardTitle>
              <CardDescription>
                Essential features for individuals and small teams.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div class="text-3xl font-bold">$9<span class="text-sm font-normal text-muted-foreground">/month</span></div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" class="w-full">Get Started</Button>
            </CardFooter>
          </Card>

          <Card class="overflow-hidden relative">
            <Badge class="absolute top-4 right-4 z-10">Popular</Badge>
            <div class="aspect-square bg-gradient-to-br from-orange-400 to-red-600"></div>
            <CardHeader>
              <CardTitle class="text-lg">Enterprise</CardTitle>
              <CardDescription>
                Advanced features for large organizations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div class="text-3xl font-bold">$99<span class="text-sm font-normal text-muted-foreground">/month</span></div>
            </CardContent>
            <CardFooter>
              <Button class="w-full">Contact Sales</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Variant>

    <Variant title="User Profile Card">
      <div class="space-y-6">
        <div class="max-w-md">
          <Card>
            <CardHeader class="text-center">
              <div class="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                JD
              </div>
              <CardTitle class="text-xl">John Doe</CardTitle>
              <CardDescription>Software Engineer</CardDescription>
            </CardHeader>
            <CardContent>
              <VStack spacing="sm">
                <HStack align="between">
                  <span class="text-sm font-medium">Location</span>
                  <span class="text-sm text-muted-foreground">San Francisco, CA</span>
                </HStack>
                <HStack align="between">
                  <span class="text-sm font-medium">Joined</span>
                  <span class="text-sm text-muted-foreground">March 2023</span>
                </HStack>
                <HStack align="between">
                  <span class="text-sm font-medium">Projects</span>
                  <span class="text-sm text-muted-foreground">24</span>
                </HStack>
              </VStack>
            </CardContent>
            <CardFooter class="gap-2">
              <Button class="flex-1">Follow</Button>
              <Button variant="outline" class="flex-1">Message</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Variant>

    <Variant title="Stats Cards">
      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">Total Revenue</CardTitle>
              <Icon icon="lucide:dollar-sign" class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">$45,231.89</div>
              <p class="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">Subscriptions</CardTitle>
              <Icon icon="lucide:users" class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">+2,350</div>
              <p class="text-xs text-muted-foreground">+180.1% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">Sales</CardTitle>
              <Icon icon="lucide:credit-card" class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">+12,234</div>
              <p class="text-xs text-muted-foreground">+19% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">Active Now</CardTitle>
              <Icon icon="lucide:activity" class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">+573</div>
              <p class="text-xs text-muted-foreground">+201 since last hour</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Variant>

    <Variant title="Interactive Cards">
      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card class="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <HStack align="between">
                <div>
                  <CardTitle class="text-lg">Project Alpha</CardTitle>
                  <CardDescription>Web application development</CardDescription>
                </div>
                <Badge variant="success">Active</Badge>
              </HStack>
            </CardHeader>
            <CardContent>
              <VStack spacing="sm">
                <HStack align="between">
                  <span class="text-sm">Progress</span>
                  <span class="text-sm font-medium">75%</span>
                </HStack>
                <div class="w-full bg-secondary rounded-full h-2">
                  <div class="bg-primary h-2 rounded-full" style="width: 75%"></div>
                </div>
                <HStack align="between">
                  <span class="text-sm text-muted-foreground">Due date</span>
                  <span class="text-sm">Dec 15, 2024</span>
                </HStack>
              </VStack>
            </CardContent>
          </Card>

          <Card class="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <HStack align="between">
                <div>
                  <CardTitle class="text-lg">Project Beta</CardTitle>
                  <CardDescription>Mobile app redesign</CardDescription>
                </div>
                <Badge variant="warning">In Review</Badge>
              </HStack>
            </CardHeader>
            <CardContent>
              <VStack spacing="sm">
                <HStack align="between">
                  <span class="text-sm">Progress</span>
                  <span class="text-sm font-medium">90%</span>
                </HStack>
                <div class="w-full bg-secondary rounded-full h-2">
                  <div class="bg-primary h-2 rounded-full" style="width: 90%"></div>
                </div>
                <HStack align="between">
                  <span class="text-sm text-muted-foreground">Due date</span>
                  <span class="text-sm">Jan 10, 2025</span>
                </HStack>
              </VStack>
            </CardContent>
          </Card>
        </div>
      </div>
    </Variant>

    <Variant title="Article Cards">
      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card class="overflow-hidden">
            <div class="h-48 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
            <CardHeader>
              <div class="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
                <span>Technology</span>
                <span>•</span>
                <span>5 min read</span>
                <span>•</span>
                <span>Dec 10, 2024</span>
              </div>
              <CardTitle class="text-lg">Getting Started with Vue 3 Composition API</CardTitle>
              <CardDescription>
                Learn how to leverage the power of Vue 3's Composition API to build more maintainable and reusable components.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <HStack align="between" class="w-full">
                <HStack spacing="sm">
                  <div class="w-6 h-6 bg-gray-300 rounded-full"></div>
                  <span class="text-sm font-medium">John Smith</span>
                </HStack>
                <Button variant="ghost" size="sm">
                  <Icon icon="lucide:bookmark" class="h-4 w-4" />
                </Button>
              </HStack>
            </CardFooter>
          </Card>

          <Card class="overflow-hidden">
            <div class="h-48 bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <CardHeader>
              <div class="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
                <span>Design</span>
                <span>•</span>
                <span>8 min read</span>
                <span>•</span>
                <span>Dec 8, 2024</span>
              </div>
              <CardTitle class="text-lg">Modern UI Design Principles</CardTitle>
              <CardDescription>
                Explore the latest trends and best practices in user interface design for modern web applications.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <HStack align="between" class="w-full">
                <HStack spacing="sm">
                  <div class="w-6 h-6 bg-gray-300 rounded-full"></div>
                  <span class="text-sm font-medium">Sarah Wilson</span>
                </HStack>
                <Button variant="ghost" size="sm">
                  <Icon icon="lucide:bookmark" class="h-4 w-4" />
                </Button>
              </HStack>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Variant>

    <Variant title="Complex Layout">
      <div class="space-y-6">
        <div class="max-w-2xl">
          <Card>
            <CardHeader>
              <HStack align="between">
                <div>
                  <CardTitle>Team Dashboard</CardTitle>
                  <CardDescription>Overview of team performance and metrics</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Icon icon="lucide:settings" class="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </HStack>
            </CardHeader>
            <CardContent>
              <VStack spacing="lg">
                <div class="grid grid-cols-3 gap-4">
                  <div class="text-center">
                    <div class="text-2xl font-bold text-primary">24</div>
                    <div class="text-sm text-muted-foreground">Active Projects</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-success">156</div>
                    <div class="text-sm text-muted-foreground">Completed Tasks</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-warning">12</div>
                    <div class="text-sm text-muted-foreground">Team Members</div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 class="font-medium mb-3">Recent Activity</h4>
                  <VStack spacing="sm">
                    <HStack align="between">
                      <HStack spacing="sm">
                        <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span class="text-sm">Project Alpha completed</span>
                      </HStack>
                      <span class="text-xs text-muted-foreground">2 hours ago</span>
                    </HStack>
                    <HStack align="between">
                      <HStack spacing="sm">
                        <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span class="text-sm">New team member added</span>
                      </HStack>
                      <span class="text-xs text-muted-foreground">4 hours ago</span>
                    </HStack>
                    <HStack align="between">
                      <HStack spacing="sm">
                        <div class="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span class="text-sm">Meeting scheduled</span>
                      </HStack>
                      <span class="text-xs text-muted-foreground">1 day ago</span>
                    </HStack>
                  </VStack>
                </div>
              </VStack>
            </CardContent>
            <CardFooter>
              <Button class="w-full">View Full Report</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Variant>
  </Story>
</template>