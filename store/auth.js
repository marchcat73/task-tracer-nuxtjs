import Cookie from 'cookie'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

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
    this.$axios.setToken(token, 'Bearer')
		commit('setToken', token)
		Cookies.set('jwt-token', token)
  },

  setUserId({commit}, userId) {
    commit('setUserId', userId)
  },

  logout({commit}) {
    this.$axios.setToken(false)
    commit('clearToken')
		commit('clearUserId')
		Cookies.remove('jwt-token')
	},
	
	autoLogin({dispatch}) {
		const cookieStr = process.browser
			? document.cookie
			: this.app.context.req.headers.cookie

		const cookies = Cookie.parse(cookieStr || '') || {}
		const token = cookies['jwt-token']

		if (isJWTValid(token)) {
			dispatch('setToken', token)
		} else {
			dispatch('logout')
		}
	}
}

export const getters = {
  isAuthenticated: state => Boolean(state.token),
  token: state => state.token,
  userId: state => state.userId
}


function isJWTValid(token) {
	if (!token) {
		return false
	}

	const jwtData = jwtDecode(token) || {}
	const expires = jwtData.exp || 0

	return (new Date().getTime() / 1000) < expires
}
