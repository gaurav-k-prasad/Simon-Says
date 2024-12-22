let container = document.querySelector(".container");
let msg = document.querySelector(".msg");
let blue = document.querySelector(".blue");
let green = document.querySelector(".green");
let pink = document.querySelector(".pink");
let red = document.querySelector(".red");

let gameOn = false;
let display = false;
let level = 0;
let order = [];
let i = 0;

const boxes = {
	0: red,
	1: blue,
	2: pink,
	3: green,
};

function addNewOrder() {
	order.push(boxes[Math.floor(Math.random() * 4)]);
}

function displayOrder() {
	let timeInterval = 500;
	let removalTime = 300;
	let currTime = 900;
	display = true;

	for (let j = 0; j < order.length; j++) {
		setTimeout(() => {
			order[j].classList.add("click");
			setTimeout(() => {
				order[j].classList.remove("click");

				if (j == order.length - 1) {
					display = false;
				}
			}, removalTime);
		}, currTime);

		currTime += timeInterval;
	}
}

function levelUp() {
    msg.innerText = `Level ${++level}`
	addNewOrder();
	displayOrder();
}

function reset() {
	i = 0;
	order = [];
	level = 0;
	display = false;
	gameOn = false;
	msg.innerText = "Press space to start";
}

container.addEventListener("click", (e) => {
	if (gameOn && !display && e.target.classList.contains("box")) {
		e.target.classList.add("click");
		setTimeout(() => {
			e.target.classList.remove("click");
		}, 300);

		if (order[i++] != e.target) {
			console.error("wrong");
			document.body.classList.add("wrong");

			setTimeout(() => {
				document.body.classList.remove("wrong");
			}, 700);

			reset();
		} else if (i == order.length) {
			i = 0;
			levelUp();
		}
	}
});

document.addEventListener("keydown", (event) => {
	if (!gameOn && event.key == " ") {
		gameOn = true;
		levelUp();
	}
});
