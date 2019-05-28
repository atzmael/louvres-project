import store from '@/store/collection';

const balance = {
	ui: {},
	timerHasStart: false,
	stopped: false,
	hasLostLife: false,
	balancingBalance: undefined,
	timerCountdown: undefined,
	timerLifeLost: undefined,
	gameTimer: undefined,
	gameHasStarted: false,
	life: 3,
	currLifeID: 0,
	gameID: 3,
	gameDuration: Math.floor(Math.random() * (40 - 10 + 1)) + 10,
	result: false,

	template: {
		win: `
			<h2 class="result__title">Félicitations</h2>
			<div class="result__sep sep"><img src="/assets/images/pictos/picto_sep.svg" alt=""></div>
			<p class="result__text">Super, tu as réussis à restaurer l’objet.</p>
			<p class="result__text">Tu pourras donc le retrouver dans ton musée !</p>
		`,
		loose: `
			<h2 class="result__title">Dommage</h2>
			<div class="result__sep sep"><img src="/assets/images/pictos/picto_sep.svg" alt=""></div>
			<p class="result__text">Oups, tu n'as pas réussi à récuperer l'objet.</p>
			<p class="result__text">Tu ne pourras pas le retrouver dans ton musée</p>
		`
	},

	init() {
		this.bindUI();
		this.bindEvent();
	},

	bindUI() {
		this.ui.balance = document.querySelector('.js-balancier');
		this.ui.left = document.querySelector('.js-balance-left');
		this.ui.right = document.querySelector('.js-balance-right');

		this.ui.timerContainer = document.querySelector('.js-timer');
		this.ui.lifeContainer = document.querySelector('.js-life-count');
	},

	bindEvent() {
		window.addEventListener("keydown", (e) => this.turnLeft(e));
		window.addEventListener("keydown", (e) => this.turnRight(e));
	},

	turnLeft(e) {

		if (!this.stopped) {
			if (e.key == 'ArrowLeft') {
				if (!this.gameHasStarted) {
					this.start();
				}

				if (!this.timerHasStart) {
					this.countdown();
					this.lifeHandler();
					this.timerHasStart = true;
				}
				let angle = this.getAngle();

				let power = Math.floor(Math.random() * (20 - 5 + 1)) + 5;

				if (angle + power < 39) {

					angle += power;

					this.ui.balance.style.transform = `rotate(${angle}deg)`;
					this.ui.left.style.transform = `rotate(${-angle}deg)`;
					this.ui.right.style.transform = `rotate(${-angle}deg)`;
				}
			}
		}
	},

	turnRight(e) {

		if (!this.stopped) {
			if (e.key == 'ArrowRight') {
				if (!this.gameHasStarted) {
					this.start();
				}

				if (!this.timerHasStart) {
					this.countdown();
					this.timerHasStart = true;
				}
				let angle = this.getAngle();

				let power = Math.floor(Math.random() * (20 - 5 + 1)) + 5;

				if (angle - power > -39) {
					angle -= power;

					this.ui.balance.style.transform = `rotate(${angle}deg)`;
					this.ui.left.style.transform = `rotate(${-angle}deg)`;
					this.ui.right.style.transform = `rotate(${-angle}deg)`;
				}
			}
		}
	},

	start() {
		let tl = new TimelineLite();
		tl.to(document.querySelector('.balance .js-instructions'), 0.4, {opacity: 0, display: 'none'})
			.to(document.querySelector('.balance .js-infos'), 0.4, {opacity: 1, display: 'block'});
		this.displayCountdown(this.gameDuration);
		this.balancing();
		this.gameHasStarted = !this.gameHasStarted;
	},

	getAngle() {
		let cs = window.getComputedStyle(this.ui.balance, null);

		let tr =
			cs.getPropertyValue("-webkit-transform") ||
			cs.getPropertyValue("-moz-transform") ||
			cs.getPropertyValue("-ms-transform") ||
			cs.getPropertyValue("-o-transform") ||
			cs.getPropertyValue("transform") ||
			"Either no transform set, or browser doesn't do getComputedStyle";

		var radian = tr.split('(')[1],
			radian = radian.split(')')[0],
			radian = radian.split(',');
		let angle = Math.round(Math.asin(radian[1]) * (180 / Math.PI));

		return angle;
	},

	balancing() {
		let angle;
		this.balancingBalance = setInterval(() => {
			angle = this.getAngle();
			if (angle > 0 && angle <= 39) {
				if (angle < 39) {
					angle += 1;
					this.ui.balance.style.transform = `rotate(${angle}deg)`;
					this.ui.left.style.transform = `rotate(${-angle}deg)`;
					this.ui.right.style.transform = `rotate(${-angle}deg)`;
				} else if (!this.hasLostLife) {
					this.removeLife();
				}
			}

			if (angle < 0 && angle >= -39) {
				if (angle > -39) {
					angle -= 1;
					this.ui.balance.style.transform = `rotate(${angle}deg)`;
					this.ui.left.style.transform = `rotate(${-angle}deg)`;
					this.ui.right.style.transform = `rotate(${-angle}deg)`;
				} else if (!this.hasLostLife) {
					this.removeLife();
				}
			}

			if (angle == 0) {
				angle -= 5;
				this.ui.balance.style.transform = `rotate(${angle}deg)`;
				this.ui.left.style.transform = `rotate(${-angle}deg)`;
				this.ui.right.style.transform = `rotate(${-angle}deg)`;
			}
		}, 40)
	},

	countdown: function () {
		let count = this.gameDuration;

		this.displayCountdown(count);

		this.timerCountdown = setInterval(() => {
			count--;
			this.displayCountdown(count);
		}, 1000);

		this.gameTimer = setTimeout(() => {
			this.result = this.getAngle() > 0;
			this.stopGame();
		}, this.gameDuration * 1000)
	},

	displayCountdown(count) {
		let p = document.querySelector('.js-timer p');

		if (count > 59) {
			let minutes = Math.floor(count / 60);
			let seconds = count - (60 * minutes);
			p.textContent = `${minutes}:${seconds}`;
		} else {
			p.textContent = `${count}`;
		}
	},

	stopGame() {
		this.stopped = true;
		clearInterval(this.balancingBalance);
		clearInterval(this.timerCountdown);
		clearTimeout(this.gameTimer);

		let template = '';
		if (this.result) {
			template = this.template.win;
			store.commit('egyptFindObject', this.gameID);
		} else {
			template = this.template.loose;
			store.commit('egyptBrokeObject', this.gameID);
		}

		store.commit('unlockEgypt');

		document.querySelector('.balance .js-result').style.display = "block";
		document.querySelector('.balance .js-result-content').innerHTML = template;
		TweenLite.to(document.querySelector('.balance .js-result'), 0.4, {opacity: 1})
	},

	lifeHandler() {
		if (this.life <= 0) {
			this.stopGame()
		}
	},

	removeLife() {
		this.currLifeID ++;
		store.commit('egyptGameHandler', {game: this.gameID, life: this.currLifeID});
		this.life--;
		this.hasLostLife = true;
		this.timerLifeLost = setTimeout(() => {
			this.hasLostLife = false;
		}, 1000);
		this.lifeHandler();
	}
}

export default balance;