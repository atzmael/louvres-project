import SimplexNoise from 'simplex-noise'
// ---
import THREELib from "three-js"
import OrbitControls from "threejs-orbit-controls"

/* ------------------    CLASS    ------------------ */

/* CLASS - Plane */

export class Sprite {

	constructor(PARAMETER_POSITION_X, PARAMETER_POSITION_Y, PARAMETER_POSITION_Z, PARAMETER_SCALE_X, PARAMETER_SCALE_Y, PARAMETER_TEXTURE, PARAMETER_COLUMN, PARAMETER_ROW, PARAMETER_BLEND) {

		/* VARIABLES */
		this.SPRITE_MAP = PARAMETER_TEXTURE
		this.SPRITE_NUMBER_COLUMN = PARAMETER_COLUMN
		this.SPRITE_NUMBER_ROW = PARAMETER_ROW
		this.SPRITE_NUMBER_IMAGE = this.SPRITE_NUMBER_COLUMN * this.SPRITE_NUMBER_ROW
		this.SPRITE_DURATION = 25
		// ---
		this.SPRITE_texture = this.textureAnimator(this.SPRITE_MAP, this.SPRITE_NUMBER_COLUMN, this.SPRITE_NUMBER_ROW, this.SPRITE_NUMBER_IMAGE, this.SPRITE_DURATION)
		// ---
		this.SPRITE_MATERIAL = new THREE.SpriteMaterial({
			map: this.SPRITE_MAP
		})
		if (PARAMETER_BLEND == true) {
			this.SPRITE_MATERIAL.blending = THREE.CustomBlending;
			this.SPRITE_MATERIAL.blendEquation = THREE.MaxEquation;
		}
		// ---
		this.SPRITE_OBJECT = new THREE.Sprite(this.SPRITE_MATERIAL)
		// ---
		this.test = randomInterval(.9, 1.5)
		this.SPRITE_POSITION_X = PARAMETER_POSITION_X
		this.SPRITE_POSITION_Y = PARAMETER_POSITION_Y
		this.SPRITE_POSITION_Z = PARAMETER_POSITION_Z
		// ---
		this.SPRITE_SCALE_X = PARAMETER_SCALE_X
		this.SPRITE_SCALE_Y = PARAMETER_SCALE_Y
		this.SPRITE_SCALE_Z = 1

		/* INITIALIZED */
		this.initilialized()
	}

	/* FUNCTIONS */
	initilialized() {

		/* POSITION */
		this.SPRITE_OBJECT.position.set(this.SPRITE_POSITION_X, this.SPRITE_POSITION_Y, this.SPRITE_POSITION_Z)

		/* SCALE */
		this.SPRITE_OBJECT.scale.set(this.SPRITE_SCALE_X, this.SPRITE_SCALE_Y, this.SPRITE_SCALE_Z)

	}
	// ---
	textureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration) {

		let tilesHorizontal = tilesHoriz
		let tilesVertical = tilesVert

		let numberOfTiles = numTiles
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping
		texture.repeat.set(1 / tilesHorizontal, 1 / tilesVertical)

		let tileDisplayDuration = tileDispDuration

		let currentDisplayTime = 0

		let currentTile = 0

		this.update = function (milliSec) {

			currentDisplayTime += milliSec;
			while (currentDisplayTime > tileDisplayDuration) {

				currentDisplayTime -= tileDisplayDuration

				currentTile++

				if (currentTile == numberOfTiles) {

					currentTile = 0

				}

				var currentColumn = currentTile % tilesHorizontal
				texture.offset.x = currentColumn / tilesHorizontal

				var currentRow = Math.floor(currentTile / tilesHorizontal)
				texture.offset.y = -currentRow / tilesVertical

			}
		};
	}
}

/* CLASS - Plane */
class Plane {

