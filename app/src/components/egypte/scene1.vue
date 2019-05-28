<template>
	<div class="scene1 scene component loading">
		<div class="component__content">
			<div class="scene__loader loader">
				<div class="loader-mask">
					<img src="/assets/images/soleil.png" alt="">
				</div>
				<img src="/assets/images/soleil.png" alt="">
			</div>
			<div id="stage01"></div>
			<div class="click js-click">
				<div class="click__text">
					Clique sur la pyramide
					<div class="click__icon">
						<img src="/assets/images/pictos/fleche-down.svg" alt="">
					</div>
				</div>
				<router-link to="/egypte/enigme">
					<div class="clickable"></div>
				</router-link>
			</div>

		</div>
	</div>
</template>

<script>
	import * as Scene1 from '@/assets/scripts/scene1';

	export default {
		name: "scene1",

		mounted: function() {
			Scene1.initialized();
			setTimeout(() => {
				TweenLite.to(document.querySelector('.loader'), 1, {opacity: 0, display: 'none'});
				Scene1.startScene();
			}, 2000)
		}
	}
</script>

<style lang="scss">

</style>