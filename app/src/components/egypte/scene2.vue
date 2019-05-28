<template>
	<div class="scene2 scene component loading">
		<div class="component__content">
			<div class="scene__loader loader">
				<div class="loader-mask">
					<img src="/assets/images/soleil.png" alt="">
				</div>
				<img src="/assets/images/soleil.png" alt="">
			</div>
			<div id="stage02"></div>
			<div class="click js-click">
				<div class="click__text">
					Clique sur la pirogue
					<div class="click__icon">
						<img src="/assets/images/pictos/fleche-down.svg" alt="">
					</div>
				</div>
				<router-link to="/egypte/ninchat">
					<div class="clickable"></div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import * as Scene2 from '@/assets/scripts/scene2';

	export default {
		name: "scene2",

		mounted: function() {
			Scene2.initialized();
			setTimeout(() => {
				TweenLite.to(document.querySelector('.loader'), 1, {opacity: 0, display: 'none'});
				Scene2.startScene()
			}, 2000)
		}
	}
</script>

<style lang="scss">

</style>