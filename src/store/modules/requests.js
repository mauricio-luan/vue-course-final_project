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

    setRequests(state, payload) {
      state.requests = payload
    },
  },

  actions: {
    async addRequest(context, payload) {
      try {
        if (!payload?.coachId) throw new Error('Coach ID is required')

        const response = await fetch(`${requestsUrl}/${payload.coachId}.json`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.message || 'Failed to add request...')
        }

        const data = await response.json()
        const newRequest = { ...payload, id: data.name }
        context.commit('addRequest', newRequest)
      } catch (error) {
        console.error('Error at add request: ', error.message)
        throw error
      }
    },

    async setRequests(context) {
      try {
        const coachId = context.rootGetters['auth/userId']
        const token = context.rootGetters['auth/getToken']
        const response = await fetch(`${requestsUrl}/${coachId}.json?auth=${token}`)

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw Error(errorData.message || 'Error at fetch requests...')
        }

        const data = await response.json()
        if (!data) {
          context.commit('setRequests', [])
          return
        }

        const requests = []
        for (const req in data) {
          requests.push({ id: req, ...data[req] })
        }
        context.commit('setRequests', requests)
      } catch (error) {
        console.error(error)
        throw error
      }
    },
  },

  getters: {
    getAllRequests(state) {
      return state.requests
    },

    getRequestsAssociatedWithUserId(_state, getters, _rootState, rootGetters) {
      const userId = rootGetters.userId
      return getters.getAllRequests.filter((req) => req.coachId === userId)
    },

    hasRequest(_state, getters) {
      return getters.getRequestsAssociatedWithUserId.length > 0
    },
  },
}
