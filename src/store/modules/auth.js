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
    async sign(context, payload) {
      const url = payload.mode === 'login' ? signinUrl : signupUrl
      const content = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
      const response = await fetch(`${url}${authToken}`, content)

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message)
      }
      localStorage.setItem('token', data.idToken)
      localStorage.setItem('userId', data.localId)
      context.commit('setSession', {
        userId: data.localId,
        token: data.idToken,
        tokenExpiration: data.expiresIn,
      })
    },

    logout(context) {
      context.commit('setSession', { userId: null, token: null, tokenExpiration: null })
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
    },

    tryLogin(context) {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')

      if (token && userId) {
        context.commit('setSession', { userId: userId, token: token, tokenExpiration: null })
      }
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
