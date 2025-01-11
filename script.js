pWIDTH = 20;
pHEIGHT = 20;
fWIDTH = 10;
fHEIGHT = 10;
SPEED = 500;

direction = {
	"x": 0,
	"y": -1
};
snake = [];
apple = {
	"x": 0,
	"y": 0
};
locked = false;
paused = false;
end = false;
score = 0;


function random(max) {
	return Math.floor(Math.random() * max);
}

function createSnake(x, y) {
	element = document.createElement("div");
	element.classList.add("snake");
	element.style.left = x*pWIDTH+"px";
	element.style.top = y*pHEIGHT+"px";
	document.getElementById("game").appendChild(element);
	return {
		"x": x,
		"y": y,
		"element": element,
	}
}

function generateApple() {
	apple = {
		"x": random(fWIDTH),
		"y": random(fHEIGHT)
	};
	document.getElementById("apple").style.left = apple.x*pHEIGHT+"px";
	document.getElementById("apple").style.top = apple.y*pWIDTH+"px";
	for (i=0;i<snake.length;i++) {
		if (snake[i].x==apple.x&&snake[i].y==apple.y) {
			generateApple();
			break;
		}
	}
}

function move(event) {
	if (end) {
		end = false;
		locked = false;
		generateApple();
		score=0;
		for (i=0;i<snake.length;i++) {
			snake[i].element.remove();
		}
		snake = [
			createSnake(Math.floor(fWIDTH/2), Math.floor(fHEIGHT/2)),
			createSnake(Math.floor(fWIDTH/2), Math.floor(fHEIGHT/2)+1),
		]
		document.getElementById("endScreen").classList.add("hidden");
		interval = setInterval(tick, SPEED);
	} else if (event.key=="Escape") {
		if (!paused) {
			clearInterval(interval);
			document.getElementById("pauseScreen").classList.remove("hidden");
			paused = true;
			locked = true;
		} else {
			interval = setInterval(tick, SPEED);
			document.getElementById("pauseScreen").classList.add("hidden");
			paused = false;
			locked = false;
		}
	}
	if (!locked) {
		if ((event.key=="d"||event.key=="ArrowRight")&&direction.x!=-1) {
			direction.x = 1;
			direction.y = 0;
		} else if ((event.key=="s"||event.key=="ArrowDown")&&direction.y!=-1) {
			direction.x = 0;
			direction.y = 1;
		} else if ((event.key=="a"||event.key=="ArrowLeft")&&direction.x!=1) {
			direction.x = -1;
			direction.y = 0;
		} else if ((event.key=="w"||event.key=="ArrowUp")&&direction.y!=1) {
			direction.x = 0;
			direction.y = -1;
		}
		locked = true;
	}
}

function check() {
	if (0>snake[snake.length-1].x||snake[snake.length-1].x>=fWIDTH
		||0>snake[snake.length-1].y||snake[snake.length-1].y>=fHEIGHT) {
		end = true;
	}
	positions = [];
	for (a=0;a<snake.length;a++) {
		for (b=0;b<snake.length;b++) {
			if (a!=b&&snake[a].x==snake[b].x&&snake[a].y==snake[b].y) {
				end = true;
			}
		}
	}

	if (end) {
		document.getElementById("endScreen").classList.remove("hidden");
		clearInterval(interval);
		locked = false;
		snake[snake.length-1].element.classList.add("hidden");
	}
}

function tick() {
	locked = false;
	x = snake[snake.length-1].x + direction.x;
	y = snake[snake.length-1].y + direction.y;
	snake.push(createSnake(x, y));

	if (snake[snake.length-1].x==apple.x&&snake[snake.length-1].y==apple.y) {
		generateApple();
		score++;
		document.getElementById("score").innerText = "score: "+score;
	} else {
		snake[0].element.remove();
		snake.shift();
	}

	check();
}

function load() {
	snake = [
		createSnake(Math.floor(fWIDTH/2), Math.floor(fHEIGHT/2)),
		createSnake(Math.floor(fWIDTH/2), Math.floor(fHEIGHT/2)+1),
	]

	document.getElementById("apple").style.left = apple.x*pWIDTH+"px";
	document.getElementById("apple").style.top = apple.y*pHEIGHT+"px";

	generateApple();

	interval = setInterval(tick, SPEED);
	addEventListener("keydown", move)
}

