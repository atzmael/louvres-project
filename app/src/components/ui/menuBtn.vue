<template>
	<router-link to="/epoques">
		<div class="menu-open btn js-menu-btn"><img src="/assets/images/pictos/bouton-menu.png" alt=""></div>
	</router-link>
</template>

<script>
	export default {
		name: "menuBtn"
	}
</script>

<style lang="scss">
	.menu-open {
		position:absolute;
		top:30px;
		right:60px;
		width:60px;
		height:60px;
		img {
			width:100%;
			height:100%;
		}
	}
</style>