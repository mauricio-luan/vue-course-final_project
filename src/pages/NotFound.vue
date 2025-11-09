<template>
  <section>
    <base-card>
      <h1>Page Not Found!</h1>
      <p>
        This page do not exists. Maybe you want go to
        <router-link :to="{ name: 'coach-list' }">coaches</router-link> page.
      </p>
    </base-card>
  </section>
</template>
