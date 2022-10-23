predictionChoices = [null, "O1", "O2"];
const predictionCoordinates = {};
const predictionImageScaling = 0.35, predictionChoiceScaling = 0.3;
const predictionScale = { name: "prediction", min: 0, max: 100, inc: 10 };
const predictionLabel = ["Very\nUnlikely", "Very\nLikely"];
const predictionText = [
	"Imagine you have been shown the following configuration on the screen",
	"Using the scale below each image, use the mouse to indicate how likely the top configuration is to be followed by each of the below configurations"
];

function runPrediction(context, condition, choices) {
	const promises = [];
	const ratings = {};

	clear();

	let text = document.createElement("h1");
	text.className = "highlight";
	text.innerHTML = predictionText[0];
	document.body.appendChild(text);

	canvas.width = width * predictionImageScaling;
	canvas.height = height * predictionImageScaling;
	setContext(context, condition, predictionImageScaling);
	drawImg("X", condition, predictionImageScaling);
	drawBorder(predictionImageScaling);
	drawCross(predictionImageScaling);
	document.body.appendChild(canvas);

	text = document.createElement("h1");
	text.className = "highlight";
	text.innerHTML = predictionText[1];
	document.body.appendChild(text);

	const container = document.createElement("div");
	container.className = "flex-container";
	container.style.justifyContent = "space-evenly";
	for (let i = 0; i < choices.length; i++) {
		const choice = choices[i];
		const div = document.createElement("div");
		const c = document.createElement("canvas");
		c.width = width * predictionChoiceScaling;
		c.height = height * predictionChoiceScaling;
		setContext(context, condition, predictionChoiceScaling, c);
		if (choice) drawImg(choice, condition, predictionChoiceScaling, c);
		drawImg("X", condition, predictionChoiceScaling, c);
		drawBorder(predictionChoiceScaling, c);
		drawCross(predictionChoiceScaling, c);
		div.appendChild(c);
		promises.push(new Promise(resolve => {
			div.appendChild(createScale(predictionScale, () => {
				trainingOneCycleData.push([conditions[conditionIndex], choice, getRating(`prediction${i + 1}`)]);
				ratings[choice] = getRating(`prediction${i + 1}`);
				predictionCoordinates[choice] = {};
				div.style.visibility = "hidden";
				resolve();
			}, c.width, `prediction${i + 1}`));
			div.appendChild(labelScale(predictionLabel, c.width));
		}));
		div.id = choice;
		container.appendChild(div);
	}
	document.body.appendChild(container);
	return new Promise(async resolve => {
		await Promise.all(promises);
		for (const child of container.childNodes) {
			const rect = child.getBoundingClientRect();
			predictionCoordinates[child.id].x = Math.round(rect.x + rect.width / 2 - window.innerWidth / 2);
			predictionCoordinates[child.id].y = -Math.round(rect.y + rect.height / 2 - window.innerHeight / 2);
		}
		resolve(ratings);
	});
}