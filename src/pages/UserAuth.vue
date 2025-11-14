<template>
  <base-dialog :show="!!errorMessage" title="Form invalid!" @close="errorMessage = null">
    {{ errorMessage }}
  </base-dialog>

  <section>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Email: </label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password: </label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="submit" link mode="flat" @click="switchAuthMode">
          {{ switchModeButtonCaption }}
        </base-button>
      </form>
    </base-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      isFormValid: true,
      isLoading: false,
      errorMessage: null,
      mode: 'login',
    }
  },

  computed: {
    submitButtonCaption() {
      if (this.mode === 'login') {
        return 'Login'
      } else {
        return 'Sign up'
      }
    },

    switchModeButtonCaption() {
      if (this.mode === 'login') {
        return 'Sign up instead'
      } else {
        return 'Login instead'
      }
    },
  },

  methods: {
    async submitForm() {
      try {
        this.isLoading = true
        this.isFormValid = true
        if (this.email === '' || this.password === '') {
          this.errorMessage = 'Fields must not be empty.'
          this.isFormValid = false
          return
        }

        const payload = {
          mode: this.mode,
          email: this.email,
          password: this.password,
        }
        await this.$store.dispatch('auth/sign', payload)

        const redirectUrl = this.$route.query.redirect || { name: 'coach-list' }
        this.$router.replace(redirectUrl)
      } catch (error) {
        this.errorMessage = error.message
      }
    },

    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup'
      } else {
        this.mode = 'login'
      }
    },
  },
}
</script>

<style scoped>
form {
  margin: 1rem;
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
</style>
