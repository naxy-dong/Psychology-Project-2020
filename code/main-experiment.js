async function startMainExperiment() {
	const footer = new TestFooter();
	let choice = USER_DATA.choice;

	for (i = 0; i < 2; i++) {
		mainConditionList = shuffle([["ext", "A"], ["ctr", "A"], ["nfe", "A"], ["cc", "A"], ["ext", "B"], ["ctr", "B"], ["nfe", "B"], ["cc", "B"]]);
		for (j = 0; j < 8; j++) {
			await sleep(time / 4);
			console.log("Condition: "+mainConditionList[j][0] + mainConditionList[j][1]);
			await mainExpPhase1(mainConditionList[j][0], mainConditionList[j][0] + mainConditionList[j][1]);

			let predictionRating = 0, valenceRatingX = 0, valenceRatingY = 0, valenceRatingW = 0, magicNumbersList = [];

			shuffle(valenceCues, true);
			if (choice == "PVVP") {
				predictionRating = await runPrediction(mainConditionList[j][1], mainConditionList[j][0] + mainConditionList[j][1], ["O1"]);
				resetCanvas();

				for (const cue of valenceCues) {
					let valenceResult = await runValence(mainConditionList[j][1], mainConditionList[j][0] + mainConditionList[j][1], cue);
					switch (cue) {
						case "X":
							valenceRatingX = valenceResult;
							magicNumbersList.push(3);
							break;
						case "Y":
							valenceRatingY = valenceResult;
							magicNumbersList.push(1);
							break;
						case "W":
							valenceRatingW = valenceResult;
							magicNumbersList.push(2);
							break;
						default:
							break;
					}
				} resetCanvas();
			}
			else {
				for (const cue of valenceCues) {
					let valenceResult = await runValence(mainConditionList[j][1], mainConditionList[j][0] + mainConditionList[j][1], cue);
					switch (cue) {
						case "X":
							valenceRatingX = valenceResult;
							magicNumbersList.push(3);
							break;
						case "Y":
							valenceRatingY = valenceResult;
							magicNumbersList.push(1);
							break;
						case "W":
							valenceRatingW = valenceResult;
							magicNumbersList.push(2);
							break;
						default:
							break;
					}
				}
				resetCanvas();
				predictionRating = await runPrediction(mainConditionList[j][1], mainConditionList[j][0] + mainConditionList[j][1], ["O1"]);
				resetCanvas();
			}
			await showSlide(nextSequence);

			// Logging Code
			let streamName = mainConditionList[j][0] + "AB" + mainConditionList[j][1];
			let trialCompositionObject = TrialComposition[mainConditionList[j][0]];
			let contextImagePattern0 = Images.patternA[mainConditionList[j][0] + mainConditionList[j][1]].src, contextImagePattern1 = Images.patternB[mainConditionList[j][0] + mainConditionList[j][1]].src;
			let contextImageColor0 = Images.colorA[mainConditionList[j][0] + mainConditionList[j][1]].src, contextImageColor1 = Images.colorB[mainConditionList[j][0] + mainConditionList[j][1]].src;
			let cueImage0 = Images.X[mainConditionList[j][0] + mainConditionList[j][1]].src, cueImage1 = Images.Y[mainConditionList[j][0] + mainConditionList[j][1]].src, cueImage2 = Images.W[mainConditionList[j][0] + mainConditionList[j][1]].src;
			let outcomeImage0 = Images.O1[mainConditionList[j][0] + mainConditionList[j][1]].src, outcomeImage1 = Images.O2[mainConditionList[j][0] + mainConditionList[j][1]].src, outcomeImage2 = Images.O3[mainConditionList[j][0] + mainConditionList[j][1]].src;

			let phaseData = createPhaseLogData(
				streamName,
				trialCompositionObject,
				contextImagePattern0,
				contextImagePattern1,
				contextImageColor0,
				contextImageColor1,
				cueImage0,
				cueImage1,
				cueImage2,
				outcomeImage0,
				outcomeImage1,
				outcomeImage2
			);

			let contextImagePattern = Images["pattern" + mainConditionList[j][1]][mainConditionList[j][0] + mainConditionList[j][1]].src, contextImageColor = Images["color" + mainConditionList[j][1]][mainConditionList[j][0] + mainConditionList[j][1]].src;
			let stimXImage = Images.X[mainConditionList[j][0] + mainConditionList[j][1]].src, stimXImageCoords = [getPos("X").x, getPos("X").y]; // * scale
			let stimXImageCoordsRating = [getPos("X").x, getPos("X").y]; // * scale
			let stimO1Image = Images.O1[mainConditionList[j][0] + mainConditionList[j][1]].src, stimO1ImageCoords = [getPos("O1").x, getPos("O1").y]; // * scale

			let predictionData = createPredictionLogData(
				streamName,
				contextImagePattern,
				contextImageColor,
				stimXImage,
				stimXImageCoords,
				stimXImageCoordsRating,
				stimO1Image,
				stimO1ImageCoords
			);

			let stimYImage = Images.Y[mainConditionList[j][0] + mainConditionList[j][1]].src, stimYImageCoords = [getPos("Y").x, getPos("Y").y]; // * scale
			let stimWImage = Images.W[mainConditionList[j][0] + mainConditionList[j][1]].src, stimWImageCoords = [getPos("W").x, getPos("W").y]; // * scale

			let valenceData = createValenceLogData(
				streamName,
				contextImagePattern,
				contextImageColor,
				stimXImage,
				stimXImageCoords,
				stimYImage,
				stimYImageCoords,
				stimWImage,
				stimWImageCoords
			);

			let testData = createTestData(phaseData, predictionData, valenceData);
			logTestData(testData);

			let predictionFirst = choice == "PVVP";

			footer.log(
				streamName,
				predictionRating.O1,
				valenceRatingX,
				valenceRatingY,
				valenceRatingW,
				magicNumbersList,
				predictionFirst
			);
		}

		choice = choice == "PVVP" ? "VPPV" : "PVVP";
	}
	logTestFooterData(footer);
}

