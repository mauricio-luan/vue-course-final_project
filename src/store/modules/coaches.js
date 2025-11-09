const coachesUrl = import.meta.env.VITE_COACHES_BASE_URL

export default {
  namespaced: true,

  state: {
    coaches: [
      {
        id: 'c1',
        firstName: 'Mauricio',
        lastName: 'Luan',
        areas: ['frontend', 'career'],
        description:
          "I'm Mauricio and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
        hourlyRate: 30,
      },
      {
        id: 'c2',
        firstName: 'Julie',
        lastName: 'Jones',
        areas: ['frontend', 'career'],
        description:
          'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
        hourlyRate: 30,
      },
    ],
  },

  mutations: {
    addCoach(state, payload) {
      state.coaches.push(payload)
    },

    setCoaches(state, payload) {
      state.coaches = payload
    },
  },

  actions: {
    async addCoach(context, payload) {
      const userId = context.rootGetters.userId

      const body = { method: 'PUT', body: JSON.stringify(payload) }
      const response = await fetch(`${coachesUrl}/${userId}.json`, body)

      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to add coach...')

      context.commit('addCoach', { ...payload, id: userId })
    },

    async setCoaches(context) {
      const response = await fetch(`${coachesUrl}.json`)

      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to fetch coaches...')

      const coaches = []
      for (const key in data) {
        coaches.push({ ...data[key], id: key })
      }
      context.commit('setCoaches', coaches)
    },
  },

  getters: {
    getAllCoaches(state) {
      return state.coaches
    },

    getCoachById(state) {
      return (coachId) => {
        return state.coaches.find((c) => c.id === coachId)
      }
    },

    hasCoaches(state) {
      return state.coaches && state.coaches.length > 0
    },

    isCoach(_, getters, __, rootGetters) {
      const userId = rootGetters.userId
      const coaches = getters.getAllCoaches
      return coaches.some((coach) => coach.id === userId)
    },
  },
}
