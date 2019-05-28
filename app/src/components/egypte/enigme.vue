<template>
	<div class="enigme game component" data-name="enigme">
		<div class="component__content">
			<div class="component__background"></div>
			<div class="enigme__container">
				<canvas id="canvas"></canvas>

				<div class="img_source">
					<img class="background" src="/assets/images/game_enigma/bg_hover.jpg" alt="">
				</div>
			</div>
			<div class="game__ui">
				<div class="game__instructions js-instructions">
					<div class="game__instruction-text js-instruction-text">
						<p>
							Découvre ce qui se cache derrière ces hiéroglyphes <br>
							puis réponds à la question …
						</p>
					</div>
					<div class="game__instruction-pictos">
						<img src="" alt="">
						<img src="" alt="">
					</div>
				</div>
				<div class="game__life js-life-count">
					<div class="life1 life">
						<img class="life-on" v-if="$store.state.egypte.games[1][1]"
						     src="/assets/images/pictos/vie-on.svg" alt="">
						<img class="life-off" v-if="!$store.state.egypte.games[1][1]"
						     src="/assets/images/pictos/vie-off.svg" alt="">
					</div>
					<div class="life2 life">
						<img class="life-on" v-if="$store.state.egypte.games[1][2]"
						     src="/assets/images/pictos/vie-on.svg" alt="">
						<img class="life-off" v-if="!$store.state.egypte.games[1][2]"
						     src="/assets/images/pictos/vie-off.svg" alt="">
					</div>
					<div class="life3 life">
						<img class="life-on" v-if="$store.state.egypte.games[1][3]"
						     src="/assets/images/pictos/vie-on.svg" alt="">
						<img class="life-off" v-if="!$store.state.egypte.games[1][3]"
						     src="/assets/images/pictos/vie-off.svg" alt="">
					</div>
				</div>
				<div class="game__infos js-infos">
					<div class="game__infos-answer js-input">
						<div class="game__infos-question">Qui repose dans ce tombeau ?</div>
						<input id="answer" class="game__infos-answer" type="text" name="answer"
						       placeholder="Ta réponse">
					</div>
				</div>
			</div>
			<div class="popup-result result js-result">
				<div class="result__container">
					<div class="result__content js-result-content">

					</div>
					<router-link to="/egypte/histoire/1">
						<button class="result__button btn">Continuer</button>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	import enigme from '@/assets/scripts/enigme';

	export default {
		name: "enigme",

		mounted: function () {
			enigme.init();
		}
	}
</script>

<style lang="scss">
	.game {
		padding: 0;
		background: $blue;

		.img-source {
			opacity: 0;
			position:absolute;
			z-index:-1;
		}

		&__ui {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		&__instructions, &__life {
			position: absolute;
			top: 10%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		&__instruction-text {
			line-height:28px;
		}

		&__life {
			opacity: 0;
		}

		&__timer {
			background-image: url("/assets/images/pictos/button-timer-light.svg");
		}

		&__infos {
			position: absolute;
			bottom: -75%;
			left: 50%;
			transform: translateX(-50%);
			width: 100%;

			&-question {
				font-size: 20px;
				line-height: 30px;
				font-family: "InfiniBold", Avenir, Arial, sans-serif;
			}

			&-answer {
				padding: 0 0 5px 0;
				color: white;
				text-align: center;
				background: none;
				border: none;
				font-size: 22px;
				line-height: 28px;
				margin-top:10px;
				font-family: "InfiniItalic", Avenir, Arial, sans-serif;
				input {
					border-bottom: 1px solid white;
				}
				&:focus {
					outline: none;
				}
				&::placeholder {
					color: white;
				}
				&.false {
					animation: shake .6s cubic-bezier(.36, .07, .19, .97) both;
				}
			}
		}

		.component__content {
			padding:0;
			background: url("/assets/images/game_enigma/bg_default.jpg") no-repeat center center fixed;
			background-size: contain;
		}
	}

	@keyframes shake {
		10%, 90% {
			transform: translate3d(-1px, 0, 0);
		}
		20%, 80% {
			transform: translate3d(2px, 0, 0);
		}
		30%, 50%, 70% {
			transform: translate3d(-4px, 0, 0);
		}
		40%, 60% {
			transform: translate3d(4px, 0, 0);
		}
	}

</style>