async function mainExpPhase1(condition, idx) {
	// mainCues = shuffle(mainCues);
	mainCuesNames = shuffle(["X", "X", "X", "X", "X", "W", "W", "W", "W", "W"]);
	setContext("A", idx);
	drawBorder();
	drawCross();
	for (mainCue of mainCuesNames) {
		await sleep(time / 2);
		drawImg(mainCue, idx);
		if (mainCue == "X") {
			await sleep(time / 4); drawImg("O1", idx);
		}
		await sleep(time / 2);
		setContext("A", idx);
		drawBorder();
		drawCross();
	}
	await sleep(time / 2);
	await mainExpPhase2(condition, idx);
}

async function mainExpPhase2(condition, idx, cycle1 = true) {
	setContext("B", idx);
	drawBorder();
	drawCross();
	mainCues = '';
	switch (condition) {
		case "ctr": mainCues = ctrCues;
			break;
		case "ext": mainCues = extCues;
			break;
		case "cc": mainCues = CCcues;
			break;
		case "nfe": mainCues = NFEcues;
			break;
	}

	let allctr = shuffle(["pos", "pos", "pos", "pos", "pos", "neu", "neu", "neu", "neu", "neu", null, null, null, null, null, null, null, null, null, null]);
	let p = 5, q = 10;
	for (cue of mainCues) {
		await sleep(time / 2);
		drawImg(cue, idx);
		switch (condition) {
			case "ctr":
				ctrOut = allctr[controlMainCounter % 20];
				controlMainCounter++;
				switch (ctrOut) {
					case "pos": await sleep(time / 4); drawImg("O3", idx);
						break;
					case "neu": await sleep(time / 4); drawImg("O2", idx);
						break;
					case null: await sleep(time / 4);
						break;
				}
				break;
			case "ext":
				if (cue == "Y") {
					await sleep(time / 4);
					if (Math.random() < p / q--) {
						drawImg("O3", idx); p--;
					}
					else {
						drawImg("O2", idx);
					}
				}
				break;
			case "cc":
				if (cue == "X") {
					await sleep(time / 4);
					drawImg("O3", idx);
				}
				if (cue == "Y") {
					if (Math.random() < p / q--) {
						await sleep(time / 4); drawImg("O2", idx);
						p--;
					}
				}
				break;
			case "nfe":
				if (cue == "X") {
					await sleep(time / 4);
					drawImg("O2", idx);
				}
				if (cue == "Y") {
					if (Math.random() < p / q--) {
						await sleep(time / 4); drawImg("O3", idx);

					}
				}
				break;
		}
		await sleep(time / 2);
		setContext("B", idx);
		drawBorder();
		drawCross();

	}
	if (cycle1) await mainExpPhase2(condition, idx, false);
}