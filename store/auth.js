export const state = () => ({
  token: true
})

export const mutations = {
  setToken(state, token) {
    state.token = token
  },

  clearToken(state) {
    state.token = null
  }
}

export const actions = {
  async login({commit, dispatch}, formData) {

    try {
	  const {token} = this.$axios.$post('/api/auth/admin/login', formData)
	  console.log(token)
      dispatch('setToken', token)
    } catch (err) {
      commit('setError', err, {root: true})
      throw err
    }

  },

  async createUser({commit}, formData) {
    try {
      console.log('createUser', formData)
      this.$router.push('/')

    } catch (err) {

      console.error(err)
    }
  },

  setToken({commit}, token) {
    commit('setToken', token)
  },

  logout({commit}) {
    commit('clearToken')
  }
}

export const getters = {
  isAuthenticated: state => Boolean(state.token)
}