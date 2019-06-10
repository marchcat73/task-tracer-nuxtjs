<template>
  <div class="tracer-wrap">
    <el-container class="tracer-container">
      <el-aside width="200px">
        <app-aside />
      </el-aside>
      <el-main>
        <nuxt />
      </el-main>
    </el-container>   
  </div>
</template>

<script>
import AppAside from '@/components/tracer/Aside'
export default {
  components: {
    AppAside
  }
}
</script>

<style lang="scss" scoped>
  .tracer-wrap {
    width: 100%;
    height: 100vh;
  }
  .tracer-container {
    height: 100%;
  }
</style>


