<template>
    <el-menu
      router
      :style="{height: '100%'}"
      :default-active="$route.path"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="/tracer">
        <i class="el-icon-notebook-2"></i>
        <span>Задачи</span>
      </el-menu-item>
      <el-menu-item index="/tracer/create">
        <i class="el-icon-edit"></i>
        <span>Создать задачу</span>
      </el-menu-item>
      <el-menu-item>
        <i class="el-icon-menu"></i>
        <span>Scrum</span>
      </el-menu-item>
      <el-menu-item index="/tracer/logout">
        <i class="el-icon-d-arrow-left"></i>
        <span>Выход</span>
      </el-menu-item>
    </el-menu>
</template>
