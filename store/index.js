export const state = () => {
  return {
    error: null
  }
}

export const actions = {
  
}

export const mutations = {
  setError(state, error) {
    state.error = error
  },

  clearError(state) {
    state.error = null
  }
}

export const getters = {
  error: state => state.error
}