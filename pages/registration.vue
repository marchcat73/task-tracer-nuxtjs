<template>
  <el-row type="flex" justify="center">
    <el-col :xs="24" :sm="18" :md="12" :lg="10">
      <h1>Регистрация</h1>
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
              <el-form-item label="Пароль" prop="password" :required="true">
                  <el-input
                    v-model.trim="controls.password"
                    type="password"
                  >
                  </el-input>
              </el-form-item>
            </div>
            <div class="mb2">
              <el-form-item label="Подтверждение пароля" prop="checkPass" :required="true">
                <el-input type="password" v-model="controls.checkPass" autocomplete="off"></el-input>
              </el-form-item>
            </div>
            <el-form-item>
              <el-button 
                type="primary" 
                native-type="submit"
                :loading="loading"
              >Зарегистрироваться</el-button>
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
      title: `${process.env.appName} - Регистрация нового пользователя`
    }    
  },
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Поле не должно быть пустым'));
      } else {
        if (this.controls.checkPass !== '') {
          this.$refs.form.validateField('checkPass');
        }
        callback();
      }
    }

    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Поле не должно быть пустым'));
      } else if (value !== this.controls.password) {
        callback(new Error('Два поля не совпадают!'));
      } else {
        callback();
      }
    }

    return {
      loading: false,
      controls: {
        email: '',
        password: '',
        checkPass: ''
      },
      rules: {
        email: [
          { required: true, message: 'Поле не должно быть пустым', trigger: 'blur' },
          { type: 'email', message: 'Пожалуйста введите корректный email адрес', trigger: ['blur', 'change'] }
        ],
        password: [
          // { required: true, message: 'Поле не должно быть пустым', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' },          
          { min: 6, message: 'Пароль должен быть не менее 6 символов', trigger: ['blur', 'change'] }
        ],
        checkPass: [
          // { required: true, message: 'Поле не должно быть пустым', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' },          
          { min: 6, message: 'Пароль должен быть не менее 6 символов', trigger: ['blur', 'change'] }
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

            await this.$store.dispatch('auth/createUser', formData)
            // this.$router.push('/tracer')
            
          } catch (err) {
            this.loading = false
            console.error(err)
          }
        }
      })
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