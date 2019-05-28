<template>
	<div class="egypte view">
		<div class="logo"><img src="/assets/images/pictos/bouton-home.png" alt=""></div>
		<div class="view__content">
			<transition name="component-anim">
				<router-view></router-view>
			</transition>

			<div class="anim-elements anim-left">
				<img src="/assets/images/transition-fleur.png" alt="">
			</div>
			<div class="anim-elements anim-right">
				<img src="/assets/images/transition-fleur.png" alt="">
			</div>
		</div>

		<menu-btn></menu-btn>
	</div>
</template>

<script>

	import menuBtn from '@/components/ui/menuBtn';

	export default {
		name: 'epoques',
		components: {
			'menu-btn': menuBtn,
		},

		methods: {

		},

		mounted: function () {

		},

		computed: {}
	}
</script>

<style lang="scss">

	.popup-result {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		height: 100%;
		display: none;
		opacity: 0;
		color: #fff;
		background: rgba(255, 255, 255, 0.8);
		z-index: 30;

		& .result {
			&__container {
				position: absolute;
				top: 45%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 1010px;
				height: 30%;
				text-align: center;
			}

			&__content {
				background-image: url("/assets/images/pictos/bloc_popup.png");
				background-repeat: no-repeat;
				background-position: center center;
				background-size: contain;
				padding: 30px;
			}

			&__title {
				color: white;
				font-size: 79px;
				text-transform: uppercase;
			}

			&__sep {
				height: 12px;
				margin: 20px auto;
				img {
					height: 100%;
				}
			}

			&__text {
				font-size: 20px;
				line-height: 30px;
			}

			&__button {
				background-image: url("/assets/images/pictos/button_popup.png");
				background-repeat: no-repeat;
				background-position: center center;
				background-size: contain;
				text-transform: uppercase;
				padding: 15px 30px;
				margin-top: 10px;
				color: white;
				font-family: "InfiniBold", Avenir, Arial, sans-serif;
			}
		}
	}

	.scene.loading {
		background-image: none;
		background-color: linear-gradient(to bottom, $beige, white);
	}

	.scene {

		.click {
			position:absolute;
			top:50%;
			left:50%;
			transform: translate(-50%, -50%);
			opacity: 0;
			display:none;
			z-index: 110;
			.clickable {
				width:50vw;
				height:50vh;
			}

			&__text {
				position:absolute;
				top:0;
				left: 50%;
				transform: translate(-50%, -100%);
				color: $blue;
				font-size: 24px;
				line-height: 36px;
			}

			&__icon {
				position: absolute;
				bottom: -150%;
				left: 50%;
				transform: translate(-50%, -50%);
				width:25%;
				height:25%;
				pointer-events: none;
			}
		}

		canvas {
			position:absolute;
			z-index:100;
		}

		& .component {
			&__content {
				padding:0;
			}
		}

		&__loader {
			position:absolute;
			top:50%;
			left:50%;
			transform: translate(-50%, -50%);
			width:650px;
			height:650px;
			z-index:200;
			.loader {
				&-mask {
					overflow: hidden;
					height:0;
					position:absolute;
					transform-origin: bottom center;
					z-index:2;
					animation: loading 4s forwards;
					img {
						width:650px;
						height:650px;
					}
				}
			}
			& > img {
				position:absolute;
				width:650px;
				height:650px;
				opacity:0.2;
				z-index:1;
			}
		}
	}

	@keyframes loading {
		from {
			height:0;
		}
		to {
			height: 650px;
		}
	}

	.game {
		background-image: url("/assets/images/ciel-games.jpg");
		background-repeat: no-repeat;
		background-position: center center;
		text-align:center;

		&__ui {
			color: white;
			font-size: 20px;
			line-height: 20px;
			font-family: "InfiniBold", Anvenir, Arial, sans-serif;
			height:10%;
		}

		&__instructions {
			&-text {
				color: white;
				font-size:20px;
				line-height: 30px;
				font-family: "InfiniRegular", Avenir, Arial, sans-serif;
			}
		}

		&__infos {
			display: none;
			opacity: 0;

			color: white;
			font-size: 28px;
			line-height: 42px;
			font-family: "InfiniBold", Anvenir, Arial, sans-serif;

			height:100%;
		}

		&__timer {
			background-image: url("/assets/images/pictos/button-timer-dark.svg");
			background-repeat: no-repeat;
			background-position: center center;
			background-size: contain;
			display:inline-block;
			padding: 0 10px;
			vertical-align: middle;
			position:relative;
			width: 115px;
			height: 50px;
			&.number {
				position:absolute;
				top:50%;
				left:50%;
				transform: translate(-50%, -50%);
			}
		}

		&__life {
			display:inline-flex;
			vertical-align: middle;
			.life {
				width: 40px;
			}
			.life-on {
				width:20px;
			}
			.life-off {
				width:44px;
			}
		}
	}

	.histoire {
		height: 100vh;
		padding: 0;

		background: $blue;

		&__title {
			font-size: 40px;
			line-height: 50px;
			letter-spacing: 1px;
			margin:100px 0 20px;
			color: white;
			text-transform: uppercase;
		}

		&__text {
			font-size: 20px;
			line-height: 30px;
			letter-spacing: 0.3px;
			color: white;
			margin-top: 20px;
			font-family: "InfiniRegular", Avenir, Arial, sans-serif;
		}

		&__content {
			height: 100%;
			display: flex;
			flex-flow: row nowrap;
			justify-content: center;
			align-items: center;
		}

		&__design {
			width: 25vw;
			height: 25vw;
			border-radius: 50%;
			position:absolute;
			top:50%;
			left: 35%;
			transform: translate(-50%, -50%);
		}

		&__left {
			&-container {
				width: 50%;
				height: 100%;
			}

			&-content {
				height: 100%;
				width: 640px;
				padding: 0 120px;
				text-align: left;
				display: flex;
				flex-flow: column nowrap;
				justify-content: center;
			}
		}
		&__right {
			&-container {
				width: 50%;
				height: 100%;
				position:relative;
			}
			&-bg {
				width: 1330px;
				height:1330px;
				border-radius:50%;
				background-color: $darker_beige;
				position:absolute;
				top:50%;
				left:0;
				transform: translateY(-50%);
			}
		}

		&__button-container {
			margin-top: 40px;
			text-align: left;
		}

		&__button {
			background-image: url("/assets/images/pictos/bloc_popup.png");
			background-repeat: no-repeat;
			background-position: center center;
			background-size: contain;
			padding: 15px 20px;
			color: white;
			font-size: 24px;
			line-height: 10px;
			cursor: pointer;
			text-transform: uppercase;
			width: 230px;
			height: 80px;
			font-family: "InfiniBold", Avenir, Arial, sans-serif;
		}
	}

	.anim-elements {
		display:none;
	}

	.anim-left {
		width: 100%;
		position: absolute;
		bottom: -350px;
		left: -350px;
		z-index: 50;
		transform-origin: bottom left;
		transform: rotateZ(-70deg);
		img {
			width: 70%;
		}
	}

	.anim-right {
		width: 100%;
		position: absolute;
		bottom: -350px;
		left: calc(100% + 350px);
		z-index: 50;
		transform-origin: bottom left;
		transform: rotateZ(70deg);
		img {
			width: 70%;
		}
	}

	.component-anim-enter-active {
		animation: fading .5s;
	}
	.component-anime-leave-active {
		animation: fading .5s reverse;
	}
	@keyframes fading {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

</style>