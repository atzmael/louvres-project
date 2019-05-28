<template>
	<div class="epoques view">
		<div class="menu__container">

			<router-link to="/epoques">
				<div class="logo" :style="'position:relative;left: 80px;'"><img src="/assets/images/pictos/bouton-home.png" alt=""></div>
			</router-link>

			<div class="view__content menu">
				<div class="menu__item">
					<router-link to="/egypte">
						<img v-if="!$store.state.egypte.finished" :src="'/assets/images/menu/menu-vignette-1.jpg'"
						     alt="">
						<img v-if="$store.state.egypte.finished" :src="'/assets/images/menu/menu-vignette-1-done.jpg'"
						     alt="">
					</router-link>
				</div>
				<div class="menu__item">
					<img v-if="!$store.state.rome.finished" :src="'/assets/images/menu/menu-vignette-2.jpg'"
						     alt="">
						<img v-if="$store.state.rome.finished" :src="'/assets/images/menu/menu-vignette-2-done.jpg'"
						     alt="">
				</div>
				<div class="menu__item">
					<img v-if="!$store.state.grece.finished" :src="'/assets/images/menu/menu-vignette-3.jpg'"
						     alt="">
						<img v-if="$store.state.grece.finished" :src="'/assets/images/menu/menu-vignette-3-done.jpg'"
						     alt="">
				</div>
				<div class="menu__item">
					<img v-if="!$store.state.babel.finished" :src="'/assets/images/menu/menu-vignette-4.jpg'"
						     alt="">
						<img v-if="$store.state.babel.finished" :src="'/assets/images/menu/menu-vignette-4-done.jpg'"
						     alt="">
				</div>
				<div class="menu__item">
					<img v-if="!$store.state.middle_age.finished" :src="'/assets/images/menu/menu-vignette-6.jpg'"
						     alt="">
						<img v-if="$store.state.middle_age.finished" :src="'/assets/images/menu/menu-vignette-6-done.jpg'"
						     alt="">
				</div>
				<div class="menu__item">
					<img v-if="!$store.state.middle_east.finished" :src="'/assets/images/menu/menu-vignette-5.jpg'"
						     alt="">
						<img v-if="$store.state.middle_east.finished" :src="'/assets/images/menu/menu-vignette-5-done.jpg'"
						     alt="">
				</div>
				<div class="menu__item">
					<router-link to="/collection">
						<div class="bg"></div>
						<div class="menu__item-text">Viens retrouver ici tous les objets que tu as pu dénicher
							durant<br> tes nombreux voyages ...
						</div>
					</router-link>
				</div>
			</div>
		</div>

	</div>
</template>

<script>

	import logo from '@/components/ui/logo';

	import store from '@/store/collection';

	export default {
		name: 'epoques',

		components: {
			logo,
		},

		mounted() {
			window.addEventListener("keypress", function(e) {
				if(e.key == 'u' || e.key == 'U') {
					store.commit('toggleAll');
				}
			});
		}

	}
</script>

<style lang="scss">

	.epoques {
		overflow: auto;
		background-color: $blue;
	}

	.menu {
		padding: 80px 80px 120px;
		width: 2085px;
		height: 2330px;

		box-sizing: border-box;

		display: grid;

		grid-template-columns: 25% 30.5% 38%;
		grid-template-rows: 28.6% 29.4% 10.8% 10.8% 8.7%;
		grid-column-gap: 60px;
		grid-row-gap: 60px;
		grid-template-areas: "one one two" "three four two" "three five five" "six five five" "six seven seven";

		&__item {
			overflow: hidden;
			position: relative;

			img {
				width: 100%;
				height: 100%;
			}

			&-text {
				position: absolute;
				top: 20px;
				left: 20px;
				background-color: $blue_gradient;
				text-transform: uppercase;
				line-height: 32px;
				color: white;
				padding: 20px 30px;
				&::before {
					content: "";
					width: 22px;
					height: 14px;
					position: absolute;
					background-image: url('/assets/images/pictos/picto_sep.svg');
					background-position: center center;
					background-repeat: no-repeat;
					top: 54%;
					left: 6px;
					transform: rotateZ(90deg) translateX(-50%);
				}
				&::after {
					content: "";
					width: 22px;
					height: 14px;
					position: absolute;
					background-image: url('/assets/images/pictos/picto_sep.svg');
					background-position: center center;
					background-repeat: no-repeat;
					top: 54%;
					right: 6px;
					transform: rotateZ(90deg) translateX(-50%);
				}
			}

			&:first-child {
				grid-area: one;
			}
			&:nth-child(2) {
				grid-area: two;
			}
			&:nth-child(3) {
				grid-area: three;
			}
			&:nth-child(4) {
				grid-area: four;
			}
			&:nth-child(5) {
				grid-area: five;
			}
			&:nth-child(6) {
				grid-area: six;
			}
			&:last-child {
				grid-area: seven;
				background: linear-gradient(to top, white 0%, #fbd2b9 96.6%, #fbd0b7 100%);

				position:relative;

				& .bg {
					position: absolute;
					top:0;
					left:0;
					width:100%;
					height:100%;

					background-image: url('/assets/images/planete.png');
					background-position: center center;
					background-repeat: no-repeat;
					background-size: cover;
				}
			}
		}
	}
</style>