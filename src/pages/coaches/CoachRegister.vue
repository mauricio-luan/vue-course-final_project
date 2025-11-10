<template>
  <base-dialog :show="!!errorMessage" title="Form error" @close="errorMessage = null"
    >{{ errorMessage }}
  </base-dialog>

  <section>
    <base-card>
      <h2>Register as a Coach now!</h2>
      <CoachForm @save-data="saveData"></CoachForm>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '@/components/coaches/CoachForm.vue'

export default {
  components: { CoachForm },

  data() {
    return { errorMessage: null }
  },

  methods: {
    async saveData(data) {
      try {
        await this.$store.dispatch('coaches/addCoach', data)
        this.$router.replace({ name: 'coach-list' })
      } catch (error) {
        this.errorMessage = error.message
      }
    },
  },
}
</script>
