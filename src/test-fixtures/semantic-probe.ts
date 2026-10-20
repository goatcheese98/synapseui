// Browser-only verification fixture. Not imported by any story or package entry.
import { createApp, h, reactive, nextTick } from 'vue'
import SmartButton from '../components/ui/button/SmartButton.vue'
import InterconnectedCard from '../components/ui/card/InterconnectedCard.vue'
import { colorIntents } from '../tokens/design-system'
import type { ButtonVariants } from '../components/ui/button/unified-variants'
import type { CardVariants } from '../components/ui/card/unified-card'

export const tokens = colorIntents
const state = reactive({
  variant: 'primary' as ButtonVariants['variant'],
  size: 'md' as ButtonVariants['size'],
  disabled: false,
  loading: false,
  cardVariant: 'primary' as CardVariants['variant'],
  cardInteractive: false,
  cardSize: 'md' as CardVariants['size'],
  autoAdapt: true,
})
export async function setState(patch: Partial<typeof state>) {
  Object.assign(state, patch)
  await nextTick()
}
export function mount() {
  const host = document.createElement('div')
  host.id = 'semantic-probe'
  const story = document.querySelector('.histoire-generic-render-story')
  if (!story) throw new Error('The retained Histoire consumer must be mounted first')
  story.append(host)
  createApp({ render: () => h('div', [
    h(SmartButton, { 'data-testid': 'direct-button', variant: state.variant, size: state.size, disabled: state.disabled, loading: state.loading }, () => 'Button'),
    h(InterconnectedCard, { 'data-testid': 'context-card', variant: state.cardVariant, size: state.cardSize, interactive: state.cardInteractive }, () =>
      h(SmartButton, { 'data-testid': 'inherited-button', variant: state.variant, size: state.size, autoAdapt: state.autoAdapt }, () => 'Button')),
  ]) }).mount(host)
}
