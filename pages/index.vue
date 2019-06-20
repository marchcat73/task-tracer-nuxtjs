<template>
  <el-row type="flex" justify="center">
    <el-col :xs="24" :sm="18" :md="12" :lg="10">
      <h1>Войдите в систему</h1>
        <el-card class="box-card" shadow="always">
          <el-form 
            :model="controls" 
            :rules="rules" 
            ref="form"
            @submit.native.prevent="onSubmit"
          >
            <el-form-item label="E-mail" prop="email">
              <el-input v-model.trim="controls.email"></el-input>
            </el-form-item>
            <div class="mb2">
              <el-form-item label="Пароль" prop="password">
                  <el-input
                    v-model.trim="controls.password"
                    type="password"
                  >
                  </el-input>
              </el-form-item>
            </div>
            <el-form-item>
              <el-button 
                type="primary" 
                native-type="submit"
                :loading="loading"
              >Войти</el-button>
            </el-form-item>
          </el-form>
        </el-card>
    </el-col>
  </el-row>
</template>

<script>


export default {
  head() {
    return {
      title: `${process.env.appName} - Вход в систему`
    }    
  },
  data() {
    return {
      loading: false,
      controls: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { required: true, message: 'Поле не должно быть пустым', trigger: 'blur' },
          { type: 'email', message: 'Пожалуйста введите корректный email адрес', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: 'Введите пароль', trigger: 'blur' },
          { min: 6, message: 'Пароль должен быть не менее 6 символов', trigger: ['blur', 'change'] },

        ]
      }
    }
  },

  methods: {
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true

          try {
            const formData = {
              email: this.controls.email,
              password: this.controls.password
            }

            await this.$store.dispatch('auth/login', formData)
            this.$router.push('/tracer')
          } catch (e) {
            this.loading = false
            // console.error(e)
          }
        }
      })
    }
  },

  mounted() {
    const {message} = this.$route.query

    switch (message) {
      case 'login':
        this.$message.warning('Для начала войдите в систему')
        break
      case 'logout':
        this.$message.info('Вы покинули систему')
        break
      case 'session':
        this.$message.warning('Время сессии истекло')
        break
    }
  }
}
</script>

<style lang="scss" scoped>
  h1 {
    margin-top: 2rem;
    margin-bottom: 2.5rem;
  }
</style>
