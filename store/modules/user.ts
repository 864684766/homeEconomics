export interface userState {
	token : string,
	info : object
}
const state = () : userState => ({
	token: '', // 登录token
	info: {},  // 用户信息
})

// getters
const getters = {
	token(state : userState) {
		return state.token
	},
	userInfo(state : userState) {
		return state.info
	}
}

// mutations
const mutations = {
	tokenChange(state : userState, token : string) {
		state.token = token
	},
	infoChange(state : userState, info : object) {
		state.info = info
	}
}


// actions
const actions = {
}

export default {
	namespaced: true,
	state,
	actions,
	getters,
	mutations
}