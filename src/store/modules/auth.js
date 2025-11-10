const signupUrl = import.meta.env.VITE_AUTH_SIGNUP_URL
const signinUrl = import.meta.env.VITE_AUTH_SIGNIN_URL
const authToken = import.meta.env.VITE_AUTH_TOKEN

export default {
  namespaced: true,

  state: {
    userId: null,
    token: null,
    tokenExpiration: null,
  },

  mutations: {
    setSession(state, payload) {
      state.userId = payload.userId
      state.token = payload.token
      state.tokenExpiration = payload.tokenExpiration
    },
  },

  actions: {
    async login(context, payload) {
      const response = await fetch(`${signinUrl}${authToken}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, returnSecureToken: true }),
      })

      const data = await response.json()
      if (!response.ok) {
        console.log(data)
        throw new Error(data.message || 'failed to authenticated')
      }
      console.log(data)
      context.commit('setSession', {
        userId: data.localId,
        token: data.idToken,
        tokenExpiration: data.expiresIn,
      })
    },

    async signup(context, payload) {
      const response = await fetch(`${signupUrl}${authToken}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, returnSecureToken: true }),
      })

      const data = await response.json()
      if (!response.ok) {
        console.log(data)
        throw new Error(data.message || 'failed to authenticated')
      }

      console.log(data)
      context.commit('setSession', {
        userId: data.localId,
        token: data.idToken,
        tokenExpiration: data.expiresIn,
      })
    },
  },

  getters: {
    userId(state) {
      return state.userId
    },

    getToken(state) {
      return state.token
    },

    isAuthenticated(state) {
      return !!state.token
    },
  },
}
