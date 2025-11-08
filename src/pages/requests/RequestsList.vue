<template>
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
  <div></div>
</template>

<script>
import RequestItem from '@/components/requests/RequestItem.vue'

export default {
  created() {
    //debug - apagar depois
    console.log(this.requests)
    console.log(this.hasRequest)
    //this.setRequests()
    this.$store.dispatch('requests/setRequests')
  },

  components: { RequestItem },

  computed: {
    requests() {
      return this.$store.getters['requests/getRequestsAssociatedWithUserId']
    },

    hasRequest() {
      return this.$store.getters['requests/hasRequest']
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
