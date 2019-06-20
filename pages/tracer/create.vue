<template>
  <div class="page-wrap">
    <el-form 
      :model="controls" 
      :rules="rules" 
      ref="form"
      @submit.native.prevent="onSubmit"
    >
      <h2 class="mb">Создание задачи</h2>
      <el-form-item label="Название" prop="title">
        <el-input
          v-model="controls.title"
        ></el-input>
      </el-form-item>
      <el-form-item label="Описание" prop="description">
        <el-input
          type="textarea"
          v-model="controls.description"
          resize="none"
          :rows="10"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="Статус" prop="status">
        <el-select v-model="controls.status" placeholder="Select">
          <el-option
            v-for="item in optionsStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="Приоритет" prop="priority">
        <el-select v-model="controls.priority" placeholder="Select">
          <el-option
            v-for="item in optionsPriority"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button 
          class="mt"
          type="primary" 
          native-type="submit"
          :loading="loading"
        >Создать задачу</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: `${process.env.appName} - Создание задачи`
    }    
  },
  layout: 'tracer',
  middleware: ['tracer-auth'],
  data() {
    return {
      loading: false,
      controls: {
		    title: '',
        description: '',
        // status: 'запланирована',
        priority: 'нормальный'
      },
      rules: {
        title: [
          { required: true, message: 'Поле не должен быть пустым', trigger: 'blur' }
        ],
        description: [
          { required: true, message: 'Поле не должен быть пустым', trigger: 'blur' }
        ]
      },
      // optionsStatus: [{
      //   value: 'запланирована',
      //   label: 'запланирована'
      // }, {
      //   value: 'выполняется',
      //   label: 'выполняется'
      // }, {
      //   value: 'завершена',
      //   label: 'завершена'
      // }],
      optionsPriority: [{
        value: 'нормальный',
        label: 'нормальный'
      }, {
        value: 'высокий',
        label: 'высокий'
      }],
    }
  },

  methods: {
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true

          const formData = {
            title: this.controls.title,
            description: this.controls.description,
            status: this.controls.status,
            priority: this.controls.priority
          }

          try {
            await this.$store.dispatch('task/create', formData)
            this.controls.title = ''
            this.controls.description = ''
            this.controls.status = 'запланирована'
            this.controls.priority = 'нормальный'
            this.$message.success('Задача создана')
          } catch (err) {
            console.error(err)
          } finally {
            this.loading = false
          }

        }
      })
    }
  }
}
</script>
