import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TimelineSlider from './TimelineSlider.vue'

// Simple GSAP mock
vi.mock('gsap', () => ({
  gsap: {
    to: vi.fn()
  }
}))

describe('TimelineSlider', () => {
  describe('basic functionality', () => {
    it('should render timeline slider', () => {
      const wrapper = mount(TimelineSlider, {
        props: { modelValue: 50 }
      })
      
      expect(wrapper.find('.timeline-slider').exists()).toBe(true)
      expect(wrapper.find('.timeline-track').exists()).toBe(true)
      expect(wrapper.find('.timeline-handle').exists()).toBe(true)
    })

    it('should display correct current value', () => {
      const wrapper = mount(TimelineSlider, {
        props: { modelValue: 75 }
      })
      
      expect(wrapper.find('.current-value').text()).toBe('75')
    })

    it('should calculate progress percentage', () => {
      const wrapper = mount(TimelineSlider, {
        props: { modelValue: 25, min: 0, max: 100 }
      })
      
      expect(wrapper.vm.progressPercentage).toBe(25)
    })

    it('should handle track hover states', async () => {
      const wrapper = mount(TimelineSlider, {
        props: { modelValue: 50 }
      })
      
      const track = wrapper.find('.timeline-track')
      
      await track.trigger('mouseenter')
      expect(wrapper.vm.isHovered).toBe(true)
      
      await track.trigger('mouseleave')
      expect(wrapper.vm.isHovered).toBe(false)
    })

    it('should emit events on playback controls', async () => {
      const wrapper = mount(TimelineSlider, {
        props: { modelValue: 20, showControls: true }
      })
      
      await wrapper.vm.togglePlayback()
      expect(wrapper.emitted('play')).toBeTruthy()
    })
  })
})