<template>
	<div id="app">

		<transition name="router-anim">
			<router-view/>
		</transition>
	</div>
</template>

<script>

	import Vue from 'vue';

	import TweenLite from 'gsap';

	const app = new Vue({
		$el: '#app',

		methods: {
			openMenu: function (e) {
				e.target.css({
					"opacity": "0"
				})
			}
		}

	})

	export default app;
</script>

<style lang="scss">

	@font-face {
		font-family: "InfiniRegular";
		src: url("/assets/fonts/Romain/infini-romain.eot"),
		url("/assets/fonts/Romain/infini-romain.woff") format("woff"),
		url("/assets/fonts/Romain/infini-romain.svg") format('svg'),
		url("/assets/fonts/Romain/infini-romain.ttf") format('truetype');
	}

	@font-face {
		font-family: "InfiniItalic";
		src: url("/assets/fonts/Italique/infini-italique.eot"),
		url("/assets/fonts/Italique/infini-italique.woff") format("woff"),
		url("/assets/fonts/Italique/infini-italique.svg") format('svg'),
		url("/assets/fonts/Italique/infini-italique.ttf") format('truetype');
	}

	@font-face {
		font-family: "InfiniBold";
		src: url("/assets/fonts/Gras/infini-gras.eot"),
		url("/assets/fonts/Gras/infini-gras.woff") format("woff"),
		url("/assets/fonts/Gras/infini-gras.svg") format('svg'),
		url("/assets/fonts/Gras/infini-gras.ttf") format('truetype');
	}

	h1 {
		color: $blue;
		font-family: "InfiniBold", Avenir, Arial, sans-serif;
		font-size:22px;
		line-height: 30px;
	}

	h2 {
		color: $blue;
		font-family: "InfiniBold", Avenir, Arial, sans-serif;
		font-size:22px;
		line-height: 30px;
	}

	h3 {
		color: $blue;
		font-family: "InfiniBold", Avenir, Arial, sans-serif;
		font-size:22px;
		line-height: 30px;
	}

	p {
		font-family: "InfiniRegular", Avenir, Arial, sans-serif;
		font-size:20px;
		line-height: 18px;
	}

	a {
		color: $beige;
		&:hover,
		&:active,
		&:focus,
		&:visited {
			color: $beige;
		}
	}


	body {
		margin: 0;
		overflow: hidden;
		color: white;
		background: $beige;
	}

	#app {
		font-family: "InfiniRegular" ,Avenir, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		height: 100vh;
	}

	#nav {
		padding: 30px;
		a {
			font-weight: bold;
			color: $blue;
			background-color: $beige;
			&.router-link-exact-active {
				color: $beige;
			}
		}
	}

	.view {
		height: 100%;
		box-sizing: border-box;
		&__content {
			height:100%;
		}
	}

	.sep {
		height: 12px;
		width:46px;
		margin: 20px 0;
		position:relative;
		img {
			height: 100%;
			position:absolute;
			top:50%;
			left:50%;
			transform: translate(-50%, -50%);
		}
	}

	.logo {
		position: fixed;
		top: 30px;
		left: 60px;
		z-index: 20;
		padding-bottom: 5px;
		line-height: 15px;

		width: 60px;
		height: 60px;

		img {
			width: 100%;
			height: 100%;
			transform: rotateZ(45deg);
		}
	}

	.component {
		height: 100%;
		box-sizing: border-box;

		background-image: url("/assets/images/ciel.jpg");
		background-position: center center;
		background-repeat: no-repeat;
		background-size: cover;

		&__content {
			padding: 60px 30px;
		}
	}

	.btn {
		font-family: "InfiniItalic", Avenir, sans-serif;
		border: none;
		background-color: transparent;
		font-size: 18px;
		line-height: 30px;
		cursor: pointer;
	}

	.router-anim-enter-active {
		animation: main-coming 0.4s;
		animation-delay: .4s;
		opacity: 0;
	}

	.router-anim-leave-active {
		animation: main-going 0.4s;
	}

	@keyframes main-going {
		from {
			opacity:1;
		}
		to {
			opacity: 0;
		}
	}

	@keyframes main-coming {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.rotate__button {
		width:80px;
		height:80px;
		margin: 60px auto 0;
		border-radius: 50%;
		border: 0.5px solid white;
		font-size : 18px;
		line-height : 12px;
		color: white;
		position:relative;
		font-family: "InfiniBold", Avenir, Arial, sans-serif;

		& span {
			position:absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
		&::before {
			content:"";
			position:absolute;
			left:calc(50% + 0.5px);
			top:calc(50% - 0.5px);
			width:100%;
			height:100%;
			transform: translate(-50%, -50%) rotateZ(100deg);
			border-radius: 50%;
			border:3px solid transparent;
			border-top: 3px solid white;
			border-right: 3px solid white;
		}
		&:hover::before {
			animation: rotation 1.5s infinite;
		}

		@keyframes rotation{
			0% {
				transform: translate(-50%, -50%) rotateZ(100deg);
			}
			90% {
				transform: translate(-50%, -50%) rotateZ(-260deg);
			}
			100% {
				transform: translate(-50%, -50%) rotateZ(-260deg);
			}
		}
	}

</style>
