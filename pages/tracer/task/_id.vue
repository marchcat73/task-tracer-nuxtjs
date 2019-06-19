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
          {{new Date(task.taskDate).toLocaleString()}}
        </small>
      </div>
      <div class="task-body mb2">
        {{ task.description }}
      </div>
      <div class="task-footer clearfix">
        <small class="pr2">
          <i class="el-icon-timer"></i>
          <time class="time" :v-model="displayTime">{{ displayTime }}</time>
        </small>
        <el-button
          circle
          :loading="loading"
          icon="el-icon-video-play"
          class="task-button"
          @click="startTime"
        ></el-button>
        <el-button
          circle
          :loading="loading"
          icon="el-icon-video-pause"
          class="task-button"
          @click="stopTime"
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
  },
  data() {
    return {
      loading: false,
      interval: null
    }
  },
  methods: {
    getTimeFromMins(mins) {
      let hours = Math.trunc(mins/60);
      let minutes = Math.floor(mins % 60);
      if (hours < 10) {
        hours = `0${hours}`
      }
      if (minutes < 10) {
        minutes = `0${minutes}`
      }
      return hours + ':' + minutes;
    },

    startTime() {
      this.interval = window.setInterval(() => {
        this.task.timeSpend = this.task.timeSpend + 1
      }, 1000)
    },

    stopTime() {
      if (this.interval) {
        window.clearInterval(this.interval)
      }
    }
  },
  computed: {
    displayTime() {
      return this.getTimeFromMins(this.task.timeSpend/60)
    }
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


