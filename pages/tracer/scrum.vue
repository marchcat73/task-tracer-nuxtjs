<template>
  <div>
    <h1>Scrum</h1>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: `${process.env.appName} - Список задач в виде доски`
    }    
  },
  layout: 'tracer',
  middleware: ['tracer-auth']
}
</script>
