// export const state = () => {
//   return {
//     timeSpend: 132
//   }
// }

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
	},
	
	async addTime({commit}, {timeSpend, _id}) {

		try {
			return await this.$axios.$put(`/api/task/add/time/${_id}`, {timeSpend})
		} catch (err) {
      commit('setError', err, {root: true})
      throw err
		}
	},

	async statusMake({commit}, {status, _id}) {

		try {
			return await this.$axios.$put(`/api/task/status/make/${_id}`, {status})
		} catch (err) {
      commit('setError', err, {root: true})
      throw err
		}
	}
}

// export const getters = {
//   timeSpend: state => moment(state.timeSpend).format('hh:mm')
// }

// function getTimeFromMins(mins) {
//   let hours = Math.trunc(mins/60);
//   let minutes = mins % 60;
//   if (hours < 10) {
//     hours = `0${hours}`
//   }
//   if (minutes < 10) {
//     minutes = `0${minutes}`
//   }
//   return hours + ':' + minutes;
// };