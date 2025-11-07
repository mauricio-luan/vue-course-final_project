<template>
  <section>
    <CoachFilter @change-filter="setFilters"></CoachFilter>
  </section>

  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline">Refresh</base-button>
        <base-button v-if="!isCoach" link :to="'/register'"> Register as Coach </base-button>
      </div>
      <ul v-if="hasCoaches">
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
      activeFilters: {
        frontend: true,
        backend: true,
        carrer: true,
      },
    }
  },

  computed: {
    ...mapGetters('coaches', ['getAllCoaches', 'hasCoaches', 'isCoach']),

    filteredCoaches() {
      const coaches = this.getAllCoaches
      return coaches.filter((c) => {
        if (this.activeFilters.frontend && c.areas.includes('frontend')) return true
        if (this.activeFilters.backend && c.areas.includes('backend')) return true
        if (this.activeFilters.carrer && c.areas.includes('carrer')) return true
        return false
      })
    },
  },

  methods: {
    setFilters(updatedFilter) {
      this.activeFilters = updatedFilter
    },

    setCoaches() {
      this.$store.dispatch('coaches/setCoaches')
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
