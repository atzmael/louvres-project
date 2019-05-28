import SimplexNoise from 'simplex-noise';

import store from '@/store/collection';


/* VARIABLES - Noise */
const NOISE_OBJECT = new SimplexNoise();

let CANVAS_OBJECT = undefined;
let CANVAS_CONTEXT = undefined;

let TIME_object = Date.now()

let MOUSE_POSITION_x = 0;
let MOUSE_POSITION_y = 0

/* VARIABLES - Window */
let WINDOW_WIDTH = window.innerWidth
let WINDOW_HEIGHT = window.innerHeight

document.addEventListener("mousemove", (e) => {
	MOUSE_POSITION_x = e.clientX;
	MOUSE_POSITION_y = e.clientY
}, false)

/* ------------------  VARIABLES  ------------------ */
/* VARIABLES - DOM */
let DOM_ANSWER = undefined;

/* VARIABLES - Answer */
let ANSWER = "tamoutneferet";

/* VARIABLES - Time */
// ---
let TIME_last = TIME_object;
let TIME_current = 0;
let TIME_delta = 0;

/* VARIABLES - Canvas */
// ---
let CANVAS_IMAGE_OBJECT = undefined;
let CANVAS_IMAGE_POSITION_X = 0;
let CANVAS_IMAGE_POSITION_Y = 0;
let CANVAS_IMAGE_WIDTH = WINDOW_WIDTH;
let CANVAS_IMAGE_HEIGHT = WINDOW_HEIGHT;

let CANVAS_ARC_object = undefined;
let CANVAS_ARC_SIZE = 75;

let CANVAS_PARTICLE_object = undefined;
let CANVAS_PARTICLE_POSITION_x = 0;
let CANVAS_PARTICLE_POSITION_y = 0;
let CANVAS_PARTICLE_TAB = [];
let CANVAS_PARTICLE_NUMBER = 5000;

let life = 3;
let currLifeID = 0;
let result = true;
const gameID = 1;

const template = {
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
};

