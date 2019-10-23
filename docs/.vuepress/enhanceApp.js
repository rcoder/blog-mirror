import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

export default ({ Vue }) => Vue.use(Vuex, {
  state: {
    ident: {
      publicKey: '',
      alias: ''
    },
    messages: []
  },
  plugins: [new VuexPersistence().plugin]
})