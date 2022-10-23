//valenceCues is constant
valenceCues = ["W", "X", "Y"];
const valenceImageScaling = 0.5;
const valenceScale = { name: "valence", min: -5, max: 5, inc: 1 };
const valenceLabel = ["Very\nUnpleasant", "Neither Pleasant\nNor Unpleasant", "Very\nPleasant"];
const valenceText = "How pleasant or unpleasant is this image for you?";
const valanceQuestionsChoice = false;

function runValence(context, condition, cue) {
	clear();

	let text = document.createElement("h1");
	text.className = "highlight";
	text.innerHTML = valenceText;
	document.body.appendChild(text);

	canvas.width = width * valenceImageScaling;
	canvas.height = height * valenceImageScaling;
	setContext(context, condition, valenceImageScaling);
	drawImg(cue, condition, valenceImageScaling);
	drawBorder(valenceImageScaling);
	drawCross(valenceImageScaling);
	document.body.appendChild(canvas);

	return new Promise(resolve => {
		document.body.appendChild(createScale(valenceScale, () => {
			resolve(getRating(valenceScale.name));
		}));
		document.body.appendChild(labelScale(valenceLabel));
	});
}

async function runFinalValence() {
	let text = document.createElement("h1");
	text.className = "highlight";
	text.innerHTML = valenceText;

	clearCanvas();
	await sleep(time / 4);
	for (let i = 0; i < valenceImages.length; i++) {
		Images.finalValence.valence.src = valenceImages[i];
		document.body.appendChild(canvas);

		drawCross();
		await sleep(time / 4);
		clearCanvas();

		drawImg("finalValence", "valence");
		await sleep(time / 4);
		clearCanvas();

		clear();

		// 			imgPath					- path to the image presented
		// 			rating					- rating received

		document.body.appendChild(text);
		let imgPath = valenceImages[i];
		let rating = await new Promise(resolve => {
			document.body.appendChild(createScale(valenceScale, () => {
				resolve(getRating(valenceScale.name));
			}));
			document.body.appendChild(labelScale(valenceLabel));
		});

		clear();

		// LOG HERE
		logRatingData(imgPath, rating);
	}
	resetCanvas();
}