	constructor(x, y, z, texture, width, height) {

		/* VARIABLES - Geometry */
		this.GEOMETRY_WIDTH = width
		this.GEOMETRY_HEIGHT = height
		// ---
		this.GEOMETRY_OBJECT = new THREE.BoxGeometry(this.GEOMETRY_WIDTH, this.GEOMETRY_HEIGHT)

		/* VARIABLES - Material */
		if (texture == null) {
			this.MATERIAL_OBJECT = new THREE.MeshBasicMaterial({
				color: "#fccfb4"
			})
		} else if (texture == "#000000") {
			this.MATERIAL_OBJECT = new THREE.MeshLambertMaterial({
				color: "#000000"
			})
		} else {
			this.MATERIAL_OBJECT = new THREE.MeshLambertMaterial({
				map: texture,
				transparent: true
			})
		}

		/* VARIABLES - Mesh */
		this.MESH_OBJECT = new THREE.Mesh(this.GEOMETRY_OBJECT, this.MATERIAL_OBJECT)
		// ---
		this.MESH_OBJECT.position.set(x, y, z)
		// ---
		if (texture == null) {
			this.MESH_OBJECT.rotation.set(Math.PI / 2, 0, 0)
		} else if (texture == "#000000") {
			this.MESH_OBJECT.rotation.set(Math.PI / 2, 0, 0)
		}

	}

}

/* ------------------  VARIABLES  ------------------ */

/* VARIABLES - Three */
const THREE = THREELib()

/* VARIABLES - Window */
let WINDOW_width = window.innerWidth
let WINDOW_height = window.innerHeight
let WINDOW_ratio = WINDOW_width / WINDOW_height

/* VARIABLES - Mouse */
let MOUSE_POSITION_x = WINDOW_width / 2
let MOUSE_POSITION_y = WINDOW_height / 2

/* VARIABLE - Render */
const RENDER_ALPA = true
const RENDER_ANTIALIAS = true
// ---
const RENDER_OBJECT = new THREE.WebGLRenderer({
	alpha: RENDER_ALPA,
	antialias: RENDER_ANTIALIAS
})

/* VARIABLE - Scene */
const SCENE_OBJECT = new THREE.Scene()

let btnClickDisplayed = false;

/* VARIABLES - Camera */
const CAMERA_FOV = 45
const CAMERA_NEAR = 1
const CAMERA_FAR = 1000
// ---
const CAMERA_OBJECT = new THREE.PerspectiveCamera(CAMERA_FOV, WINDOW_ratio, CAMERA_NEAR, CAMERA_FAR)
// ---
const CAMERA_POSITION_X = 0
const CAMERA_POSITION_Y = 0
const CAMERA_POSITION_Z = 35

/* VARIABLE - Control */
const CONTROL_OBJECT = new OrbitControls(CAMERA_OBJECT)

/* VARIABLES - Light */
const LIGHT_AMBIENCE = 0xffffff
const LIGHT_INTENSITY = 1
// ---
const LIGHT_OBJECT = new THREE.AmbientLight(LIGHT_AMBIENCE, LIGHT_INTENSITY)

/* VARIABLES - Mesh */
const MESH_NUMBER = 250
const MESH_TAB = []
// ---
let MESH_object
// ---
const MESH_GROUP = new THREE.Group()

/* VARIABLES - Sprite */
const SPRITE_TAB = [
	[new THREE.TextureLoader().load("/assets/images/scenes/fougere-orange.png"), 8, 25],
	[new THREE.TextureLoader().load("/assets/images/scenes/palmier.png"), 29, 7],
	[new THREE.TextureLoader().load("/assets/images/scenes/fougere-bleue-tordue.png"), 4, 25],
	[new THREE.TextureLoader().load("/assets/images/scenes/fougere-orange-tordue.png"), 4, 25],
	[new THREE.TextureLoader().load("/assets/images/scenes/fougere-bleue.png"), 4, 50],
	[new THREE.TextureLoader().load("/assets/images/scenes/plante-multiple.png"), 8, 13],
	[new THREE.TextureLoader().load("/assets/images/scenes/plante-evantail.png"), 29, 7],
	[new THREE.TextureLoader().load("/assets/images/scenes/plante-evantail-bleue.png"), 4, 25],
	[new THREE.TextureLoader().load("/assets/images/scenes/dune1.png"), 1, 1]
]

