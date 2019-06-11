<template>
  <el-container>
    <el-header class="header">
      <app-navigation />
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
import AppNavigation from '@/components/main/Navigation'
export default {
  components: {
    AppNavigation
  },

  computed: {
    error() {
      return this.$store.getters.error
    }
  },

  watch: {
    error(value) {
      this.$message.error(value)
    }
  }
}
</script>


<style lang="scss">
  .header {
    padding: 0;
  }
</style>
