<template>
  <form id="whoami">
    <fieldset v-if="!alias">
      <input type="text" v-model="alias" placeholder="pick an alias..." />
      <input type="password" v-model="passphrase" placeholder="...and a passphrase" />
    <Badge v-if="alias">online</Badge>
    <Badge type="error" v-if="!alias">offline</Badge>
  </form>
</template>

<script>
export default {
  data: () => ({
    text: '',
    password: ''
  })
}
</script>