/* VARIABLES - Clock */
const CLOCK_OBJECT = new THREE.Clock()


/* ------------------ INITIALIZED ------------------ */
/* INITIALIZED - Render */
RENDER_OBJECT.setSize(WINDOW_width, WINDOW_height)
// ---

/* INITIALIZED - Camera */
CAMERA_OBJECT.position.set(CAMERA_POSITION_X, CAMERA_POSITION_Y, CAMERA_POSITION_Z)
// ---
SCENE_OBJECT.add(CAMERA_OBJECT)

/* INITIALIZED - Control */
CONTROL_OBJECT.update() /* !!! éphemère !!! */

/* INITIALIZED - Light */
SCENE_OBJECT.background = new THREE.Color("#fccfb4")
// ---
SCENE_OBJECT.add(LIGHT_OBJECT)

/* INITIALIZED - Mesh */
for (let MESH_NUMBER_INDEX = 0; MESH_NUMBER_INDEX < MESH_NUMBER; MESH_NUMBER_INDEX++) {

	let SPRITE_TAB_INDEX = Math.floor(randomInterval(0, SPRITE_TAB.length - 1))

	let SPRITE_POSITION_X = randomTwoNumbers(randomInterval(-CAMERA_POSITION_Z + 1, -2.5), randomInterval(2.5, CAMERA_POSITION_Z))
	let SPRITE_POSITION_Z = randomInterval(-CAMERA_POSITION_Z + 10, CAMERA_POSITION_Z - 1)

	switch (SPRITE_TAB_INDEX) {
		case 0:
			MESH_object = new Sprite(SPRITE_POSITION_X, .35 - 2.5, SPRITE_POSITION_Z, 1.35, 1.25, SPRITE_TAB[SPRITE_TAB_INDEX][0], SPRITE_TAB[SPRITE_TAB_INDEX][1], SPRITE_TAB[SPRITE_TAB_INDEX][2], false)
			break
		case 1:
			MESH_object = new Sprite(SPRITE_POSITION_X, 4.75 - 2.5, SPRITE_POSITION_Z, 5, 10, SPRITE_TAB[SPRITE_TAB_INDEX][0], SPRITE_TAB[SPRITE_TAB_INDEX][1], SPRITE_TAB[SPRITE_TAB_INDEX][2], false)
			break
		case 2:
			MESH_object = new Sprite(SPRITE_POSITION_X, .35 - 2.5, SPRITE_POSITION_Z, 1.35, 1.25, SPRITE_TAB[SPRITE_TAB_INDEX][0], SPRITE_TAB[SPRITE_TAB_INDEX][1], SPRITE_TAB[SPRITE_TAB_INDEX][2], false)
			break
		case 3:
			MESH_object = new Sprite(SPRITE_POSITION_X, .35 - 2.5, SPRITE_POSITION_Z, 1.35, 1.25, SPRITE_TAB[SPRITE_TAB_INDEX][0], SPRITE_TAB[SPRITE_TAB_INDEX][1], SPRITE_TAB[SPRITE_TAB_INDEX][2], false)
			break
		case 4:
			MESH_object = new Sprite(SPRITE_POSITION_X, .6 - 2.5, SPRITE_POSITION_Z, 1.35, 1.35, SPRITE_TAB[SPRITE_TAB_INDEX][0], SPRITE_TAB[SPRITE_TAB_INDEX][1], SPRITE_TAB[SPRITE_TAB_INDEX][2], false)
			break
		case 5:
			MESH_object = new Sprite(SPRITE_POSITION_X, 1.4 - 2.5, SPRITE_POSITION_Z, 1.5, 3, SPRITE_TAB[SPRITE_TAB_INDEX][0], SPRITE_TAB[SPRITE_TAB_INDEX][1], SPRITE_TAB[SPRITE_TAB_INDEX][2], false)
			break
		case 6:
			MESH_object = new Sprite(SPRITE_POSITION_X, .8 - 2.5, SPRITE_POSITION_Z, 1.5, 1.75, SPRITE_TAB[SPRITE_TAB_INDEX][0], SPRITE_TAB[SPRITE_TAB_INDEX][1], SPRITE_TAB[SPRITE_TAB_INDEX][2], false)
			break
		case 7:
			MESH_object = new Sprite(SPRITE_POSITION_X, .8 - 2.5, SPRITE_POSITION_Z, 1.5, 1.75, SPRITE_TAB[SPRITE_TAB_INDEX][0], SPRITE_TAB[SPRITE_TAB_INDEX][1], SPRITE_TAB[SPRITE_TAB_INDEX][2], false)
			break
		case 8:
			MESH_object = new Sprite(SPRITE_POSITION_X, .5 - 2.5, SPRITE_POSITION_Z, 15, 1, SPRITE_TAB[SPRITE_TAB_INDEX][0], SPRITE_TAB[SPRITE_TAB_INDEX][1], SPRITE_TAB[SPRITE_TAB_INDEX][2], true)
			break
	}

	MESH_TAB.push(MESH_object)
	MESH_GROUP.add(MESH_object.SPRITE_OBJECT)
}

