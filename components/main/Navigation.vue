<template>
  <el-menu
    router
    :default-active="$route.path"
    class="el-menu-header"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="/">Вход</el-menu-item>
    <el-menu-item index="/registration">Регистрация</el-menu-item>
  </el-menu>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .el-menu-header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
  }
</style>


