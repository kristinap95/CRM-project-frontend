import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoading: false,
    isAuthenticated: false,
    access: '',
    refresh: '',
  },
  getters: {
  },
  mutations: {
    initializeStore(state) {
      if(localStorage.getItem('access')) {
        state.access = localStorage.getItem('access')
        state.refresh = localStorage.getItem('refresh')
        state.isAuthenticated = true
      }
      else {
        state.access = ''
        state.refresh = ''
        state.isAuthenticated = false
      }
    },
    setAccess(state, access) {
      state.access = access
      state.isAuthenticated = true
    },
    setRefresh(state, refresh) {
      state.refresh = refresh
      state.isAuthenticated = true
    },
    setIsLoading(state, status) {
      state.isLoading = status
    },
    removeAccess(state) {
      state.access = ''
      state.refresh = ''
      state.isAuthenticated = false
    } 
  },
  actions: {
  },
  modules: {
  }
})