let MESH_ibis = new Sprite(6, .75 - 2.5, 15, 1.9, 2, new THREE.TextureLoader().load("/assets/images/scene-chat/ibis.png"), 15, 15, false)
let MESH_ibis_positionX = MESH_ibis.SPRITE_OBJECT.position.x

MESH_TAB.push(MESH_ibis)
MESH_GROUP.add(MESH_ibis.SPRITE_OBJECT)

let MESH_cat = new Sprite(0, 4 - 2.5, -CAMERA_POSITION_Z - 1, 5, 3.5, new THREE.TextureLoader().load("/assets/images/scene-chat/chat.png"), 4, 25, false)

MESH_TAB.push(MESH_cat)
MESH_GROUP.add(MESH_cat.SPRITE_OBJECT)

MESH_object = new Plane(0, 50 / 2 - 5.5, -CAMERA_POSITION_Z - 10, new THREE.TextureLoader().load("/assets/images/scenes/ciel-1.jpg"), 200, 100)

MESH_TAB.push(MESH_object)
MESH_GROUP.add(MESH_object.MESH_OBJECT)

let MESH_wave01 = new Sprite(0, 17.5, -CAMERA_POSITION_Z + 10, 100, 50, new THREE.TextureLoader().load("/assets/images/scene-chat/vague_2_grand.png"), 1, 1, false)
let MESH_wave01_positionX = MESH_wave01.SPRITE_OBJECT.position.x
let MESH_wave01_positionY = MESH_wave01.SPRITE_OBJECT.position.y

MESH_TAB.push(MESH_wave01)
MESH_GROUP.add(MESH_wave01.SPRITE_OBJECT)

let MESH_wave02 = new Sprite(0, 18.05, -CAMERA_POSITION_Z + 5, 100, 50, new THREE.TextureLoader().load("/assets/images/scene-chat/vague_1_grand.png"), 1, 1, false)
let MESH_wave02_positionX = MESH_wave02.SPRITE_OBJECT.position.x
let MESH_wave02_positionY = MESH_wave02.SPRITE_OBJECT.position.y

MESH_TAB.push(MESH_wave02)
MESH_GROUP.add(MESH_wave02.SPRITE_OBJECT)

let MESH_wave03 = new Sprite(0, 18.5, -CAMERA_POSITION_Z - 5, 100, 50, new THREE.TextureLoader().load("/assets/images/scene-chat/vague_3_grand.png"), 1, 1, false)
let MESH_wave03_positionX = MESH_wave03.SPRITE_OBJECT.position.x
let MESH_wave03_positionY = MESH_wave03.SPRITE_OBJECT.position.y