const enigme = {

	init() {

		this.DOM_ANSWER = document.getElementById("answer")

		/* VARIABLES - Canvas */
		CANVAS_OBJECT = document.getElementById("canvas")
		CANVAS_CONTEXT = CANVAS_OBJECT.getContext("2d")

		/* ------------------ INITIALIZED ------------------ */
		/* INITIALIZED - DOM */
		this.DOM_ANSWER.setAttribute("minlength", ANSWER.length)
		this.DOM_ANSWER.setAttribute("maxlength", ANSWER.length)
		this.DOM_ANSWER.setAttribute("size", ANSWER.length - 1)

		/* INITIALIZED - Canvas */
		CANVAS_OBJECT.width = WINDOW_WIDTH
		CANVAS_OBJECT.height = WINDOW_HEIGHT

		CANVAS_IMAGE_OBJECT = document.querySelector('.background');

		/* INITIALIZED - Event */

		this.DOM_ANSWER.addEventListener("keydown", (e) => this.compareAnswer(e), false)

		this.drawCanvas();

		setTimeout(() => {
			TweenLite.to(document.querySelector('.js-instruction-text'), 1, {opacity: 0});
			TweenLite.to(document.querySelector('.js-life-count'), 1, {opacity: 1}, '+=1s');
		}, 4000)

		setTimeout(() => {
			TweenLite.to(document.querySelector('.js-infos'), 1, {opacity: 1, display: 'block'});
		}, 2000)
	},

	/* ------------------  FUNCTIONS  ------------------ */

	/* FUNCTIONS - Draw Canvas */
	drawCanvas() {

		/* IMAGE */
		CANVAS_CONTEXT.drawImage(CANVAS_IMAGE_OBJECT, CANVAS_IMAGE_POSITION_X, CANVAS_IMAGE_POSITION_Y, CANVAS_IMAGE_WIDTH, CANVAS_IMAGE_HEIGHT)

		/* ARC */
		CANVAS_ARC_object = new Arc(CANVAS_ARC_SIZE)

		/* PARTICLES */
		for (let CANVAS_PARTICLE_angle = 0; CANVAS_PARTICLE_angle < (2 * Math.PI); CANVAS_PARTICLE_angle += ((2 * Math.PI) / CANVAS_PARTICLE_NUMBER)) {

			CANVAS_PARTICLE_POSITION_x = Math.cos(CANVAS_PARTICLE_angle) * CANVAS_ARC_SIZE
			CANVAS_PARTICLE_POSITION_y = Math.sin(CANVAS_PARTICLE_angle) * CANVAS_ARC_SIZE
			// ---
			CANVAS_PARTICLE_object = new Particle(CANVAS_PARTICLE_POSITION_x, CANVAS_PARTICLE_POSITION_y)
			// ---
			CANVAS_PARTICLE_TAB.push(CANVAS_PARTICLE_object)

		}

		/* UPDATE */
		this.updateCanvas();

	},

	updateCanvas() {

		this.gameUpdateInterval = setInterval(() => {
			/* TIME */
			TIME_object = Date.now()
			// ---
			TIME_delta = TIME_object - TIME_last
			TIME_last = TIME_object
			TIME_current += TIME_delta / 5

			/* CLEAR */
			CANVAS_CONTEXT.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT)

			/* IMAGE */
			CANVAS_CONTEXT.drawImage(CANVAS_IMAGE_OBJECT, CANVAS_IMAGE_POSITION_X, CANVAS_IMAGE_POSITION_Y, CANVAS_IMAGE_WIDTH, CANVAS_IMAGE_HEIGHT)

			/* ARC */
			CANVAS_ARC_object.update()

			/* PARTICLES */
			for (let CANVAS_PARTICLE_TAB_index = 0; CANVAS_PARTICLE_TAB_index < CANVAS_PARTICLE_TAB.length; CANVAS_PARTICLE_TAB_index++) {

				CANVAS_PARTICLE_TAB[CANVAS_PARTICLE_TAB_index].update(TIME_current)
			}
		}, 50)

		/* REPEAT */
		//requestAnimationFrame(this.updateCanvas.bind(this))

	},

	/* FUNCTIONS - Compare Answer */
	compareAnswer(e) {
		if (e.key == 'Enter') {
			if (ANSWER == this.getAnswer()) {
				this.handleLife(false);
			} else {
				this.handleLife(true);
			}
		}
	},

	handleLife(changeLife) {
		if (changeLife) {
			currLifeID++;
			store.commit('egyptGameHandler', {game: gameID, life: currLifeID});
			life--;
		}else {
			this.resolveGame();
		}
		if (life <= 0) {
			result = false;
			this.resolveGame();
		}
	},

	resolveGame() {
		let newTemplate = '';

		if (result) {
			newTemplate = template.win;
			store.commit('egyptFindObject', gameID);
		} else {
			newTemplate = template.loose;
			store.commit('egyptBrokeObject', gameID);
		}

		document.querySelector('.enigme .js-result').style.display = "block";
		document.querySelector('.enigme .js-result-content').innerHTML = newTemplate;
		TweenLite.to(document.querySelector('.enigme .js-result'), 0.4, {opacity: 1})
	},


	/* FUNCTIONS - Get Answer */
	getAnswer() {

		/* RETURN */
		return this.DOM_ANSWER.value.toLowerCase()

	},
}

/* ------------------    CLASS    ------------------ */

/* CLASS - Arc */

class Arc {

	constructor(PARAMETER_RADIUS) {

		/* SIZE */
		this.ARC_RADIUS = PARAMETER_RADIUS

		/* POSITION */
		this.ARC_POSITION_x = -200
		this.ARC_POSITION_y = -200

		/* SCALE */
		this.ARC_SCALE_x = 1
		this.ARC_SCALE_y = 1

		/* SIGN */
		this.ARC_SIGN_x = 0
		this.ARC_SIGN_y = 0

		/* DRAW */
		this.draw()

	}

