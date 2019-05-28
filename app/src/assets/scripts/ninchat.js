import store from '@/store/collection';
let windowsHeight = window.innerHeight + 5;
let windowsWidth = window.innerWidth;
window.addEventListener("resize", () => {
	windowsWidth = window.innerWidth;
	windowsHeight = window.innerHeight + 5;
});
export default class Ninchat {
	constructor() {
		this.canvas = document.getElementById("canvas");
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.ctx = this.canvas.getContext("2d");
		this.gameRunning = false;
		this.template = {
			win: `
                <h2 class="result__title">Félicitations</h2>
                <div class="result__sep sep"><img src="/assets/images/pictos/picto_sep.svg" alt=""></div>
                <p class="result__text">Super, tu as réussis à restaurer l'objet.</p>
                <p class="result__text">Tu pourras donc le retrouver dans ton musée !</p>
            `,
			loose: `
                <h2 class="result__title">Dommage</h2>
                <div class="result__sep sep"><img src="/assets/images/pictos/picto_sep.svg" alt=""></div>
                <p class="result__text">Oups, tu n'as pas réussi à récuperer l'objet.</p>
                <p class="result__text">Tu ne pourras pas le retrouver dans ton musée</p>
            `
		};
		this.gameStats = {
			score: 0,
			fish: 0,
			snake: 0,
		};
		this.goal = {
			fish: 20,
			snake: 3,
		};
		this.fishes = [];
		this.snakes = [];
		this.wave1 = undefined;
		this.wave2 = undefined;
		this.wave3 = undefined;
		this.cat = undefined;
		this.popFishInterval = undefined;
		this.popSnakeInterval = undefined;
		this.updateInterval = undefined;
		this.gameID = 2;
	}
	init() {
		this.bindEvent();
		if (this.canvas.getContext) {
			this.ctx = this.canvas.getContext('2d');
		} else {
			console.log('canvas loading failed');
			return
		}
		this.createWave(3, document.querySelector('#vague3'));
		this.createWave(2, document.querySelector('#vague2'));
		this.popFish();
		this.popSnake();
		this.createWave(1, document.querySelector('#vague1'));
		this.cat = new Cat(this.ctx);
		this.cat.draw();
		this.update();
	}
	startGame() {
		TweenLite.to(document.querySelector('.js-instructions'), 0.6, { opacity: 0, display: 'none' });
		TweenLite.to(document.querySelector('.js-infos'), 0.6, { opacity: 1, display: 'block' }, '+=1s');
	}
	createFish() {
		let fishNumber = Math.floor(Math.random() * 3);
		let fish;
		switch (fishNumber) {
			case 0:
				fish = new Fish(this.ctx, 440, 269, fishNumber);
				break;
			case 1:
				fish = new Fish(this.ctx, 500, 263, fishNumber);
				break;
			case 2:
				fish = new Fish(this.ctx, 578, 252, fishNumber);
				break;
		}
		fish.draw();
		this.fishes.push(fish);
	}
	popFish() {
		this.popFishInterval = setInterval(() => {
			this.createFish();
		}, 400);
	}
	popSnake() {
		this.popSnakeInterval = setInterval(() => {
			let random = [Math.random() * (500 - 20) + 20, Math.random() * ((windowsWidth - 200) - 900) + 900];
			let x = random[Math.round(Math.random())];
			let snake = new Snake(this.ctx, x);
			snake.draw();
			this.snakes.push(snake);
		}, 3000);
	}
	createWave(number, img) {
		switch (number) {
			case 1:
				this.wave1 = new Wave(this.ctx, img, 1);
				this.wave1.draw();
				break;
			case 2:
				this.wave2 = new Wave(this.ctx, img, 2);
				this.wave2.draw();
				break;
			case 3:
				this.wave3 = new Wave(this.ctx, img, 3);
				this.wave3.draw();
				break;
		}
	}
	bindEvent() {
		window.addEventListener("resize", () => {
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerHeight;
		});
		window.addEventListener("mousemove", (e) => this.defendBastet(e))
	}
	update() {
		this.updateInterval = setInterval(() => {
			this.ctx.clearRect(0, 0, this.width, this.height);
			this.wave3.update();
			this.wave2.update();
			this.fishes.forEach((e) => {
				if (e.alive) {
					e.update();
				} else if (!e.alive) {
					e.deadUpdate();
				}
			});
			this.snakes.forEach(e => {
				if (e.alive) {
					e.update();
				} else if (!e.alive) {
					e.deadUpdate();
				}
			});
			this.wave1.update();
			this.cat.draw();
		}, 5);
	}
	defendBastet(e) {
		let mouseX = e.clientX;
		let mouseY = e.clientY;
		if (!this.gameRunning) {
			this.gameRunning = true;
			this.startGame()
		}
		this.fishes.forEach((e) => {
			if (e.alive) {
				if (e.x <= mouseX && mouseX <= e.xMax && e.y <= mouseY && mouseY <= e.yMax) {
					this.displayScore();
					this.fishIsDead(e);
				}
			}
		});
		this.snakes.forEach(e => {
			if (e.alive) {
				if (e.x <= mouseX && mouseX <= e.xMax && e.y <= mouseY && mouseY <= e.yMax) {
					this.displayScore();
					this.snakeIsDead(e);
				}
			}
		})
	}
	fishIsDead(obj) {
		obj.alive = false;
		setTimeout(() => {
			let index = this.fishes.indexOf(obj);
			this.fishes.splice(index, 1);
			this.gameStats.fish++;
			this.calculateScore();
		}, 2000)
	}
	snakeIsDead(obj) {
		obj.alive = false;
		setTimeout(() => {
			let index = this.fishes.indexOf(obj);
			this.snakes.splice(index, 1);
			this.gameStats.snake++;
			this.calculateScore();
		}, 2000)
	}
	calculateScore() {
		if (this.gameStats.fish >= this.goal.fish && this.gameStats.snake >= this.goal.snake) {
			this.endGame();
			this.result = true;
		}
	}
	displayScore() {
		document.querySelector('.js-score-fish').textContent = `Poissons : ${this.gameStats.fish}/${this.goal.fish}`;
		document.querySelector('.js-score-snake').textContent = `Serpents : ${this.gameStats.snake}/${this.goal.snake}`;
	}
	endGame() {
		clearInterval(this.popFishInterval);
		clearInterval(this.popSnakeInterval);
		clearTimeout(this.gameCountdown);
		if (this.gameRunning) {
			this.gameRunning = false;
			setTimeout(() => {
				this.stopGame();
			}, 2000)
		}
	}
	stopGame() {
		clearInterval(this.updateInterval);
		this.gameStats.score = (this.gameStats.fish * 10) + (this.gameStats.snake * 30);
		let template = '';
		if (this.result) {
			template = this.template.win;
			store.commit('egyptFindObject', this.gameID);
		} else {
			template = this.template.win;
			store.commit('egyptBrokeObject', this.gameID);
		}
		document.querySelector('.ninchat .js-result').style.display = "block";
		document.querySelector('.ninchat .js-result-content').innerHTML = template;
		TweenLite.to(document.querySelector('.ninchat .js-result'), 0.4, { opacity: 1 })
	}
	kill() {
		this.gameRunning = false;
		this.result = false;
		clearInterval(this.updateInterval);
		clearInterval(this.popFishInterval);
		clearInterval(this.popSnakeInterval);
		clearTimeout(this.gameCountdown);
	}
}
class Fish {
	constructor(ctx, width, height, fishNumber) {
		this.fishesLeft = [
			document.querySelector('#fish1-left'),
			document.querySelector('#fish2-left'),
			document.querySelector('#fish3-left'),
		];
		this.fishesRight = [
			document.querySelector('#fish1-right'),
			document.querySelector('#fish2-right'),
			document.querySelector('#fish3-right'),
		];
		this.fishReducer = 0.5;
		this.ctx = ctx;
		this.direction = Math.random() > 0.5 ? 1 : -1;
		this.z = Math.floor(Math.random() * (40 - 30)) + 30;
		if (this.direction > 0) {
			this.x = -((Math.sqrt(windowsHeight - 100) + this.z) / 0.05);
		} else {
			this.x = ((Math.sqrt(windowsHeight - 100) + this.z) / 0.05);
		}
		this.y = windowsHeight;
		this.width = width * this.fishReducer;
		this.height = height * this.fishReducer;
		this.xMax = this.x + this.width;
		this.yMax = this.y + this.height;
		if (this.direction > 0) {
			this.fish = this.fishesLeft[fishNumber];
		} else {
			this.fish = this.fishesRight[fishNumber];
		}
		this.alive = true;
		this.fishSpeed = Math.random() * (5 - 2) + 2;
		this.deadFishSpeed = 3;
	}
	draw() {
		this.ctx.drawImage(this.fish, this.x, this.y, this.width, this.height);
	}
	update() {
		this.xMax = this.x + this.width;
		this.yMax = this.y + this.height;
		if (this.direction > 0) {
			this.x += this.fishSpeed;
		} else {
			this.x += -this.fishSpeed;
		}
		if (this.y > 80) {
			this.y = Math.pow(0.05 * this.x - this.z, 2) + 100;
		}
		this.draw();
	}
	deadUpdate() {
		this.y += this.deadFishSpeed;
		this.draw();
	}
}
class Cat {
	constructor(ctx) {
		this.width = 458;
		this.height = 587;
		this.x = windowsWidth / 2 - this.width / 2;
		this.y = windowsHeight - this.height + 20;
		this.life = 3;
		this.alive = true;
		this.ctx = ctx;
		this.xMax = this.x + this.width;
		this.yMax = this.y + this.height;
		this.cat = document.querySelector('#cat');
	}
	draw() {
		this.ctx.drawImage(this.cat, this.x, this.y, this.width, this.height);
	}
	update() {
		this.xMax = this.x + this.width;
		this.yMax = this.y + this.height;
		this.draw();
	}
}
class Snake {
	constructor(ctx, x) {
		this.width = 256;
		this.height = 512;
		this.ctx = ctx;
		this.x = x;
		this.y = windowsHeight;
		this._x = x;
		this.snake = document.querySelector('#snake');
		this.xMax = this.x + this.width;
		this.yMax = this.y + this.height;
		this.alive = true;
		this.snakeSpeed = Math.random() * (2 - 0.5) + 0.5;
		this.deadSnakeSpeed = 3;
		this.deltaTime = Math.random() * Math.PI / 100;
		this.snakeGoTop = true;
		this.randomHeight = Math.random() * (500 - 350) + 350;
	}
	draw() {
		this.ctx.drawImage(this.snake, this.x, this.y, this.width, this.height);
	}
	update() {
		this.deltaTime += Math.PI / 100;
		this.xMax = this.x + this.width;
		this.yMax = this.y + this.height;
		if (this.y > windowsHeight - this.randomHeight) {
			this.y -= this.snakeSpeed;
		}
		this.x = this._x + Math.sin(this.deltaTime / 3) * 15; // 3 = vitesse d'oscillation, 15 = amplitude
		this.draw();
		if (this.deltaTime > 25) {
			this.y += this.deadSnakeSpeed;
		}
	}
	deadUpdate() {
		this.y += this.deadSnakeSpeed;
		this.draw();
	}
}
class Wave {
	constructor(ctx, img, number) {
		this.width = windowsWidth + 100;
		this.ctx = ctx;
		this.x = windowsWidth / 2 - this.width / 2 - 20;
		this._x = windowsWidth / 2 - this.width / 2 - 20;
		switch (number) {
			case 1:
				this.height = 200;
				this.y = windowsHeight - this.height;
				this._y = windowsHeight - this.height;
				this.deltaTime = Math.PI / 100;
				this.sign = -1
				this.random = 3
				break;
			case 2:
				this.height = 400;
				this.y = windowsHeight - this.height + 90;
				this._y = windowsHeight - this.height + 90;
				this.deltaTime = 2 * Math.PI / 100;
				this.sign = 1
				this.random = 2
				break;
			case 3:
				this.height = 400;
				this.y = windowsHeight - this.height + 20;
				this._y = windowsHeight - this.height + 20;
				this.deltaTime = 1.5 * Math.PI / 100;
				this.sign = -1
				this.random = 1
				break;
		}
		this.wave = img;
	}
	draw() {
		this.ctx.drawImage(this.wave, this.x, this.y, this.width, this.height);
	}
	update() {

		this.deltaTime += Math.PI / 100;
		this.xMax = this.x + this.width;
		this.yMax = this.y + this.height;
		this.x = this._x + Math.cos(this.deltaTime) * this.random * this.sign * 2.5;
		this.y = this._y + Math.sin(this.deltaTime) * this.random * this.sign;
		this.draw();
	}
}