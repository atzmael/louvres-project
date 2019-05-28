<template>
	<div class="welcome view">
		<div class="welcome__background">
			<video id="video" autoplay="" muted="muted">
				<source src="/assets/animations/home-2.mp4" type="video/mp4">
				Your browser does not support the video tag.
			</video>
		</div>
		<div class="welcome__container">
			<!--<h1 class="welcome__title">
				L'épopée
			</h1>
			-->
			<h3 class="welcome__subtitle">
				Bienvenue à toi explorateur du temps
			</h3>
			<div class="welcome__text">
				<p>Parcours les époques, récupères les trésors et ramènes les à la Petite Galerie.</p>
			</div>

			<div class="welcome__btn">
				<router-link to="/epoques">
					<div class="rotate__button btn"><span>GO</span></div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		name: 'welcome',

		mounted: function() {
			setTimeout(() => {
				document.querySelector('.welcome__subtitle').classList.add('text-visible');
			},3800);

			setTimeout(() => {
				document.querySelector('.welcome__text').classList.add('text-visible');
			},5500);

			setTimeout(() => {
				TweenLite.to(document.querySelector('.welcome__btn'), 0.6, {opacity: 1});
			},5500);
		}
	}

</script>

<style lang="scss">
	.welcome {
		background: linear-gradient(#262b60 6%, #283076 19.5%, #293483 30%, #b491a7 71%, #facfb6 91%);

		width: 100vw;
		height: 100vh;
		position:absolute;
		top:0;
		left:0;

		&__background {
			position:absolute;
			z-index:5;
			top:0;
			left:0;
			width:100vw;
			height:100vh;
			video {
				height:100%;
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
			}
		}

		&__container {
			text-align:center;
			position:absolute;
			width:100%;
			top:50%;
			color: white;
			z-index:10;
		}

		&__subtitle {
			margin-top: 55px;
			font-size: 22px;
			line-height: 45px;
			letter-spacing: 3.3px;
			text-transform: uppercase;
			color: white;
			background: -webkit-gradient(linear, left top, left bottom, color-stop(40%, #FFF), color-stop(70%, transparent));
			background: linear-gradient(to bottom, #FFF 40%, transparent 70%);
			-webkit-background-clip: text;
			background-position-y: -22px;
			background-repeat: no-repeat;
			-webkit-text-fill-color: transparent;

			animation: discoverText 1s forwards;
			animation-delay: 3s;
		}

		&__text {
			margin-top: 135px;
			font-size : 18px;
			line-height : 45px;
			letter-spacing : 0.65px;

			background: -webkit-gradient(linear, left top, left bottom, color-stop(40%, #FFF), color-stop(70%, transparent));
			background: linear-gradient(to bottom, #FFF 40%, transparent 70%);
			-webkit-background-clip: text;
			background-position-y: -22px;
			background-repeat: no-repeat;
			-webkit-text-fill-color: transparent;

			animation: discoverText 1s forwards;
			animation-delay: 4s;
		}

		&__btn {
			opacity: 0;
		}

		.text-visible {
			-webkit-text-fill-color:unset;
		}

		@keyframes discoverText {
			from {
				background-position-y: -22px;
			}
			to {
				background-position-y: 10px;
			}
		}
	}
</style>