	draw() {

		/* SAVE */
		CANVAS_CONTEXT.save()

		/* MASK */
		CANVAS_CONTEXT.globalCompositeOperation = "destination-in"

		/* OPEN */
		CANVAS_CONTEXT.beginPath()

		/* TSR */
		CANVAS_CONTEXT.scale(this.ARC_SCALE_x, this.ARC_SCALE_y)

		/* SHAPE */
		CANVAS_CONTEXT.arc(this.ARC_POSITION_x, this.ARC_POSITION_y, this.ARC_RADIUS, 0, Math.PI * 2, true)

		/* FILL */
		CANVAS_CONTEXT.fill()

		/* CLOSE */
		CANVAS_CONTEXT.closePath()

		/* RESTORE */
		CANVAS_CONTEXT.restore()

	}

	update() {

		/* POSITION */
		this.ARC_POSITION_x = MOUSE_POSITION_x
		this.ARC_POSITION_y = MOUSE_POSITION_y

		/* DRAW */
		this.draw()

	}

}

/* CLASS - Particle */
class Particle {

	constructor(PARAMETER_POSITION_X, PARAMETER_POSITION_Y) {

		/* COLOR */
		this.ARC_COLOR = "white"

		/* SIZE */
		this.ARC_RADIUS = .1

		/* POSITION */
		this.ARC_POSITION_x = PARAMETER_POSITION_X
		this.ARC_POSITION_y = PARAMETER_POSITION_Y
		// ---
		this.ARC_POSITION_X = PARAMETER_POSITION_X
		this.ARC_POSITION_Y = PARAMETER_POSITION_Y

		/* SCALE */
		this.ARC_SCALE_x = 1
		this.ARC_SCALE_y = 1

		/* SIGN */
		this.ARC_SIGN_x = 0
		this.ARC_SIGN_y = 0

		/* DRAW */
		this.draw()

	}

	draw() {

		/* SAVE */
		CANVAS_CONTEXT.save()

		/* OPEN */
		CANVAS_CONTEXT.beginPath()

		/* TSR */
		CANVAS_CONTEXT.scale(this.ARC_SCALE_x, this.ARC_SCALE_y)

		/* SHAPE */
		CANVAS_CONTEXT.arc(this.ARC_POSITION_x, this.ARC_POSITION_y, this.ARC_RADIUS, 0, Math.PI * 2, true)

		/* FILL */
		CANVAS_CONTEXT.fillStyle = this.ARC_COLOR
		// ---
		CANVAS_CONTEXT.fill()

		/* CLOSE */
		CANVAS_CONTEXT.closePath()

		/* RESTORE */
		CANVAS_CONTEXT.restore()

	}

	update(PARAMETER_TIME) {

		/* NOISE */
		let NOISE_data = NOISE_OBJECT.noise2D(this.ARC_POSITION_x + PARAMETER_TIME, this.ARC_POSITION_y + PARAMETER_TIME)

		/* POSITION */

		this.ARC_POSITION_x = this.ARC_POSITION_X + MOUSE_POSITION_x
		this.ARC_POSITION_y = this.ARC_POSITION_Y + MOUSE_POSITION_y

		this.ARC_SIGN_x = Math.sign(this.ARC_POSITION_x - MOUSE_POSITION_x) * 5
		this.ARC_SIGN_y = Math.sign(this.ARC_POSITION_y - MOUSE_POSITION_y) * 5
		this.ARC_POSITION_x += Math.sin(PARAMETER_TIME / 100 * NOISE_data) * NOISE_data * this.ARC_SIGN_x
		this.ARC_POSITION_y += Math.sin(PARAMETER_TIME / 100 * NOISE_data) * NOISE_data * this.ARC_SIGN_y

		if (Math.sin(PARAMETER_TIME * NOISE_data) * NOISE_data * 2 < 0) {
			this.ARC_COLOR = "#272b60"
		} else {
			this.ARC_COLOR = "#fbcfb6"
		}

		/* DRAW */
		this.draw()

	}

}

export default enigme;