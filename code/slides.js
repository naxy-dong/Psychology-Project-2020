const AnswerImages = {
	positive: new Image(),
	negative: new Image(),
	null1: new Image(),
	null2: new Image()
}

function loadInstructions() {
	welcomeSlide = new Image();
	nextSequence = new Image();
	prelimInstructions = new Image();
	mainExperimentInstructions = new Image();
	valenceInstructions = new Image();
	debriefA = new Image();
	debriefB = new Image();
	loadingDataSlide = new Image();

	loadingDataSlide.src = "ressource/loadingDataSlide.png";
	welcomeSlide.src = "ressource/Instruction/English/introduction.png";
	nextSequence.src = "ressource/Instruction/English/nextSequence.png";
	prelimInstructions.src = "ressource/Instruction/English/prelimInstructions.png";
	mainExperimentInstructions.src = "ressource/Instruction/English/experimentalConditionsA.png";
	valenceInstructions.src = "ressource/Instruction/English/ratinginstruct.png";

	AnswerImages.positive.src = "ressource/Instruction/English/positive.png";
	AnswerImages.negative.src = "ressource/Instruction/English/negative.png";
	AnswerImages.null1.src = "ressource/Instruction/English/null1.png";
	AnswerImages.null2.src = "ressource/Instruction/English/null2.png";
	debriefA.src = "ressource/Instruction/English/debriefingA.png";
	debriefB.src = "ressource/Instruction/English/debriefingB.png";
}

async function showSlide(slideSource, scale = 1, c = canvas) {
	c = c.getContext('2d');
	c.drawImage(slideSource, 0, 0, width * scale, height * scale);
	await mouseClick();
}

function showSlideNoClick(slideSource, scale = 1, c = canvas) {
	c = c.getContext('2d');
	c.drawImage(slideSource, 0, 0, width * scale, height * scale);
}
