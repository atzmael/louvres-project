<template>
	<div class="collection view">
		<router-link to="/epoques">
			<div class="logo" :style="'left: 80px;'"><img src="/assets/images/pictos/bouton-home.png" alt=""></div>
		</router-link>

		<div class="view__header">
			<h1 class="view__header-title">Ma collection</h1>
			<div class="collection__sep sep"><img src="/assets/images/pictos/picto_sep.svg" alt=""></div>
		</div>
		<div class="view__content">
			<p class="view__header-text">
				Retrouve ici ta collection de trésors.<br>
				Tu trouveras ici tous les objets que tu as pu obtenir grâce à tes fouilles.
			</p>

			<div class="collection__list">
				<h2 :class="['collection__subtitle', $store.state.egypte.finished ? 'unlocked' : '']">Egypte</h2>
				<div class="collection__item">
					<img class="collection__item-empty" v-if="!$store.state.egypte.objects[1].found && !$store.state.egypte.objects[1].broken"
					     src="/assets/images/collection/sphere-vide.png"
					     alt="">
					<img v-if="$store.state.egypte.objects[1].found"
					     src="/assets/images/collection/pyramide-galerie.png" alt="">
					<img v-if="$store.state.egypte.objects[1].broken"
					     src="/assets/images/collection/pyramide-galerie-perdu.png" alt="">
				</div>
				<div class="collection__item">
					<img class="collection__item-empty" v-if="!$store.state.egypte.objects[2].found && !$store.state.egypte.objects[2].broken"
					     src="/assets/images/collection/sphere-vide.png"
					     alt="">
					<img v-if="$store.state.egypte.objects[2].found"
					     src="/assets/images/collection/chat-galerie.png"
					     alt="">
					<img v-if="$store.state.egypte.objects[2].broken"
					     src="/assets/images/collection/chat-galerie-perdu.png" alt="">
				</div>
				<div class="collection__item">
					<img class="collection__item-empty" v-if="!$store.state.egypte.objects[3].found && !$store.state.egypte.objects[3].broken"
					     src="/assets/images/collection/sphere-vide.png"
					     alt="">
					<img v-if="$store.state.egypte.objects[3].found"
					     src="/assets/images/collection/sarcophage-galerie.png" alt="">
					<img v-if="$store.state.egypte.objects[3].broken"
					     src="/assets/images/collection/sarcophage-galerie-perdu.png" alt="">
				</div>
			</div>


			<div class="collection__list">
				<h2 :class="['collection__subtitle', $store.state.rome.finished ? 'unlocked' : '']">Rome</h2>
				<div class="collection__item">
					<img class="collection__item-empty" src="/assets/images/collection/sphere-vide.png" alt="">
				</div>
				<div class="collection__item">
					<img class="collection__item-empty" src="/assets/images/collection/sphere-vide.png" alt="">
				</div>
				<div class="collection__item">
					<img class="collection__item-empty" src="/assets/images/collection/sphere-vide.png" alt="">
				</div>
			</div>

			<div class="collection__list">
				<h2 :class="['collection__subtitle', $store.state.babel.finished ? 'unlocked' : '']">Babel</h2>
				<div class="collection__item">
					<img class="collection__item-empty" src="/assets/images/collection/sphere-vide.png" alt="">
				</div>
				<div class="collection__item">
					<img class="collection__item-empty" src="/assets/images/collection/sphere-vide.png" alt="">
				</div>
				<div class="collection__item">
					<img class="collection__item-empty" src="/assets/images/collection/sphere-vide.png" alt="">
				</div>
			</div>

			<div class="collection__list">
				<h2 :class="['collection__subtitle', $store.state.grece.finished ? 'unlocked' : '']">Grèce</h2>
				<div class="collection__item">
					<img class="collection__item-empty" src="/assets/images/collection/sphere-vide.png" alt="">
				</div>
				<div class="collection__item">
					<img class="collection__item-empty" src="/assets/images/collection/sphere-vide.png" alt="">
				</div>
				<div class="collection__item">
					<img class="collection__item-empty" src="/assets/images/collection/sphere-vide.png" alt="">
				</div>
			</div>

			<div class="collection__list">
				<h2 :class="['collection__subtitle', $store.state.middle_age.finished ? 'unlocked' : '']">Moyen-Âge</h2>
				<div class="collection__item">
					<img class="collection__item-empty" src="/assets/images/collection/sphere-vide.png" alt="">
				</div>
				<div class="collection__item">
					<img class="collection__item-empty" src="/assets/images/collection/sphere-vide.png" alt="">
				</div>
				<div class="collection__item">
					<img class="collection__item-empty" src="/assets/images/collection/sphere-vide.png" alt="">
				</div>
			</div>

			<div class="collection__list">
				<h2 :class="['collection__subtitle', $store.state.middle_east.finished ? 'unlocked' : '']">
					Moyen-Orient</h2>
				<div class="collection__item">
					<img class="collection__item-empty" src="/assets/images/collection/sphere-vide.png" alt="">
				</div>
				<div class="collection__item">
					<img class="collection__item-empty" src="/assets/images/collection/sphere-vide.png" alt="">
				</div>
				<div class="collection__item">
					<img class="collection__item-empty" src="/assets/images/collection/sphere-vide.png" alt="">
				</div>
			</div>
		</div>

		<menu-btn></menu-btn>
	</div>
</template>

<script>

	import menuBtn from '@/components/ui/menuBtn';

	export default {
		name: "Collection",
		components: {
			'menu-btn': menuBtn,
		}
	}
</script>

<style lang="scss">

	.collection {
		padding: 60px 80px;
		background-color: $blue;
		text-align: center;
		.view {
			&__header {
				&-title {
					text-transform: uppercase;
					font-size:50px;
					font-family: "InfiniBold", Avenir, Arial, sans-serif;
					color: white;
				}
				&-text {
					font-size: 20px;
					line-height: 30px;
				}
			}

			&__content {
				overflow: auto;
				height: 85%;
			}
		}

		&__sep {
			margin: 20px auto;
		}

		&__list {
			display: flex;
			position: relative;
			flex-flow: row nowrap;
			justify-content: space-around;
			width: 80%;
			margin: 40px auto 0;
		}

		&__subtitle {
			position: absolute;
			top: 50%;
			left: -5%;
			transform: translate(0, -50%);
			text-align: center;
			color: white;
			opacity: 0.6;
			&.unlocked {
				opacity: 1;
			}
		}

		&__item {
			width:100%;
			img {
				width:35%;
			}
			&-empty {
				width: 37%;
				opacity: 0.6;
			}
		}

	}
</style>