const cues = ["X", "X", "X", "X", "X", "X", "Y", "Y", "Y", "Y", "Y", "W", "W", "W", "W", "W", "W"];
const conditions = ["positive", "negative", "null1", "null2"];

async function startWarmup() {
	for (const condition of conditions) {
		await warmUpPhase1(condition);
		shuffle(valenceCues, true);
		if (Math.random() < 1 / 2) {
			for (const cue of valenceCues)
				await runValence("A", "training", cue);
			resetCanvas();
			shuffle(predictionChoices, true);
			await runPrediction("A", "training", predictionChoices);
			resetCanvas();
		}
		else {
			shuffle(predictionChoices, true);
			await runPrediction("A", "training", predictionChoices);
			resetCanvas();
			for (const cue of valenceCues)
				await runValence("A","training", cue);
			resetCanvas();
		}
		await showSlide(AnswerImages[condition]);
		await showSlide(nextSequence);
	}
}

async function warmUpPhase1(condition) {
	shuffle(cues, true);
	setContext("A", "training");
	drawBorder();
	drawCross();
	let p = 3, q = 6;
	for (const cue of cues) {
		await sleep(time / 2);
		drawImg(cue, "training");
		switch (condition) {
			case "positive":
				if (cue == "X") {
					await sleep(time / 4);
					drawImg("O1", "training");
				}
				break;
			case "negative":
				if (cue == "Y") {
					await sleep(time / 4);
					drawImg("O2", "training");
				}
				break;
			case "null1":
				if (cue == "Y") {
					await sleep(time / 4);
					drawImg("O2","training");
				}
				if (cue == "X")
					if (Math.random() < p / q--) {
						await sleep(time / 4);
						drawImg("O1","training");
						p--;
					}
				break;
			case "null2":
				if (cue == "X") {
					await sleep(time / 4);
					if (Math.random() < p / q--) {
						drawImg("O1","training");
						p--;
					} else drawImg("O2", "training");
				}
				break;
		}
		await sleep(time / 2);
		setContext("A", "training");
		drawBorder();
		drawCross();
	}
	await sleep(time / 2);
	await warmupPhase2();
}

async function warmupPhase2(cycle1 = true) {
	setContext("B", "training");
	drawBorder();
	drawCross();
	let p = 5, q = 11;
	await sleep(time / 2);
	for (let i = 0; i < 11; i++) {
		await sleep(time / 2);
		drawImg("Y", "training");
		if (Math.random() < p / q--) {
			await sleep(time / 4);
			drawImg("O2", "training");
			p--;
		}
		await sleep(time / 2);
		setContext("B", "training");
		drawBorder();
		drawCross();
	}
	await sleep(time / 2);
	if (cycle1) await warmupPhase2(false);
}

// ==================Pre-experiment/Training================== //

// training answers
const testVariable = [
	["positive", "O1", "100"],
	["positive", null, "0"],
	["positive", "O2", "0"],
	["null2", "O2", "50"],
	["null2", "O1", "50"],
	["null2", null, "0"],
	["negative", null, "100"],
	["negative", "O1", "0"],
	["negative", "O2", "0"],
	["null1", "O2", "0"],
	["null1", "O1", "50"],
	["null1", null, "50"],
];

let trainingOneCycleData = [], conditionIndex = 0, cycleNum = 0, participantFail = false;
async function startTraining() {
	let trainingTotalData = [];
	let chancesLeft = 10;

	training:
	while (chancesLeft !== 0) {
		shuffle(conditions, true);
		conditionIndex = 0;
		for (const condition of conditions) {
			let warmupType = condition;
			let predictionRatings = {};
			let predictionRatingCoords = {};
			let valenceRatings = {};
			let magicNumbersList = [];
			let predictionFirst = 0;

			await warmUpPhase1(condition);
			if (Math.random() < 1 / 2) {
				predictionFirst = false;

				shuffle(valenceCues, true);
				for (const cue of valenceCues) {
					valenceRatings[cue] = await runValence("A", "training", cue);
					switch (cue) {
						case "X": magicNumbersList.push(3);
							break;
						case "Y": magicNumbersList.push(1);
							break;
						case "W": magicNumbersList.push(2);
							break;
						default:
							break;
					}
				}
				resetCanvas();

				shuffle(predictionChoices, true);
				predictionRatings = await runPrediction("A", "training", predictionChoices);
				resetCanvas();
				predictionRatingCoords = predictionCoordinates;
			} else {
				predictionFirst = true;

				shuffle(predictionChoices, true);
				predictionRatings = await runPrediction("A", "training", predictionChoices);
				resetCanvas();
				predictionRatingCoords = predictionCoordinates;

				shuffle(valenceCues, true);
				for (const cue of valenceCues) {
					valenceRatings[cue] = await runValence("A", "training", cue);
					switch (cue) {
						case "X": magicNumbersList.push(3);
							break;
						case "Y": magicNumbersList.push(1);
							break;
						case "W": magicNumbersList.push(2);
							break;
						default:
							break;
					}
				}
				resetCanvas();
			}
			conditionIndex++;
			// LOG TRAIN DATA HERE
			logTrainData(
				warmupType,
				predictionRatings,
				predictionRatingCoords,
				valenceRatings,
				magicNumbersList,
				predictionFirst
			);
			if (oneCycleCorrect(trainingOneCycleData) && condition == conditions[conditions.length - 1])
				break training;
			else await showSlide(nextSequence);
		}

		// create a function that stores the data from the participant before it clears
		trainingTotalData.push(trainingOneCycleData);
		trainingOneCycleData = [];

		chancesLeft--;
		if (chancesLeft == 0) { // double check
			// write "participant failed to meet warm up criteria" in the report
			let str = "--------------------------------------------------PARTICIPANT FAILED WARMUP";
			participantFail = true;
			EXPERIMENT_TRAIN_DATA.push(str);
		}
	}
}

function oneCycleCorrect(data) {
	const Answer = {
		O1: { positive: 100, negative: 0, null1: 50, null2: 50 },
		O2: { positive: 0, negative: 0, null1: 0, null2: 50 },
		null: { positive: 0, negative: 100, null1: 50, null2: 0 }
	};
	if (trainingCheat) data = testVariable; // for debugging purposes(Participant will not fail and will pass in 1 cycle)
	let correctCounter = 0;
	for (let i = 0; i < data.length; i++) {
		let condition = data[i][0];
		let choice = data[i][1];
		let participantAnswer = data[i][2];
		if (participantAnswer <= 20) participantAnswer = 0;
		if (30 <= participantAnswer && participantAnswer <= 70) participantAnswer = 50;
		if (80 <= participantAnswer) participantAnswer = 100;
		if (Answer[choice][condition] == participantAnswer) correctCounter++;
	}
	return correctCounter == 12;
}