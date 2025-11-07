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

  // parei aqui <<<<<<<<<<<<<<<<<
  actions: {
    addRequest(context, payload) {
      const coachId = payload.coachId
      const response = fetch(
        `https://vue-http-demo-mauricio-default-rtdb.firebaseio.com/requests/${coachId}.json`,
        {
          method: 'PUT',
          body: JSON.stringify(payload),
        },
      )

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
