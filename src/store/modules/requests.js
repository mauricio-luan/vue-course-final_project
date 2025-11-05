export default {
  namespaced: true,

  state: {
    requests: [],
  },

  mutations: {
    addRequest(state, payload) {
      state.requests.push(payload)
    },
  },

  actions: {
    addRequest(context, payload) {
      const newRequest = {
        ...payload,
        id: new Date().toISOString(),
        /*  coachId: payload.coachId,
        userEmail: payload.email,
        userMessage: payload.message, */
      }
      context.commit('addRequest', newRequest)
    },
  },

  getters: {
    getAllRequests(state) {
      return state.requests
    },

    hasRequest(state) {
      return state.requests && state.requests.length > 0
    },
  },
}
