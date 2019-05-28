<template>
	<div class="balance game component" data-name="balance">
		<div class="component__content">
			<div class="game__ui">
				<div class="game__instructions js-instructions">
					<div class="game__instructions-text">
						<span>Cliques sur les flêches</span>
						<img src="/assets/images/pictos/fleches-jeu.svg" alt="">
						<span>pour équilibrer la balance afin que le coeur de Tamoutneferet soit plus léger que la plume de Maât</span>
					</div>
				</div>
				<div class="game__infos js-infos">
					<div class="game__timer js-timer"><p class="number"></p></div>
					<div class="balance__sep sep"><img src="/assets/images/pictos/picto_sep.svg" alt=""></div>
					<div class="game__life js-life-count">
						<div class="life1 life">
							<img class="life-on" v-if="$store.state.egypte.games[3][1]"
							     src="/assets/images/pictos/vie-on.svg" alt="">
							<img class="life-off" v-if="!$store.state.egypte.games[3][1]"
							     src="/assets/images/pictos/vie-off.svg" alt="">
						</div>
						<div class="life2 life">
							<img class="life-on" v-if="$store.state.egypte.games[3][2]"
							     src="/assets/images/pictos/vie-on.svg" alt="">
							<img class="life-off" v-if="!$store.state.egypte.games[3][2]"
							     src="/assets/images/pictos/vie-off.svg" alt="">
						</div>
						<div class="life3 life">
							<img class="life-on" v-if="$store.state.egypte.games[3][3]"
							     src="/assets/images/pictos/vie-on.svg" alt="">
							<img class="life-off" v-if="!$store.state.egypte.games[3][3]"
							     src="/assets/images/pictos/vie-off.svg" alt="">
						</div>
					</div>
				</div>
			</div>
			<div class="balance__container">
				<div class="balance__pied">
					<img src="/assets/images/game_balance/scene-3_pied-balance.png" alt="">
					<div class="balance__anim-container">
						<div class="balance__balancier js-balancier">
							<img src="/assets/images/game_balance/scene-3_barre-balance.png" alt="">
							<div class="balance__leftside js-balance-left"><img
									src="/assets/images/game_balance/scene-3_coeur.png" alt=""></div>
							<div class="balance__rightside js-balance-right"><img
									src="/assets/images/game_balance/scene-3_plume.png" alt=""></div>
						</div>
					</div>
				</div>
			</div>
			<div class="popup-result result js-result">
				<div class="result__container">
					<div class="result__content js-result-content">

					</div>
					<router-link to="/egypte/histoire/3">
						<button class="result__button btn">Continuer</button>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	import balance from '@/assets/scripts/balance';

	export default {
		name: "balance",

		mounted: function () {
			balance.init();
		},
	}
</script>

<style lang="scss">

	.component {
		&__content {
			position: relative;
			display: flex;
			flex-flow: column nowrap;
			height: 100%;
		}
	}

	.game__instructions {
		span {
			vertical-align: middle;
		}
		img {
			width: 60px;
			vertical-align: middle;
			margin: 0 10px;
		}
	}

	.balance {

		&__sep {
			display: inline-block;
			transform: rotateZ(90deg);
			vertical-align: middle;
		}

		&__container {
			position: relative;
			top: 0;
			left: 50%;
			transform: translate(-50%, 0);
			margin-top: 140px;
			height: 60%;
		}
		&__pied {
			& > img {
				position: absolute;
				top: 0;
				left: 50%;
				transform: translate(-50%, 0);
				width: 250px;
			}
		}
		&__leftside {
			position: absolute;
			left: 20px;
			width: 205px;
			height: 50%;
			& > img {
				position: absolute;
				top: -3px;
				transform: translateX(-50%);
				width: 100%;
			}
		}
		&__rightside {
			position: absolute;
			right: 20px;
			width: 205px;
			height: 50%;
			& > img {
				position: absolute;
				top: -3px;
				transform: translateX(-50%);
				width: 100%;
			}
		}
		&__balancier {
			width: 700px;
			height: 20px;
			position: relative;
			transform: rotate(0deg);
			margin: auto;
			& > img {
				position: absolute;
				top: 5px;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 100%;
			}
		}
		&__anim-container {
			position: absolute;
			top: 0;
			left: 50%;
			transform: translate(-50%, 0);
			width: 100%;
		}
	}
</style>