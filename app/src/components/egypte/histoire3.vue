<template>
	<div class="histoire3 histoire component" data-name="histoire3">
		<div class="histoire__content">
			<div class="histoire__left-container">
				<div class="histoire__left-content">
					<h1 class="histoire__title">La pesée des âmes</h1>
					<p class="histoire__text">
						Dans la conception spirituelle égyptienne, après la mort, un long et compliqué voyage commence.  La volonté de tout Égyptien est de rejoindre le dieu soleil Rê et d’atteindre la vie éternelle après la mort. Mais ceci n’est possible qu’après plusieurs étapes où l’âme du défunt est jugée. <br>
						Le défunt subit notamment l’épreuve de la balance, elle consiste à opposer sur une balance son cœur à une plume. Si le cœur est plus léger, il est considéré comme pur et innocent, le défunt peut alors poursuivre sa route jusqu’au tribunal des quarante-deux juges.
					</p>
					<p class="histoire__text">
						Ce long processus est illustré dans les papyrus et dans les tombeaux, c’est grâce au travail d'hypothèses des archéologues que l’on a pu comprendre les croyances égyptiennes qui entourent la mort.
					</p>
					<div class="histoire__button-container">
						<router-link to="/epoques">
							<button class="histoire__button btn">Continuer</button>
						</router-link>
					</div>
				</div>
			</div>
			<div class="histoire__right-container">
				<div class="histoire__right-bg">
					<img class="histoire__design" :src="'/assets/images/scene-3_illu-sarcophage.png'">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "histoire3"
	}
</script>

<style scoped>

</style>