MESH_TAB.push(MESH_wave03)
MESH_GROUP.add(MESH_wave03.SPRITE_OBJECT)

MESH_object = new Sprite(0, 4.25 - 2.5, -CAMERA_POSITION_Z + 1, 15, 7.5, new THREE.TextureLoader().load("/assets/images/scene-chat/pyrogue.png"), 1, 1, false)
let MESH_object_positionX = MESH_object.SPRITE_OBJECT.position.x
let MESH_object_positionY = MESH_object.SPRITE_OBJECT.position.y

MESH_TAB.push(MESH_object)
MESH_GROUP.add(MESH_object.SPRITE_OBJECT)

// ---
SCENE_OBJECT.add(MESH_GROUP)

/* INITIALIZED - Plane */
let PLANE_object = new Plane(0, -2.5, 0, null, 200, 200)
// ---
SCENE_OBJECT.add(PLANE_object.MESH_OBJECT)

export function initialized(){
	document.getElementById("stage02").appendChild(RENDER_OBJECT.domElement)
}

export function startScene() {
	/* INITIALIZED - Update */
	update()

	/* INITIALIZED - Event */
	document.addEventListener("mousemove", moveMouse, false)
	// ---
	window.addEventListener("resize", resizeWindow, false)
	// ---
	window.addEventListener("wheel", function (PARAMETER_EVENT) {
		scrollTo(0, PARAMETER_EVENT.deltaY / 500, 500)
	}, false)

}

/* ------------------  FUNCTIONS  ------------------ */

var raycaster = new THREE.Raycaster();
var mouseVector = new THREE.Vector3()
var selectedObject = null;

function downMouse(event) {

	event.preventDefault();

	var intersects = getIntersects(event.layerX, event.layerY);

	if (intersects.length > 0) {

		var res = intersects.filter(function (res) {

			return res && res.object;

		})[0];

		if (res && res.object) {

			selectedObject = res.object;
			console.log('Ok')

		}

	}

}

function getIntersects(x, y) {

	x = (x / window.innerWidth) * 2 - 1;
	y = -(y / window.innerHeight) * 2 + 1;

	mouseVector.set(x, y, 0.5);
	raycaster.setFromCamera(mouseVector, CAMERA_OBJECT);

	return raycaster.intersectObject(MESH_GROUP.children[MESH_GROUP.children.length - 1], true);

}

