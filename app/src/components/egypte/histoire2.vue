<template>
	<div class="histoire2 histoire component" data-name="histoire2">
		<div class="histoire__content">
			<div class="histoire__left-container">
				<div class="histoire__left-content">
					<h1 class="histoire__title">Bastet, un chat vénéré</h1>
					<p class="histoire__text">
						Bastet est la déesse bienveillante du foyer et du chat domestique, parfois elle prend l'aspect guerrier d'une lionne des déesses. Divinité bienveillante, elle protège les Hommes contre les maladies contagieuses et contre les mauvais esprits.
					</p>
					<p class="histoire__text">
						Déesse de la joie, Bastet  aime la musique et la danse, c’est pourquoi Bastet protège Tamoutneferet, une célèbre danseuse et chanteuse.
					</p>
					<p>
						Grâce au travail de nettoyage et de restauration des archéologues et des restaurateurs, tu peux observer dans la Petite Galerie une superbe momie de chat représentant Bastet.
					</p>
					<div class="histoire__button-container">
						<router-link to="/egypte/scene/3">
							<button class="histoire__button btn">Continuer</button>
						</router-link>
					</div>
				</div>
			</div>
			<div class="histoire__right-container">
				<div class="histoire__right-bg">
					<img class="histoire__design" :src="'/assets/images/scene-2_illu-chat.png'">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "histoire2"
	}
</script>

<style scoped>

</style>