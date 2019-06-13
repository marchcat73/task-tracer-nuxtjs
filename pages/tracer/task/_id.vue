<template>
	<div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/tracer/">Задачи</el-breadcrumb-item>
      <el-breadcrumb-item>{{ $route.params.id }}</el-breadcrumb-item>
    </el-breadcrumb>
	</div>
</template>

<script>
export default {
  layout: 'tracer',
  middleware: ['tracer-auth']
}
</script>

