const requestsUrl = import.meta.env.VITE_REQUESTS_BASE_URL

export default {
  namespaced: true,

  state: {
    requests: [],
  },

  mutations: {
    addRequest(state, payload) {
      state.requests.push(payload)
    },

    setRequest(state, payload) {
      state.requests = payload
    },
  },

  actions: {
    async addRequest(context, payload) {
      const body = { method: 'POST', body: JSON.stringify(payload) }
      const response = await fetch(`${requestsUrl}/${payload.coachId}.json`, body)

      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Something went wrong man...')

      const newRequest = { ...payload, id: data.name }
      context.commit('addRequest', newRequest)
    },

    async setRequests(context) {
      const coachId = context.rootGetters.userId
      const response = await fetch(`${requestsUrl}/${coachId}.json`)

      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Error at fetch requests...')

      /*
      fiz dessa forma mas achei que nao ficou claro a intenção...
      const ArrRequests = Object.entries(data)
      const requests = ArrRequests.map((req) => ({ id: req[0], ...req[1] }))
      */
      const requests = []
      for (const req in data) {
        requests.push({ id: req, ...data[req] })
      }
      context.commit('setRequest', requests)
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
