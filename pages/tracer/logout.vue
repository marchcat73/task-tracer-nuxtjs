<template>
  <div>
    <h1>Завершаем сессию.....</h1>
  </div>
</template>

<script>
export default {
  layout: 'tracer',
  middleware: ['tracer-auth'],
  beforeCreate() {
    this.$store.dispatch('auth/logout')
    this.$router.push('/?message=logout')
  }
}
</script>
