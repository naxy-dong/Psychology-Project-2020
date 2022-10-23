const EXPERIMENT_TRAIN_DATA = [];
const EXPERIMENT_TEST_DATA = [];
const EXPERIMENT_RATING_DATA = [];

function getDateAsString() {
	const DATE = new Date();
	const date = DATE.getDate();
	const month = DATE.getMonth() + 1;
	const year = DATE.getFullYear();
	return `${date}/${month}/${year}`;
}

function getTimeAsString() {
	const DATE = new Date();
	const hours = DATE.getHours();
	const minutes = DATE.getMinutes();
	return `${hours}h${minutes}`;
}

// ================================================================ //
// =================== LOGGING EXPERIMENT DATA ==================== //
// ================================================================ //

function capitalize(str) {
	if (typeof str != "string") return "";
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function processResourceFilepath(filepath) {
	return filepath.substring(filepath.indexOf("ressource"));
}

// O1 - Aversive, O2 - Neutral, O3 - Positive
function convertImagePathToQuestionType(path) {
	if (path.search("Aversive") > -1) return "O1";
	if (path.search("Neutral") > -1) return "O2";
	if (path.search("Positive") > -1) return "O3";
}

// Parameters:
// 				imgPath				- path to the image presented
// 				rating				- rating received

function logRatingData(imgPath, rating) {
	let log = convertImagePathToQuestionType(imgPath) + " " + processResourceFilepath(imgPath) + " " + rating;
	EXPERIMENT_RATING_DATA.push(log);
}

// Parameters:
// 				warmupType		- either positive, negative, null1, or null2

function logTrainData(
	warmupType,
	predictionRatings,
	predictionRatingCoords,
	valenceRatings,
	magicNumbersList,
	predictionFirst
) {
	let log = "";
	log += warmupType + "Warmup PRED ";

	// XO1
	log += (capitalize(warmupType) + "-XO1Prediction ");
	log += predictionRatings.O1;
	log += (" [" + predictionRatingCoords.O1.x + " " + predictionRatingCoords.O1.y + "] 1 ");

	// XO2
	log += (capitalize(warmupType) + "-XO2Prediction ");
	log += predictionRatings.O2;
	log += (" [" + predictionRatingCoords.O2.x + " " + predictionRatingCoords.O2.y + "] 2 ");

	// XNull
	log += (capitalize(warmupType) + "-XNullPrediction ");
	log += predictionRatings.null;
	log += (" [" + predictionRatingCoords.null.x + " " + predictionRatingCoords.null.y + "] 3 ");

	// Valence
	log += " VAL ";
	log += (capitalize(warmupType) + "-XValence " + valenceRatings.X + " ");
	log += (capitalize(warmupType) + "-YValence " + valenceRatings.Y + " ");
	log += (capitalize(warmupType) + "-WValence " + valenceRatings.W + " ");

	magicNumbersList.forEach(elem => {
		log += (elem + " ");
	});

	log += (predictionFirst) ? "predictionFirst" : "valenceFirst";

	EXPERIMENT_TRAIN_DATA.push(log);
}

// -------- STRUCT TrialComposition -------- //
//
// key: 	(String) data presented (condition, stimuli, etc.)
// value:   (Tuple/Array) first  element would be the number for the first  phase
//				          second element would be the number for the second phase                  
//
// ----------------------------------------- //

// Parameters:
//			trialCompositionObject 	- object containing the structures and order of images

function getTrialCompositionString(trialCompositionObject) {
	let trialCompString = "Trial composition [nbX-O1, nbX-O2, nbX-O3, nbX-Null] [nbY-O1, nbY-O2, nb0Y-O3, nbY-Null] [nbW-O1, nbW-O2, nb0W-O3, nbW-Null] [nbNull-O1, nbNull-O2, nbNull-O3, nbNull-Null]\n";
	let phaseString0 = trialCompositionObject.Phase0 + "\n";
	let phaseString1 = trialCompositionObject.Phase1 + "\n";

	return trialCompString + phaseString0 + phaseString1;
}

// Parameters:
//			streamName 				- name of the stream
//			trialCompositionObject 	- object containing the structures and order of images
//			contextImagePattern0	- pattern image presented in context 0
//			contextImagePattern1	- pattern image presented in context 1
//			contextImageColor0		- color image presented in context 0
//			contextImageColor1		- color image presented in context 1
//			cueImage0				- image for cue 0
//			cueImage1				- image for cue 1
//			cueImage2				- image for cue 2
//			outcomeImage0			- image for outcome 0
//			outcomeImage1			- image for outcome 1
//			outcomeImage2			- image for outcome 2

function createPhaseLogData(
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
) {
	let streamNameString = "Stream name is " + streamName + "\n";
	let startTimeString = "Start time = 1\n";
	let stimulusDurationString = "Stimulus duration (cue, outcome, ITI) = (0.4,0.4,0.4\n";
	let phaseRepetitionString = "Phase 0 is repeated 1 times\nPhase 1 is repeated 2 times\n";
	let trialCompositionString = getTrialCompositionString(trialCompositionObject);
	let contextImagesString = "Context 0 is " + processResourceFilepath(contextImagePattern0) + " with " + processResourceFilepath(contextImageColor0) + "\nContext 1 is " + processResourceFilepath(contextImagePattern1) + " with " + processResourceFilepath(contextImageColor1) + "\n";
	let cueImagesString = "cue 0 is " + processResourceFilepath(cueImage0) + "\ncue 1 is " + processResourceFilepath(cueImage1) + "\ncue 2 is " + processResourceFilepath(cueImage2) + "\n";
	let outcomeImagesString = "outcome 0 is " + processResourceFilepath(outcomeImage0) + "\noutcome 1 is " + processResourceFilepath(outcomeImage1) + "\noutcome 2 is " + processResourceFilepath(outcomeImage2) + "\n";

	return streamNameString + startTimeString + stimulusDurationString + phaseRepetitionString + trialCompositionString + contextImagesString + cueImagesString + outcomeImagesString;
}

// Parameters:
//			streamName 				- name of the stream
//			contextImagePattern		- pattern image presented in the context
//			contextImageColor		- color image presented in the context 0
//			stimXImage				- cue image presented as stimulus x
//			stimXImageCoords		- array with 2 elements containing stimXImage's xy coordinates
//			stimXImageCoordsRating	- array with 2 elements containing rating stimXImage's xy coordinates
//			stimO1Image				- image presented as stimulus O1
//			stimO1ImageCoords		- array with 2 elements containing stimO1Image's xy coordinates

function createPredictionLogData(
	streamName,
	contextImagePattern,
	contextImageColor,
	stimXImage,
	stimXImageCoords,
	stimXImageCoordsRating,
	stimO1Image,
	stimO1ImageCoords
) {
	let testNameString = "rating test name is " + streamName + "\n";
	let logString00 = "The participant is shown the following images\n";
	let contextString = "Context: " + processResourceFilepath(contextImagePattern) + " " + processResourceFilepath(contextImageColor) + "\n";
	let stimXImageString = "Stim X " + processResourceFilepath(stimXImage) + " at [" + stimXImageCoords[0] + " " + stimXImageCoords[1] + "]\n";
	let logString01 = "The participant is asked the following ratings\n";
	let stimXImageRatingString = "Stim X " + processResourceFilepath(stimXImage) + " at [" + stimXImageCoordsRating[0] + " " + stimXImageCoordsRating[1] + "]\n";
	let stimO1ImageString = "Stim O1 " + processResourceFilepath(stimO1Image) + " at [" + stimO1ImageCoords[0] + " " + stimO1ImageCoords[1] + "]\n";

	return testNameString + logString00 + contextString + stimXImageString + logString01 + contextString + stimXImageRatingString + stimO1ImageString;
}

// Parameters:
//			streamName - name of the stream
//			contextImagePattern		- pattern image presented in the context
//			contextImageColor		- color image presented in the context
//			stimXImage				- cue image presented as stimulus x
//			stimXImageCoords		- array with 2 elements containing stimXImage's xy coordinates
//			stimYImage				- cue image presented as stimulus y
//			stimYImageCoords		- array with 2 elements containing stimYImage's xy coordinates
//			stimWImage				- cue image presented as stimulus w
//			stimWImageCoords		- array with 2 elements containing stimWImage's xy coordinates

function createValenceLogData(
	streamName,
	contextImagePattern,
	contextImageColor,
	stimXImage,
	stimXImageCoords,
	stimYImage,
	stimYImageCoords,
	stimWImage,
	stimWImageCoords,
) {
	let logString00 = "Valence set 0\n";
	let testNameStringX = "rating test name is " + streamName + "-Xvalence\n";
	let testNameStringY = "rating test name is " + streamName + "-Yvalence\n";
	let testNameStringW = "rating test name is " + streamName + "-Wvalence\n";
	let logString01 = "The participant is shown the following images\n";
	let contextString = "Context: " + processResourceFilepath(contextImagePattern) + " " + processResourceFilepath(contextImageColor) + "\n";
	let stimXString = "Stim X " + processResourceFilepath(stimXImage) + " at [" + stimXImageCoords[0] + " " + stimXImageCoords[1] + "]\n";
	let stimYString = "Stim Y " + processResourceFilepath(stimYImage) + " at [" + stimYImageCoords[0] + " " + stimYImageCoords[1] + "]\n";
	let stimWString = "Stim W " + processResourceFilepath(stimWImage) + " at [" + stimWImageCoords[0] + " " + stimWImageCoords[1] + "]\n";
	let logString02 = "The participant is asked the following ratings\n";
	let noImageString = "No image";

	let resultString = "";

	resultString += (logString00 + testNameStringX + logString01 + contextString + stimXString + logString02 + noImageString);
	resultString += (logString00 + testNameStringY + logString01 + contextString + stimYString + logString02 + noImageString);
	resultString += (logString00 + testNameStringW + logString01 + contextString + stimWString + logString02 + noImageString);

	return resultString;
}

// Parameters:
// 			phaseData 		- metadata about the trial and phase composition
//			predictionData 	- metadata about the prediction rating values
//			valenceData 	- metadata about the valence rating values

function createTestData(phaseData, predictionData, valenceData) {
	return {
		"phase": phaseData,
		"prediction": predictionData,
		"valence": valenceData,
	};
}

// Parameters:
//			testData - object holding the data about the test

function logTestData(testData) {
	let finalString = testData["phase"] + "PREDICTION RATING\n" + testData["prediction"] + "VALENCE RATING\n" + testData["valence"] + "\n";
	EXPERIMENT_TEST_DATA.push(finalString);
}

class TestFooter {
	constructor() {
		this.data = [];
	}

	log(
		streamName,
		predictionRating,
		valenceXRating,
		valenceYRating,
		valenceWRating,
		magicNumbersList,
		predictionFirst
	) {
		let str = streamName + " PRED " + streamName + "-XO1Prediction " + predictionRating + " [0, -150] 1 VAL ";
		str += (streamName + "-XValence " + valenceXRating + " ");
		str += (streamName + "-YValence " + valenceYRating + " ");
		str += (streamName + "-WValence " + valenceWRating + " ");

		magicNumbersList.forEach(elem => {
			str += (elem + " ");
		});

		str += ((predictionFirst) ? "predictionFirst" : "valenceFirst");

		this.data.push(str);
	}

	toString() {
		let result = "--------------------------------------------------\nbegin\n";

		this.data.forEach(entry => {
			result += (entry + "\n");
		});

		result += "end\n--------------------------------------------------";
		result += "File closed on " + getDateAsString() + " at " + getTimeAsString();
		result += "\n";

		return result;
	}
};

function logTestFooterData(footer) {
	EXPERIMENT_TEST_DATA.push(footer.toString());
}

// ================================================================ //
// ================== SAVING AND EXPORTING DATA =================== //
// ================================================================ //

function addHeadline(str) {
	str += "File created on " + getDateAsString() + " at " + getTimeAsString() + "\n";
	str += "ParticipantId: " + USER_DATA.id + " Age: " + USER_DATA.age + " Gender: " + USER_DATA.gender + "\n";
	str += "--------------------------------------------------\n";
	return str;
}

function processDataToExport(dataList) {
	let result = "";
	result = addHeadline(result);
	dataList.forEach(log => result += log + "\n");
	return result;
}

function exportToFile(dataType, dataList) {
	let exportFilename = USER_DATA.id + dataType;
	let result = processDataToExport(dataList);
	let blob = new Blob([result], { type: "text/plain;charset=utf-8" });
	saveAs(blob, exportFilename);
}

function exportToDropbox(dataType, dataList) {
	let exportFilename = USER_DATA.id + dataType + ".txt";
	let result = processDataToExport(dataList);
	let blob = new Blob([result], { type: "text/plain;charset=utf-8" });

	uploadFileToDropbox(blob, exportFilename);
}

function exportTrainData(uploadto_dbx = true) {
	if (uploadto_dbx)
		exportToDropbox("TRAIN", EXPERIMENT_TRAIN_DATA);
	else
		exportToFile("TRAIN", EXPERIMENT_TRAIN_DATA);
}

function exportTestData(uploadto_dbx = true) {
	if (uploadto_dbx)
		exportToDropbox("TEST", EXPERIMENT_TEST_DATA);
	else
		exportToFile("TEST", EXPERIMENT_TEST_DATA);
}

function exportRatingData(uploadto_dbx = true) {
	if (uploadto_dbx)
		exportToDropbox("RATING", EXPERIMENT_RATING_DATA);
	else
		exportToFile("RATING", EXPERIMENT_RATING_DATA);
}