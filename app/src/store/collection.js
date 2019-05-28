import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		egypte: {
			finished: false,
			objects: {
				1: {
					found: false,
					broken: true,
				},
				2:  {
					found: true,
					broken: false,
				},
				3: {
					found: false,
					broken: false,
				},
			},
			games: {
				1: {
					1: true,
					2: true,
					3: true,
				},
				2: {
					1: true,
					2: true,
					3: true,
				},
				3: {
					1: true,
					2: true,
					3: true,
				}
			}
		},
		rome: {
			finished: false,
			objects: {
				1: {
					found: false,
					broken: false,
				},
				2:  {
					found: false,
					broken: false,
				},
				3: {
					found: false,
					broken: false,
				},
			},
			games: {
				1: {
					1: true,
					2: true,
					3: true,
				},
				2: {
					1: true,
					2: true,
					3: true,
				},
				3: {
					1: true,
					2: true,
					3: true,
				}
			}
		},
		grece: {
			finished: false,
			objects: {
				1: {
					found: false,
					broken: false,
				},
				2:  {
					found: false,
					broken: false,
				},
				3: {
					found: false,
					broken: false,
				},
			},
			games: {
				1: {
					1: true,
					2: true,
					3: true,
				},
				2: {
					1: true,
					2: true,
					3: true,
				},
				3: {
					1: true,
					2: true,
					3: true,
				}
			}
		},
		babel: {
			finished: false,
			objects: {
				1: {
					found: false,
					broken: false,
				},
				2:  {
					found: false,
					broken: false,
				},
				3: {
					found: false,
					broken: false,
				},
			},
			games: {
				1: {
					1: true,
					2: true,
					3: true,
				},
				2: {
					1: true,
					2: true,
					3: true,
				},
				3: {
					1: true,
					2: true,
					3: true,
				}
			}
		},
		middle_age: {
			finished: false,
			objects: {
				1: {
					found: false,
					broken: false,
				},
				2:  {
					found: false,
					broken: false,
				},
				3: {
					found: false,
					broken: false,
				},
			},
			games: {
				1: {
					1: true,
					2: true,
					3: true,
				},
				2: {
					1: true,
					2: true,
					3: true,
				},
				3: {
					1: true,
					2: true,
					3: true,
				}
			}
		},
		middle_east: {
			finished: false,
			objects: {
				1: {
					found: false,
					broken: false,
				},
				2:  {
					found: false,
					broken: false,
				},
				3: {
					found: false,
					broken: false,
				},
			},
			games: {
				1: {
					1: true,
					2: true,
					3: true,
				},
				2: {
					1: true,
					2: true,
					3: true,
				},
				3: {
					1: true,
					2: true,
					3: true,
				}
			}
		},
	},
	mutations: {
		unlockEgypt(state) {
			state.egypte.finished = true;
		},
		toggleAll(state) {
			state.rome.finished = !state.rome.finished;
			state.grece.finished = !state.grece.finished;
			state.babel.finished = !state.babel.finished;
			state.middle_age.finished = !state.middle_age.finished;
			state.middle_east.finished = !state.middle_east.finished;
		},
		egyptFindObject(state, n) {
			state.egypte.objects[n].found = true;
		},
		egyptBrokeObject(state, n) {
			state.egypte.objects[n].broken = true;
		},
		egyptGameHandler(state, payload) {
			state.egypte.games[payload.game][payload.life] = false;
		}
	}
});

export default store;