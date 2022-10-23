const USER_DATA = {};

function generateUserID() {
	// Math.random should be unique because of its seeding algorithm.
	// Convert it to base 36 (numbers + letters), and grab the first 9 characters
	// after the decimal.
	return Math.random().toString(36).substr(2, 9) + '_';
};

function getUserData() {
	const id = generateUserID();
	const age = document.getElementById("userForm").age.value;
	const gender = document.getElementById("userForm").gender.value;
	choicesUser = ["PVVP", "VPPV"];
	const choice = choicesUser[Math.floor(Math.random() * 2)];

	if (!id) {
		alert("Please enter your ID");
		return;
	}
	if (!choice) {
		alert("Please choose a counterbalance");
		return;
	}
	if (age < 16 || age > 50) {
		alert("Please enter a valid age");
		return;
	}
	if (!gender) {
		alert("Please choose a gender");
		return;
	}
	
	localStorage.setItem("USER_ID", id);
	USER_DATA.id = id;
	USER_DATA.age = age;
	USER_DATA.gender = gender;
	USER_DATA.choice = choice;

	document.getElementById("userForm").remove();
	document.body.appendChild(canvas);

	startExperiment();
}

function getRating(name) {
	for (const element of document.getElementsByName(name)) if (element.checked) return element.value;
}

function getPos(cue) {
	return {
		x: Position[cue].x + width / 2 - cuewidth / 2,
		y: -Position[cue].y + height / 2 - cueheight / 2
	};
}

function setContext(context, condition, scale = 1, c = canvas) {
	c = c.getContext('2d');

	c.drawImage(Images[`pattern${context}`][condition], 0, 0, width * scale, height * scale);
	c.drawImage(Images[`color${context}`][condition], ((width - bgwidth) / 2) * scale, ((height - bgheight) / 2) * scale, bgwidth * scale, bgheight * scale);

}

function drawImg(img, condition, scale = 1, c = canvas) {
	c = c.getContext('2d');
	c.drawImage(Images[img][condition], getPos(img).x * scale, getPos(img).y * scale, cuewidth * scale, cueheight * scale);
}

function drawBorder(scale = 1, c = canvas) {
	c = c.getContext('2d');
	c.drawImage(border, getPos("border").x * scale, getPos("border").y * scale, cuewidth * scale, cueheight * scale);
}

function drawCross(scale = 1, c = canvas) {
	c = c.getContext('2d');
	c.drawImage(cross, (CrossPosition.x - crosswidth / 2) * scale, (CrossPosition.y - crossheight / 2) * scale, crosswidth * scale, crossheight * scale);
}

function clear() {
	document.body.innerHTML = "";
}

function clearCanvas(c = canvas) {
	c = c.getContext('2d');
	c.clearRect(0, 0, width, height);
}

function resetCanvas() {
	clear();
	clearCanvas();
	canvas.width = width;
	canvas.height = height;
	document.body.appendChild(canvas);
}

function sleep(milliseconds) {
	return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function mouseClick(element = canvas) {
	return new Promise(resolve => element.addEventListener("click", resolve));
}

function shuffle(array, boolean) {
	array = boolean ? array : array.slice();
	let randomIndex, temporaryValue, index = array.length;
	while (index > 1) {
		randomIndex = Math.floor(Math.random() * index--);
		temporaryValue = array[index];
		array[index] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}
