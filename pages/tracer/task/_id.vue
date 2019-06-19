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
				<div>
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
					<el-button 
						type="success"
						:loading="loading"
					>Завершить</el-button>
				</div>
				<div class="task-status">
					<p>Статус: {{task.status}}</p>
				</div>
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
    getTimeFromMins(sec) {
      let hours = Math.trunc(sec/3600);
			let minutes = Math.trunc(sec/60);
			let seconds = Math.floor(sec % 60)
      if (hours < 10) {
        hours = `0${hours}`
      }
      if (minutes < 10) {
        minutes = `0${minutes}`
			}
      if (seconds < 10) {
        seconds = `0${seconds}`
      }
      return `${hours}:${minutes}:${seconds}`
    },

    async startTime() {
			
      if (!this.$store.getters['auth/isAuthenticated']) {
          return false
			}

			if (this.task.status === 'запланирована') {
				this.loading = true
				this.task.status = 'выполняется'				
				try {
					await this.$store.dispatch('task/statusMake', this.task)
					this.loading = false
				} catch (err) {
					this.loading = false
					console.error(err)
				}
			}
      this.interval = window.setInterval(() => {
        this.task.timeSpend = this.task.timeSpend + 1
			}, 1000)
			this.$message.success('Таймер запущен')
    },

    async stopTime() {
      if (this.interval) {
				window.clearInterval(this.interval)
				this.loading = true
				try {
					await this.$store.dispatch('task/addTime', this.task)
					this.loading = false
				} catch (err) {
					this.loading = false
					console.error(err)
				}
				this.interval = null
				this.$message.success('Таймер остановлен')
			}			
    }
  },
  computed: {
    displayTime() {
      return this.getTimeFromMins(this.task.timeSpend)
    }
	},
  beforeDestroy () {
    this.stopTime()
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
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
  }
  .task-button {
    padding: 0;
    font-size: 16px;
  }
</style>


