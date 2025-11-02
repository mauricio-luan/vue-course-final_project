<template>
  <section>
    <base-card>
      <h2>{{ fullName }}</h2>
      <h3>${{ rate }}/hour</h3>
    </base-card>
  </section>

  <section>
    <base-card>
      <header>
        <h2>Interested? Reach out now!</h2>
        <base-button link :to="contactLink">Contact</base-button>
      </header>
      <router-view></router-view>
    </base-card>
  </section>

  <section>
    <base-card>
      <base-badge v-for="area in areas" :key="area" :type="area" :title="area"></base-badge>
      <p>{{ description }}</p>
    </base-card>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['id'],

  data() {
    return { coach: null }
  },

  created() {
    this.coach = this.getCoachById(this.id)
  },

  computed: {
    ...mapGetters('coaches', ['getCoachById']),

    fullName() {
      return `${this.coach.firstName} ${this.coach.lastName}`
    },

    contactLink() {
      return { name: 'coach-contact', params: { id: this.id } }
    },

    areas() {
      return this.coach.areas
    },

    rate() {
      return this.coach.hourlyRate
    },

    description() {
      return this.coach.description
    },
  },
}
</script>

<style lang=""></style>
