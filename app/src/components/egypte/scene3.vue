<template>
	<div class="scene3 scene component loading">
		<div class="component__content">
			<div class="scene__loader loader">
				<div class="loader-mask">
					<img src="/assets/images/soleil.png" alt="">
				</div>
				<img src="/assets/images/soleil.png" alt="">
			</div>
			<div id="stage03"></div>
			<div class="click js-click">
				<div class="click__text">
					Clique sur le sarcophage
					<div class="click__icon">
						<img src="/assets/images/pictos/fleche-down-blanche.svg" alt="">
					</div>
				</div>
				<router-link to="/egypte/balance">
					<div class="clickable"></div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import * as Scene3 from '@/assets/scripts/scene3';

	export default {
		name: "scene3",

		mounted: function() {
			Scene3.initialized();
			setTimeout(() => {
				TweenLite.to(document.querySelector('.loader'), 1, {opacity: 0, display: 'none'});
				Scene3.startScene()
			}, 2000)
		}
	}
</script>

<style lang="scss">
	.click {
		&__text {
			color: white!important;
		}
	}
</style>