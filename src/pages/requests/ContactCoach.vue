<template>
  <base-dialog
    :show="!!errorMessage"
    title="Error"
    @close="$router.replace({ name: 'coach-list' })"
  >
    {{ errorMessage }}</base-dialog
  >

  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="email">Your E-mail: </label>
      <input type="email" id="email" v-model.trim="email" />
    </div>
    <div class="form-control">
      <label for="message">Message: </label>
      <textarea id="message" rows="5" v-model.trim="message"></textarea>
    </div>
    <p class="errors" v-if="!isFormValid">Please enter a valid email and non-empty message.</p>
    <div class="actions">
      <base-button>Send a message</base-button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      message: '',
      isFormValid: true,
      errorMessage: null,
    }
  },

  methods: {
    async submitForm() {
      try {
        this.isFormValid = true
        if (this.email === '' || !this.email.includes('@') || this.message === '') {
          this.isFormValid = false
          return
        }

        const newRequest = {
          coachId: this.$route.params.id,
          userEmail: this.email,
          userMessage: this.message,
        }
        await this.$store.dispatch('requests/addRequest', newRequest)

        this.$router.replace({ name: 'coach-list' })
      } catch (error) {
        this.errorMessage = error.message
      }
    },
  },
}
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
