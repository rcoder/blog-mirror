<template>
  <form id="whoami">
    <input type="text" v-model="alias" placeholder="pick an alias..." />
    <Badge v-if="alias">online</Badge>
    <Badge type="error" v-if="!alias">offline</Badge>
  </form>
</template>

<script>
export default {
  data: () => ({
    alias: ""
  }),
};
</script>