<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-header"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="1">Вход</el-menu-item>
    <el-menu-item index="2">Регистрация</el-menu-item>
  </el-menu>
</template>

<script>
export default {
    data() {
      return {
        activeIndex: '1'
      }
    }
}
</script>

<style lang="scss" scoped>
  .el-menu-header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
  }
</style>


