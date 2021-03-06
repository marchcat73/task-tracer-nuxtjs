<template>
  <div>
    <h1 class="mb">Добро пожаловать в планировщик задач</h1>
    <el-table
      :data="tasks"
      :default-sort = "{prop: 'taskDate', order: 'descending'}"
      style="width: 100%">
      <el-table-column
        prop="taskDate"
        label="Дата"
        sortable
        width="200">
      <template slot-scope="{row: {taskDate}}">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ taskDate | date('date') }}</span>
      </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="Название"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="priority"
        label="Приоритет"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="Статус"
        width="180"
        :filters="[{ text: 'запланирована', value: 'запланирована' }, { text: 'выполняется', value: 'выполняется' }, { text: 'завершена', value: 'завершена' }]"
        :filter-method="filterStatus"
        filter-placement="bottom-end"
      >
      </el-table-column>
      <el-table-column
        label="Действия">
        <template slot-scope="{row}">
          <el-button
            size="mini"
            type="primary"
            @click="open(row._id)"
          >Открыть</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="remove(row._id, row.title)"
          >Удалить</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: `${process.env.appName} - Список задач`
    }    
  },
  layout: 'tracer',
  middleware: ['tracer-auth'],

  data () {
    return {
      auto: null
    }
  },

  async asyncData({store}) {
    const tasks = await store.dispatch('task/fetchTask')
    return {tasks}
  },

  methods: {
    filterStatus(value, row) {
      return row.status === value;
    },

    open(id) {
      this.$router.push(`/tracer/task/${id}`)
    },

    async remove(id, title) {
      try {
        await this.$confirm('Удалить задачу?', 'Внимание!', {
          confirmButtonText: 'Да',
          cancelButtonText: 'Отменить',
          type: 'warning'
        })

        await this.$store.dispatch('task/remove', id)

        this.tasks = this.tasks.filter(t => t._id !== id)

        this.$message.success(`Задача ${title} удалена`)

      } catch (err) {
        console.error(err)
      }
    },

    startAuto() {
      this.auto = window.setInterval(async () => {
        if (!this.$store.getters['auth/isAuthenticated']) {
          return false
        }
        try {
          this.tasks = await this.$store.dispatch('task/fetchTask')
        } catch (err) {
          console.error(err)
        }
      }, 300000)
      
    },

    stopAuto() {
      if (this.auto) {
        window.clearInterval(this.auto)
      }
    }
  },

  mounted () {
    this.startAuto()
  },

  beforeDestroy () {
    this.stopAuto()
  }

}
</script>

