<template>
	<div class="logo"><img src="/assets/images/pictos/bouton-home.png" alt=""></div>
</template>

<script>
	export default {
		name: 'logo'
	}
</script>

<style scoped lang="scss">
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
</style>