<template>
  <base-dialog :show="!!errorMessage" title="set requests" @close="closeDialog">
    {{ errorMessage }}
  </base-dialog>
  <section>
    <base-card>
      <header>
        <h2>Requests</h2>
      </header>

      <ul v-if="hasRequest">
        <RequestItem
          v-for="req in requests"
          :key="req.id"
          :email="req.userEmail"
          :message="req.userMessage"
        />
      </ul>
      <h3 v-else>You have not requests yet.</h3>
    </base-card>
  </section>
</template>

<script>
import RequestItem from '@/components/requests/RequestItem.vue'

export default {
  components: { RequestItem },

  created() {
    this.setRequests()
  },

  data() {
    return {
      errorMessage: null,
    }
  },

  computed: {
    requests() {
      return this.$store.getters['requests/getRequestsAssociatedWithUserId']
    },

    hasRequest() {
      return this.$store.getters['requests/hasRequest']
    },
  },

  methods: {
    async setRequests() {
      try {
        await this.$store.dispatch('requests/setRequests')
      } catch (error) {
        this.errorMessage = error.message
      }
    },

    closeDialog() {
      this.errorMessage = null
    },
  },
}
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