/* FUNCTIONS - Update */
function update() {

	/* CLOCK */
	let CLOCK_delta = CLOCK_OBJECT.getDelta()

	/* SPRITE */
	for (let MESH_TAB_INDEX = 0; MESH_TAB_INDEX < MESH_TAB.length - 5; MESH_TAB_INDEX++) {
		MESH_TAB[MESH_TAB_INDEX].update(1000 * CLOCK_delta)
	}

	if (MESH_GROUP.position.z < 45) {
		MESH_GROUP.position.z += .05
		// ---
		btnClickDisplayed = false;
	} else {
		if(!btnClickDisplayed) {
			btnClickDisplayed = true;

			document.querySelector('.scene2 .js-click').style.display = "block";
			TweenLite.to(document.querySelector('.scene2 .js-click'), 0.4, {opacity: 1})
		}
	}

	/* WAVE */
	MESH_wave01.SPRITE_OBJECT.position.x = MESH_wave01_positionX + Math.sin(CLOCK_OBJECT.getElapsedTime())
	MESH_wave02.SPRITE_OBJECT.position.x = MESH_wave02_positionX + -Math.sin(CLOCK_OBJECT.getElapsedTime())
	MESH_wave03.SPRITE_OBJECT.position.x = MESH_wave03_positionX + Math.sin(CLOCK_OBJECT.getElapsedTime() * 2) / 2

	MESH_wave01.SPRITE_OBJECT.position.y = MESH_wave01_positionY + Math.sin(CLOCK_OBJECT.getElapsedTime()) / 10
	MESH_wave02.SPRITE_OBJECT.position.y = MESH_wave02_positionY + -Math.sin(CLOCK_OBJECT.getElapsedTime()) / 10
	MESH_wave03.SPRITE_OBJECT.position.y = MESH_wave03_positionY + Math.sin(CLOCK_OBJECT.getElapsedTime()) / 10

	/* Element */
	MESH_object.SPRITE_OBJECT.position.x = MESH_object_positionX + Math.sin(CLOCK_OBJECT.getElapsedTime()) / 2
	MESH_object.SPRITE_OBJECT.position.y = MESH_object_positionY + Math.sin(CLOCK_OBJECT.getElapsedTime()) / 8

	MESH_cat.SPRITE_OBJECT.position.x = MESH_object_positionX + Math.sin(CLOCK_OBJECT.getElapsedTime()) / 2
	MESH_cat.SPRITE_OBJECT.position.y = MESH_object_positionY + Math.sin(CLOCK_OBJECT.getElapsedTime()) / 8 - .75

	MESH_ibis.SPRITE_OBJECT.position.x -= .025

	/* Camera */
	CAMERA_OBJECT.rotation.x = -(MOUSE_POSITION_y - (WINDOW_width / 2)) * (5 * Math.PI / 180 / (WINDOW_width / 2))
	CAMERA_OBJECT.rotation.y = -(MOUSE_POSITION_x - (WINDOW_width / 2)) * (5 * Math.PI / 180 / (WINDOW_width / 2))

	/* RENDER */
	RENDER_OBJECT.render(SCENE_OBJECT, CAMERA_OBJECT)

	/* UPDATE */
	requestAnimationFrame(update)

}

/* FUNCTIONS - Event Scroll */
function scrollTo(start, to, duration) {
	const change = to - start
	const increment = 20

	function easeInOutQuad(t, b, c, d) {
		t = t / (d / 2)
		if (t < 1) {
			return c / 2 * t * t + b
		} else {
			t--
			return -c / 2 * (t * (t - 2) - 1) + b
		}
	}

	let currentTime = 0

	function animateScroll() {
		currentTime += increment
		const val = easeInOutQuad(currentTime, start, change, duration)
		if ((MESH_GROUP.position.z + val > 0) && (MESH_GROUP.position.z + val < 45)) {
			MESH_GROUP.position.z += val
		}
		if (currentTime < duration) {
			setTimeout(animateScroll, increment)
		}
	}
	animateScroll()
}

/* FUNCTIONS - Event Mouse Move */
function moveMouse(PARAMETER_EVENT) {

	/* MOUSE */
	MOUSE_POSITION_x = PARAMETER_EVENT.clientX
	MOUSE_POSITION_y = PARAMETER_EVENT.clientY

}

/* FUNCTIONS - Event Window Resize */
function resizeWindow() {

	/* WINDOW */
	WINDOW_width = window.innerWidth
	WINDOW_height = window.innerHeight
	// ---
	WINDOW_ratio = WINDOW_width / WINDOW_height

	/* CAMERA */
	CAMERA_OBJECT.aspect = WINDOW_ratio
	// ---
	CAMERA_OBJECT.updateProjectionMatrix()

	/* RENDER */
	RENDER_OBJECT.setSize(WINDOW_width, WINDOW_height)

}

/* FUNCTIONS - Random Interval */
function randomInterval(PARAMETER_MIN, PARAMETER_MAX) {

	/* RETURN */
	return Math.random() * (PARAMETER_MAX - PARAMETER_MIN + 1) + PARAMETER_MIN

}

/* FUNCTIONS - Random Two Number */
function randomTwoNumbers(PARAMETER_VALUE_01, PARAMETER_VALUE_02) {

	let RANDOM_tab = [PARAMETER_VALUE_01, PARAMETER_VALUE_02]

	/* RETURN */
	return RANDOM_tab[Math.round(Math.random())]

}

/* ------------------------------------------------- */