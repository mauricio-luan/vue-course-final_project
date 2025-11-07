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
      }

      context.commit('addRequest', newRequest)
    },
  },

  getters: {
    getAllRequests(state) {
      return state.requests
    },

    getRequestsAssociatedWithUserId(state, _, _2, rootGetters) {
      const userId = rootGetters.userId
      return state.requests.filter((req) => req.coachId === userId)
    },

    hasRequest(_, getters) {
      return getters.getRequestsAssociatedWithUserId.length > 0
    },
  },
}
