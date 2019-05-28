<template>
	<div class="ninchat game component" data-name="ninchat">
		<div class="component__content">
			<div class="game__ui">
				<div class="game__instructions js-instructions">
					<div class="game__instructions-text">
						Survole les poissons et les serpents Apophis pour aider Bastet à protéger Tamoutneferet
					</div>
				</div>
				<div class="game__infos js-infos">
					<div class="game__infos-score score">
						<div class="score-fish js-score-fish"></div>
						<div class="ninchat__sep sep"><img src="/assets/images/pictos/picto_sep.svg" alt=""></div>
						<div class="score-snake js-score-snake"></div>
					</div>
				</div>
			</div>
			<div class="ninchat__container">
				<canvas id="canvas"></canvas>

				<div class="img-source">
					<img id="fish1-left" src="/assets/images/game_ninchat/scene-2_poisson-1-2.png"
					     alt="Poisson 1">
					<img id="fish2-left" src="/assets/images/game_ninchat/scene-2_poisson-2-2.png"
					     alt="Poisson 2">
					<img id="fish3-left" src="/assets/images/game_ninchat/scene-2_poisson-3-2.png"
					     alt="Poisson 3">

					<img id="fish1-right" src="/assets/images/game_ninchat/scene-2_poisson-1.png"
					     alt="Poisson 1">
					<img id="fish2-right" src="/assets/images/game_ninchat/scene-2_poisson-2.png"
					     alt="Poisson 2">
					<img id="fish3-right" src="/assets/images/game_ninchat/scene-2_poisson-3.png"
					     alt="Poisson 3">
					<img id="snake" src="/assets/images/game_ninchat/scene-2_serpent.png" alt="">
					<img id="cat" src="/assets/images/game_ninchat/scene-2_pirogue-chat-dos.png"
					     alt="Chat">

					<img id="vague1" src="/assets/images/game_ninchat/scene-2_vague-3.png" alt="">
					<img id="vague2" src="/assets/images/game_ninchat/scene-2_vague-2.png" alt="">
					<img id="vague3" src="/assets/images/game_ninchat/scene-2_vague-1.png" alt="">
				</div>
			</div>
			<div class="popup-result result js-result">
				<div class="result__container">
					<div class="result__content js-result-content">

					</div>
					<router-link to="/egypte/histoire/2">
						<button class="result__button btn">Continuer</button>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Ninchat from '@/assets/scripts/ninchat';

	export default {
		name: "ninchat",
		game: undefined,

		mounted: function () {
			this.game = new Ninchat();
			this.game.init();
		},

		beforeDestroy: function () {
			this.game.kill();
			this.game = undefined;
		}
	}
</script>

<style lang="scss">
	.ninchat {

		&__sep {
			display: inline-block;
			transform: rotateZ(90deg);
			vertical-align: middle;
			img {
				width: 80%;
			}
		}
	}

	.game {
		padding: 0;

		background-color: $beige;

		.img-source {
			opacity: 0;
			position: absolute;
			z-index: -1;
			display: none;
		}

		&__ui {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 8%;
			left: 50%;
			transform: translate(-50%, 0);
		}

		&__instructions, &__infos {
			position: absolute;
			top: 0;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		&__life {
			opacity: 0;
		}

		&__timer {
			background-image: url("/assets/images/pictos/button-timer-light.svg");
		}

		&__infos {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			width: 100%;

			&-score {
				& > * {
					display: inline-block;
				}
			}

			&-question {

			}

			&-answer {
				padding: 0 0 5px 0;
				color: white;
				font-size: 45px;
				text-align: center;
				background: none;
				border: none;
				input {
					border-bottom: 1px solid white;
				}
				&:focus {
					outline: none;
				}
				&::placeholder {
					color: #3d4e93;
				}
				&.false {
					animation: shake .6s cubic-bezier(.36, .07, .19, .97) both;
				}
			}
		}
	}

	.component__content {
		padding: 0;
	}
</style>