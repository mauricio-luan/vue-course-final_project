import { createStore } from 'vuex'
import auth from './modules/auth'
import coaches from './modules/coaches'
import requests from './modules/requests'

const store = createStore({
  modules: {
    coaches,
    requests,
    auth,
  },
})

export default store
