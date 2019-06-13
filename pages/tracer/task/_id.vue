<template>
	<div>
    <el-breadcrumb separator="/" class="mb">
      <el-breadcrumb-item to="/tracer/">Задачи</el-breadcrumb-item>
      <el-breadcrumb-item>{{ task.title }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" shadow :body-style="{ padding: '0px' }">
      <div slot="header" class="task-header">
        <span>{{ task.title }}</span>
        <small>
          <i class="el-icon-time"></i>
          {{task.date}}
        </small>
      </div>
      <div class="task-body mb2">
        {{ task.description }}
      </div>
      <div class="task-footer clearfix">
        <small class="pr2">
          <i class="el-icon-timer"></i>
          <time class="time">{{ task.spenttime }}</time>
        </small>
        <el-button
          circle
          :loading="loading"
          icon="el-icon-video-play"
          class="task-button"
        ></el-button>
        <el-button
          circle
          :loading="loading"
          icon="el-icon-video-pause"
          class="task-button"
        ></el-button>
      </div>
    </el-card>
	</div>
</template>

<script>
export default {
  layout: 'tracer',
  middleware: ['tracer-auth'],
  head() {
    return {
      title: `Задача - ${this.task.title}`
    }
  },
  validate({params}) {
    return Boolean(params.id)
  },
  async asyncData({store, params}) {
    const task = await store.dispatch('task/fetchTaskById', params.id)
    return {task}
  }
}
</script>

<style lang="scss" scoped>
  .task-header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }

  .task-body {
    padding: 18px 20px;
  }
  .task-footer {
    padding: 18px 20px;
    border-top: 1px solid #EBEEF5;
    box-sizing: border-box;
  }
  .task-button {
    padding: 0;
    font-size: 16px;
  }
</style>


