<template>
  <base-dialog :show="!!error" title="Error" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>

  <section>
    <CoachFilter @change-filter="setFilters"></CoachFilter>
  </section>

  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="setCoaches">Refresh</base-button>
        <base-button v-if="!isCoach && !isLoading" link :to="'/register'">
          Register as Coach
        </base-button>
      </div>

      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>

      <ul v-else-if="shouldShowCoachesList">
        <CoachItem
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :first-name="coach.firstName"
          :last-name="coach.lastName"
          :rate="coach.hourlyRate"
          :areas="coach.areas"
        >
        </CoachItem>
      </ul>
      <h3 v-else>No coaches found.</h3>
    </base-card>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import CoachItem from '@/components/coaches/CoachItem.vue'
import CoachFilter from '@/components/coaches/CoachFilter.vue'

export default {
  components: { CoachItem, CoachFilter },

  created() {
    this.setCoaches()
  },

  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    }
  },

  computed: {
    ...mapGetters('coaches', ['getAllCoaches', 'hasCoaches', 'isCoach']),

    shouldShowCoachesList() {
      return !this.isLoading && this.hasCoaches
    },

    filteredCoaches() {
      const coaches = this.getAllCoaches
      return coaches.filter((c) => {
        if (this.activeFilters.frontend && c.areas.includes('frontend')) return true
        if (this.activeFilters.backend && c.areas.includes('backend')) return true
        if (this.activeFilters.career && c.areas.includes('career')) return true
        return false
      })
    },
  },

  methods: {
    setFilters(updatedFilter) {
      this.activeFilters = updatedFilter
    },

    /* O async await aqui é para poder aplicar o spinner loading */
    async setCoaches() {
      this.isLoading = true
      try {
        await this.$store.dispatch('coaches/setCoaches')
      } catch (error) {
        this.error = error.message || 'something went wrong bitch'
      }
      this.isLoading = false
    },

    handleError() {
      this.error = null
    },
  },
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
