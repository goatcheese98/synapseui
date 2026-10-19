import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import Button from './BaseButton.vue'
import { buttonVariants, type ButtonVariants } from './button-variants'

const render = (props = {}) => mount(Button, { props, slots: { default: 'Save changes' } })
describe('public Button', () => {
  it('renders intact slot text and defaults to a non-submitting native button', () => {
    const wrapper = render()
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.text()).toBe('Save changes')
    expect(wrapper.find('.warped-text').exists()).toBe(false)
  })
  const variants: NonNullable<ButtonVariants['variant']>[] = ['neutral', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error', 'outline', 'outline-primary', 'outline-success', 'outline-error', 'ghost', 'ghost-primary', 'link']
  for (const variant of variants) it(`supports existing ${variant} variant`, () => {
    expect(render({ variant }).classes()).toContain(`synapse-${variant}`)
    expect(buttonVariants({ variant })).toContain(`synapse-${variant}`)
  })
  it.each([['xs', 'h-7'], ['sm', 'h-9'], ['md', 'h-10'], ['lg', 'h-12'], ['xl', 'h-14'], ['icon-sm', 'h-8']])('preserves size %s', (size, className) => {
    const wrapper = mount(Button, { props: { size: size as 'md' }, slots: { default: 'Size' } })
    expect(wrapper.classes()).toContain(className)
  })
  it('keeps the focused element when its variant changes', async () => {
    const wrapper = mount(Button, { attachTo: document.body, slots: { default: 'Save' } })
    const element = wrapper.element as HTMLButtonElement
    element.focus()
    await wrapper.setProps({ variant: 'outline' })
    expect(document.activeElement).toBe(element)
    wrapper.unmount()
  })
  it('emits one activation', async () => {
    const wrapper = render()
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })
  it.each(['disabled', 'loading'])('blocks %s activation', async state => {
    const wrapper = render({ [state]: true })
    expect(wrapper.attributes('disabled')).toBeDefined()
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })
  it('exposes loading state without replacing its label', () => {
    const wrapper = render({ loading: true })
    expect(wrapper.attributes('aria-busy')).toBe('true')
    expect(wrapper.text()).toBe('Save changes')
    expect(wrapper.find('svg').attributes('aria-hidden')).toBe('true')
  })
  it('renders named icon slots and hides them during loading', async () => {
    const wrapper = mount(Button, { slots: { default: 'Save', 'icon-left': '<span>Left</span>', 'icon-right': '<span>Right</span>' } })
    expect(wrapper.text()).toBe('LeftSaveRight')
    await wrapper.setProps({ loading: true })
    expect(wrapper.text()).toBe('Save')
  })
  it('supports full width and caller classes', () => {
    expect(render({ fullWidth: true, class: 'custom' }).classes()).toEqual(expect.arrayContaining(['w-full', 'custom']))
  })
  it('supports submit and accessible attributes', () => {
    const wrapper = render({ type: 'submit', ariaLabel: 'Save record', ariaDescribedBy: 'help' })
    expect(wrapper.attributes()).toMatchObject({ type: 'submit', 'aria-label': 'Save record', 'aria-describedby': 'help' })
  })
  it('forwards attributes to a real custom link and cancels blocked navigation', async () => {
    const wrapper = mount(Button, { props: { as: 'a', disabled: true }, attrs: { href: '#destination' }, slots: { default: 'Link' } })
    const event = new MouseEvent('click', { bubbles: true, cancelable: true })
    wrapper.element.dispatchEvent(event)
    expect(wrapper.element.tagName).toBe('A')
    expect(event.defaultPrevented).toBe(true)
    expect(wrapper.attributes('aria-disabled')).toBe('true')
    expect(wrapper.emitted('click')).toBeUndefined()
  })
  it('asChild preserves its child element and prevents navigation while loading', () => {
    const wrapper = mount(Button, { props: { asChild: true, loading: true }, slots: { default: () => h('a', { href: '#destination' }, 'Child link') } })
    expect(wrapper.element.tagName).toBe('A')
    const event = new MouseEvent('click', { bubbles: true, cancelable: true })
    wrapper.element.dispatchEvent(event)
    expect(event.defaultPrevented).toBe(true)
    expect(wrapper.text()).toBe('Child link')
  })
})
