function loadWarmupImages() {
	Images.patternA.training.src = "ressource/Pattern/Training/Training-contextA.png";
	Images.patternB.training.src = "ressource/Pattern/Training/Training-contextB.png";
	Images.colorA.training.src = "ressource/Color/Training/Training-contextA.png";
	Images.colorB.training.src = "ressource/Color/Training/Training-contextB.png";
	Images.O1.training.src = "ressource/Stimuli/Training/Training-O1.png";
	Images.O2.training.src = "ressource/Stimuli/Training/Training-O2.png";
	Images.O3.training.src = "ressource/Stimuli/Training/Training-O3.png";
	Images.W.training.src = "ressource/Stimuli/Training/Training-W.png";
	Images.X.training.src = "ressource/Stimuli/Training/Training-X.png";
	Images.Y.training.src = "ressource/Stimuli/Training/Training-Y.png";
}

function initVariables() {
	mainConditionList = shuffle([["ext", "A"], ["ctr", "A"], ["nfe", "A"], ["cc", "A"], ["ext", "B"], ["ctr", "B"], ["nfe", "B"], ["cc", "B"]]);
	ctrCues = ["Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y"];
	extCues = shuffle(["X", "X", "X", "X", "X", "W", "W", "W", "W", "W", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y"]);
	CCcues = shuffle(extCues);
	NFEcues = shuffle(CCcues);

	mainCueNumbers = shuffle(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"]);

	setList = shuffle(["1", "2", "3", "4", "5", "6", "7", "8"]);
	positiveImages = shuffle(setList);
	negativeImages = shuffle(setList);
	neutralImages = shuffle(setList);
	set = shuffle(setList);
}

function loadMainExpImages() {
	initVariables();
	for (j = 0; j < set.length + 0; j++) {
		Images.patternA[mainConditionList[j][0] + mainConditionList[j][1]].src = "ressource/Pattern/set" + set[j] + "/set" + set[j] + "-contextA.png";
		Images.patternB[mainConditionList[j][0] + mainConditionList[j][1]].src = "ressource/Pattern/set" + set[j] + "/set" + set[j] + "-contextB.jpeg";
		Images.colorA[mainConditionList[j][0] + mainConditionList[j][1]].src = "ressource/Color/set" + set[j] + "/set" + set[j] + "-contextA.png";
		Images.colorB[mainConditionList[j][0] + mainConditionList[j][1]].src = "ressource/Color/set" + set[j] + "/set" + set[j] + "-contextB.jpeg";
		Images.O1[mainConditionList[j][0] + mainConditionList[j][1]].src = "ressource/Stimuli/Outcomes/Aversive/Aversive" + negativeImages[j] + ".jpg";
		Images.O2[mainConditionList[j][0] + mainConditionList[j][1]].src = "ressource/Stimuli/Outcomes/Neutral/Neutral" + neutralImages[j] + ".jpg";
		Images.O3[mainConditionList[j][0] + mainConditionList[j][1]].src = "ressource/Stimuli/Outcomes/Positive/Positive" + positiveImages[j] + ".jpg";
		Images.W[mainConditionList[j][0] + mainConditionList[j][1]].src = "ressource/Stimuli/Cues/cue" + mainCueNumbers[j * 3] + ".png";
		Images.X[mainConditionList[j][0] + mainConditionList[j][1]].src = "ressource/Stimuli/Cues/cue" + mainCueNumbers[j * 3 + 1] + ".png";
		Images.Y[mainConditionList[j][0] + mainConditionList[j][1]].src = "ressource/Stimuli/Cues/cue" + mainCueNumbers[j * 3 + 2] + ".png";
	}
}

function loadValenceImages() {
	valenceImages = [];
	for (i = 0; i < 5; i++) {
		for (j = 1; j < 9; j++) {
			valenceImages.push("ressource/Stimuli/Outcomes/Aversive/Aversive" + j + ".jpg");
			valenceImages.push("ressource/Stimuli/Outcomes/Positive/Positive" + j + ".jpg");
			valenceImages.push("ressource/Stimuli/Outcomes/Neutral/Neutral" + j + ".jpg");
		}
	}
	shuffle(valenceImages, true);
}

function initialize() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext('2d');
	canvas.remove();

	cross = new Image();
	border = new Image();
	cross.src = "ressource/cross.png";
	border.src = "ressource/Stimuli/Border.png";

	// dont yell at me, what we did was meant to be done :{
	// I KNOW THIS CODE IS PAINFUL TO LOOK AT SO IF YOU CAN'T STAND IT JUST CLOSE THE FILE >:(
	Images.consent.form.src = "ressource/ConsentForm.jpg";
	document.getElementById("consent-form-image").src = Images.consent.form.src;

	startExperimentBtn = document.getElementById("start-experiment-btn");
	startExperimentBtn.disabled = true;

	loadInstructions();
	loadWarmupImages()
	loadMainExpImages();
	loadValenceImages();
}

function toggleStartExperimentButton(state) {
	startExperimentBtn.disabled = !state;
}
