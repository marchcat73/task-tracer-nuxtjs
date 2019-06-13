<template>
  <div>
    <h1 class="mb">Добро пожаловать в планировщик задач</h1>
    <el-table
      :data="tasks"
      :default-sort = "{prop: 'date', order: 'descending'}"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="Дата"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="title"
        label="Название"
        width="180">
      </el-table-column>
      <el-table-column
        prop="priority"
        label="Приоритет"
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
            @click="remove(row._id)"
          >Удалить</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  layout: 'tracer',
  middleware: ['tracer-auth'],

  async asyncData({store}) {
    const tasks = await store.dispatch('task/fetchTask')
    return {tasks}
  },

  methods: {
    filterStatus(value, row) {
      return row.status === value;
    },

    open(id) {
      console.log(id)
    },

    remove(id) {
      console.log(id)
    }
  }

}
</script>

