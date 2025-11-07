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
    async addCoach(context, data) {
      const userId = context.rootGetters.userId
      const newCoach = {
        firstName: data.first,
        lastName: data.last,
        areas: data.areas,
        description: data.desc,
        hourlyRate: data.rate,
      }

      const response = await fetch(
        `https://vue-http-demo-mauricio-default-rtdb.firebaseio.com/coaches/${userId}.json`,
        {
          method: 'PUT',
          body: JSON.stringify(newCoach),
        },
      )

      // const responseData = await response.json()

      if (!response.ok)
        context.commit('addCoach', {
          ...newCoach,
          id: userId,
        })
    },

    async setCoaches(context) {
      const response = await fetch(
        'https://vue-http-demo-mauricio-default-rtdb.firebaseio.com/coaches.json', //fetch all coaches no banco
      )

      const responseData = await response.json()
      const coaches = []
      for (const key in responseData) {
        const coach = {
          id: key,
          firstName: responseData[key].firstName,
          lastName: responseData[key].lastName,
          areas: responseData[key].areas,
          description: responseData[key].description,
          hourlyRate: responseData[key].hourlyRate,
        }
        coaches.push(coach)
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

    isCoach(state, getters, rootState, rootGetters) {
      const userId = rootGetters.userId
      const coaches = getters.getAllCoaches
      return coaches.some((coach) => coach.id === userId)
    },
  },
}
