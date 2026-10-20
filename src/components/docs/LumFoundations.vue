<script setup lang="ts">
import { ref } from 'vue'
import { Button, Input } from '../../index'
const fontLicenseUrl = new URL('../../assets/fonts/OFL.txt', import.meta.url).href
defineProps<{ theme: 'light' | 'dark' | 'system' }>()
const saving = ref(false)
const count = ref(0)
const value = ref('')
const copyState = ref('')
const example = '<Button variant="primary" :loading="saving">Save changes</Button>'
async function copyExample() {
  try {
    if (!navigator.clipboard) throw new Error('Clipboard unavailable')
    await navigator.clipboard.writeText(example)
    copyState.value = 'Copied example.'
  } catch { copyState.value = 'Copy unavailable. Select the code below and copy it manually.' }
}
</script>
<template>
  <main
    :data-synapse-theme="theme"
    class="lum-foundations"
  >
    <header>
      <p>Components / Button</p><h1>Button</h1><p class="subtitle">
        Clear actions. Consistent states.
      </p>
    </header>
    <section
      class="surface"
      aria-labelledby="variants-heading"
    >
      <h2 id="variants-heading">
        Variants
      </h2>
      <div class="samples">
        <Button @click="count++">
          Save changes
        </Button><Button variant="outline">
          Cancel
        </Button><Button variant="ghost">
          Learn more
        </Button>
      </div>
      <p>Default, outline and ghost share the same type, spacing and focus treatment.</p>
    </section>
    <section aria-labelledby="behavior-heading">
      <h2 id="behavior-heading">
        Behavior is part of the component.
      </h2>
      <div class="samples states">
        <div>
          <p>Keyboard focus</p><Button
            variant="outline"
            @click="count++"
          >
            Try Enter or Space
          </Button>
        </div>
        <div>
          <p>Disabled</p><Button disabled>
            Save changes
          </Button>
        </div>
        <div>
          <p>Loading</p><Button loading>
            Saving…
          </Button>
        </div>
      </div>
      <p role="status">
        Activations: {{ count }}
      </p>
      <div class="samples">
        <Button
          :loading="saving"
          @click="saving = true"
        >
          Start loading
        </Button>
        <Button
          variant="outline"
          :disabled="!saving"
          @click="saving = false"
        >
          Reset loading
        </Button>
        <Button
          aria-label="Add item"
          size="icon-lg"
        >
          <span aria-hidden="true">+</span>
        </Button>
        <Button variant="ghost">
          A longer action label that can wrap on a small screen
        </Button>
      </div>
    </section>
    <section
      class="surface usage"
      aria-labelledby="usage-heading"
    >
      <div class="usage-heading">
        <h2 id="usage-heading">
          Use the primary action once per task.
        </h2><Button
          variant="outline"
          @click="copyExample"
        >
          Copy example
        </Button>
      </div>
      <pre
        tabindex="0"
        aria-label="Button usage code"
      ><code>{{ example }}</code></pre><p role="status">
        {{ copyState }}
      </p>
    </section>
    <section>
      <h2>Keyboard first</h2>
      <p>Enter and Space activate native buttons once. Loading prevents duplicate actions. Motion stays optional.</p>
      <p>Self-hosted Geist and Geist Mono. <a :href="fontLicenseUrl">Font license (SIL OFL 1.1)</a></p>
    </section>
    <section aria-labelledby="input-heading">
      <h2 id="input-heading">
        Input
      </h2><label for="foundation-name">Component name</label>
      <Input
        v-model="value"
        field-id="foundation-name"
        placeholder="For example, Button"
      />
      <p role="status">
        {{ value ? `Entered: ${value}` : 'Empty — enter a component name.' }}
      </p>
      <label for="foundation-error">Invalid example</label><Input
        field-id="foundation-error"
        has-error
        aria-describedby="input-error"
      />
      <p id="input-error">
        Error example: a name is required.
      </p>
      <label for="foundation-disabled">Disabled example</label><Input
        field-id="foundation-disabled"
        disabled
        model-value="Unavailable"
      />
    </section>
  </main>
</template>
<style scoped>
.lum-foundations { box-sizing:border-box; padding:32px; display:flex; flex-direction:column; gap:24px; min-width:0; font-size:14px; line-height:1.5; }
.lum-foundations :deep(*) { box-sizing:border-box; }
h1,h2,p { margin:0; color:var(--fg); font-family:var(--font-sans); }
h1 { font-size:30px; font-weight:600; letter-spacing:-.03em; } h2 { font-size:14px; font-weight:600; margin-bottom:16px; }
p { color:var(--mut); } .subtitle { font-size:16px; } section { min-width:0; }
.surface { border:1px solid var(--line); border-radius:var(--r-lg); padding:24px; }
.samples { display:flex; gap:16px; flex-wrap:wrap; align-items:center; margin:16px 0; } .states { gap:24px; } .states p { margin-bottom:12px; }
.lum-foundations :deep(.synapse-button) { min-height:44px; height:auto; padding-block:10px; }
.usage { background:var(--panel2); border-radius:var(--r-md); } .usage-heading { display:flex; flex-wrap:wrap; gap:12px; align-items:center; justify-content:space-between; } .usage-heading h2 { margin:0; }
code { font-family:var(--font-mono); }
a { color:var(--fg); text-decoration:underline; text-underline-offset:3px; }
a:focus-visible { outline:2px solid var(--fg); outline-offset:3px; }
pre { overflow-x:auto; max-width:100%; margin-top:16px; padding:4px; color:var(--fg); font:13px/22px var(--font-mono); white-space:pre; }
label { display:block; margin:12px 0 6px; color:var(--fg); }
@media(max-width:767px) { .lum-foundations { padding:16px; font-size:16px; } h2 { font-size:16px; } .surface { padding:16px; } .lum-foundations :deep(input) { font-size:16px; min-height:44px; } }
</style>
