import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'welcome',
			component: () => import('./views/Welcome.vue')
		},
		{
			path: '/epoques',
			name: 'epoques',

			component: () => import('./views/Epoques.vue')
		},
		{
			path: '/egypte',
			component: () => import('./views/epoques/Egypte.vue'),
			children: [{
				path: '',
				component: () => import('./components/egypte/scene1.vue')
			}, {
				path: 'enigme',
				component: () => import('./components/egypte/enigme.vue')
			}, {
				path: 'histoire/1',
				component: () => import('./components/egypte/histoire1.vue')
			}, {
				path: 'scene/2',
				component: () => import('./components/egypte/scene2.vue')
			}, {
				path: 'ninchat',
				component: () => import('./components/egypte/ninchat.vue')
			}, {
				path: 'histoire/2',
				component: () => import('./components/egypte/histoire2.vue')
			}, {
				path: 'scene/3',
				component: () => import('./components/egypte/scene3.vue')
			}, {
				path: 'balance',
				component: () => import('./components/egypte/balance.vue')
			}, {
				path: 'histoire/3',
				component: () => import('./components/egypte/histoire3.vue')
			}
			]
		},
		{
			path: '/collection',
			name: 'collection',

			component: () => import('./views/Collection.vue')
		},
	]
})
