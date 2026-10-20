import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from './BaseInput.vue'
describe('public Input', () => {
  it('emits typed text updates and forwards descriptions', async () => {
    const wrapper = mount(Input, { props: { fieldId: 'name', hasError: true }, attrs: { 'aria-describedby': 'error' } })
    await wrapper.setValue('Button')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Button'])
    expect(wrapper.attributes()).toMatchObject({ id: 'name', 'aria-invalid': 'true', 'aria-describedby': 'error' })
  })
  it('exposes focus and blur for native keyboard integration', () => {
    const wrapper = mount(Input, { attachTo: document.body })
    wrapper.vm.focus()
    expect(document.activeElement).toBe(wrapper.element)
    wrapper.vm.blur()
    expect(document.activeElement).not.toBe(wrapper.element)
    wrapper.unmount()
  })
  it('uses native disabled semantics', () => {
    expect(mount(Input, { props: { disabled: true } }).element.disabled).toBe(true)
  })
})
