<template>
  <div class="git-info">
    <a :title="gitLog" href="#">log</a>
  </div>
</template>

<script>
import yaml from 'js-yaml';

export default {
  computed: {
    gitLog: yaml.safeDump(this.$page.git, {flowLevel: 2})
  }
}
</script>
<style lang="stylus">
a.git-info:hover {
  font-family: 'Cascadia';
}
</style>