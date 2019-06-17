export const state = () => ({
  token: null,
  userId: null
})

export const mutations = {
  setToken(state, token) {
    state.token = token
  },

  clearToken(state) {
    state.token = null
  },

  setUserId(state, userId) {
    state.userId = userId
  },

  clearUserId(state) {
    state.userId = null
  }
}

export const actions = {
  async login({commit, dispatch}, formData) {

    try {
      const {token, userId} = await this.$axios.$post('/api/auth/admin/login', formData)
      dispatch('setToken', token)
      dispatch('setUserId', userId)
    } catch (err) {
      commit('setError', err, {root: true})
      throw err
    }

  },

  async createUser({commit}, formData) {
    try {
      await this.$axios.$post('/api/auth/admin/register', formData)
      this.$router.push('/')

    } catch (err) {
      commit('setError', err, {root: true})
      throw err
    }
  },

  setToken({commit}, token) {
    commit('setToken', token)
  },

  setUserId({commit}, userId) {
    commit('setUserId', userId)
  },

  logout({commit}) {
    commit('clearToken')
    commit('clearUserId')
  }
}

export const getters = {
  isAuthenticated: state => Boolean(state.token)
}