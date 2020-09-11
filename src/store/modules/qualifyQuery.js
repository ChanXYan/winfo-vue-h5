const state = {
  hgzExam: [],
  srExam: []
}

const getters = {
}

const mutations = {
  setHgzExam (state, payload) {
    state.hgzExam = [...payload]
  },
  setSrExam (state, payload) {
    state.srExam = [...payload]
  },
}

const actions = {
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
