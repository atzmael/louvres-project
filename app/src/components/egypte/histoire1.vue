<template>
	<div class="histoire1 histoire component" data-name="histoire1">
		<div class="histoire__content">
			<div class="histoire__left-container">
				<div class="histoire__left-content">
					<h1 class="histoire__title">Le tombeau de Tamoutneferet</h1>
					<img class="sep" src="/assets/images/pictos/picto_sep.svg" alt="">
					<p class="histoire__text">
						Le couvercle du sarcophage de Tamoutnéferet comporte une décoration composée de représentations divines permettant de garantir à la défunte l’accès à la vie éternelle.
						On y retrouve notamment la Déesse Nout déployant ses ailes pour protéger la défunte.
					</p>
					<p class="histoire__text">
						En effet, les éléments de l'écriture égyptienne, les hiéroglyphes, représentent des êtres ou des objets de l'univers pharaonique. De plus, dans la culture égyptienne, tout ce qui entoure  leur sarcophage les accompagnera dans l’au-delà. C’est grâce au travail des archéologues que l’on a réussi à comprendre les hiéroglyphes et leur importance dans la culture égyptienne.
					</p>
					<div class="histoire__button-container">
						<router-link to="/egypte/scene/2">
							<button class="histoire__button btn">Continuer</button>
						</router-link>
					</div>
				</div>
			</div>
			<div class="histoire__right-container">
				<div class="histoire__right-bg">
					<img class="histoire__design" :src="'/assets/images/scene-1_illu-pyramide.png'">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "histoire1"
	}
</script>

<style scoped>

</style>