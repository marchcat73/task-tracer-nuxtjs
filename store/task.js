
export const actions = {
  async fetchTask({commit}) {
		try {
			return await this.$axios.$get('/api/task')
		} catch (err) {
      commit('setError', err, {root: true})
      throw err
		}
  },

  async remove({commit}, id) {
		try {
			return await this.$axios.$delete(`/api/task/${id}`)
		} catch (err) {
      commit('setError', err, {root: true})
      throw err
		}
  },

  async update({commit}, {id, title, description, priority, status}) {
		try {
			return await this.$axios.$put(`/api/task/${id}`, {title, description, priority, status})
		} catch (err) {
      commit('setError', err, {root: true})
      throw err
		}
  },

  async create({commit}, formData) {
	  try {
			
      return await this.$axios.$post('/api/task', formData)

    } catch (err) {
      commit('setError', err, {root: true})
      throw err
    }

  },

  async fetchTaskById({commit}, id) {
		try {
			return await this.$axios.$get(`/api/task/${id}`)
		} catch (err) {
      commit('setError', err, {root: true})
      throw err
		}
  }
}