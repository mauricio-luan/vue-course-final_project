<template>
  <section>
    <base-card>Filter</base-card>
  </section>

  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline">Refresh</base-button>
        <base-button link :to="{ name: 'coach-register' }"> Register as Coach </base-button>
      </div>
      <ul v-if="hasCoaches">
        <CoachItem
          v-for="coach in getAllCoaches"
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

export default {
  components: { CoachItem },

  computed: {
    ...mapGetters('coaches', ['getAllCoaches', 'hasCoaches']),
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
