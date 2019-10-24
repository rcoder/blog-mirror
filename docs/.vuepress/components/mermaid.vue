<template>
  <div class="mermaid">
    <slot></slot>
  </div>
</template>

<script>
export default {
  beforeMount() {
    import("mermaid/dist/mermaid").then(m => {
      m.initialize({
        startOnLoad: true,
        securityLevel: 'loose',
        // TODO: this should be theme-aware (but themes can change on the fly post-rendering,
        // so it's not immediately obvious how to do that); 'dark' is a reasonable default since
        // that's also the default for site visitors
        theme: 'dark'
      })
      m.init()
    })
  }
}
</script>