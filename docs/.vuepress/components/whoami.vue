<template>
  <form id="whoami">
    <fieldset v-if="!alias">
      <input type="text" v-model="alias" placeholder="pick an alias..." />
      <input type="password" v-model="passphrase" placeholder="...and a passphrase"
        @keyup.enter= />
    <Badge v-if="alias">online</Badge>
    <Badge type="error" v-if="!alias">offline</Badge>
  </form>
</template>

<script>
export const passphrase = Symbol.for('passphrase');

export default {
  name: 'whoami',
  props: {
    alias: string,
    [passphrase]: string
  }
}
</script>