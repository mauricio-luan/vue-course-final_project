<template>
  <section>
    <base-card>
      <h2>Register as a Coach now!</h2>
      <CoachForm></CoachForm>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '@/components/coaches/CoachForm.vue'

export default {
  components: { CoachForm },
}
</script>
