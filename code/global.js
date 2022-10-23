// for testing purposes
const warmupChoice = true;
const trainingChoice = true;
const mainExpChoice = true;
const finalValenceChoice = true;//predictionc is constant

// The user will always pass the pre-experiment after one trial
const trainingCheat = false;

const time = 1000; // 1000 is original. Speed up - decrease time; Speed down - increase time;
controlMainCounter = 0;

const width = 1024, height = 768;
const bgwidth = 740, bgheight = 510;
const cuewidth = 180, cueheight = 196;
const crosswidth = 40, crossheight = 40;
const CrossPosition = { x: width / 2, y: height / 2 };

const Images = {
	consent: {
		form: new Image()
	},

	patternA: {
		training: new Image(),
		ctrA: new Image(),
		ctrB: new Image(),
		extA: new Image(),
		extB: new Image(),
		ccA: new Image(),
		ccB: new Image(),
		nfeA: new Image(),
		nfeB: new Image()
	},

	patternB: {
		training: new Image(),
		ctrA: new Image(),
		ctrB: new Image(),
		extA: new Image(),
		extB: new Image(),
		ccA: new Image(),
		ccB: new Image(),
		nfeA: new Image(),
		nfeB: new Image(),
	},

	colorA: {
		training: new Image(),
		ctrA: new Image(),
		ctrB: new Image(),
		extA: new Image(),
		extB: new Image(),
		ccA: new Image(),
		ccB: new Image(),
		nfeA: new Image(),
		nfeB: new Image(),
	},

	colorB: {
		training: new Image(),
		ctrA: new Image(),
		ctrB: new Image(),
		extA: new Image(),
		extB: new Image(),
		ccA: new Image(),
		ccB: new Image(),
		nfeA: new Image(),
		nfeB: new Image(),

	},

	O1: {
		training: new Image(),
		ctrA: new Image(),
		ctrB: new Image(),
		extA: new Image(),
		extB: new Image(),
		ccA: new Image(),
		ccB: new Image(),
		nfeA: new Image(),
		nfeB: new Image(),
	},

	O2: {
		training: new Image(),
		ctrA: new Image(),
		ctrB: new Image(),
		extA: new Image(),
		extB: new Image(),
		ccA: new Image(),
		ccB: new Image(),
		nfeA: new Image(),
		nfeB: new Image(),

	},

	O3: {
		training: new Image(),
		ctrA: new Image(),
		ctrB: new Image(),
		extA: new Image(),
		extB: new Image(),
		ccA: new Image(),
		ccB: new Image(),
		nfeA: new Image(),
		nfeB: new Image(),
	},

	W: {
		training: new Image(),
		ctrA: new Image(),
		ctrB: new Image(),
		extA: new Image(),
		extB: new Image(),
		ccA: new Image(),
		ccB: new Image(),
		nfeA: new Image(),
		nfeB: new Image(),

	},

	X: {
		training: new Image(),
		ctrA: new Image(),
		ctrB: new Image(),
		extA: new Image(),
		extB: new Image(),
		ccA: new Image(),
		ccB: new Image(),
		nfeA: new Image(),
		nfeB: new Image(),

	},

	Y: {
		training: new Image(),
		ctrA: new Image(),
		ctrB: new Image(),
		extA: new Image(),
		extB: new Image(),
		ccA: new Image(),
		ccB: new Image(),
		nfeA: new Image(),
		nfeB: new Image(),
	},

	finalValence: {
		valence: new Image()
	}
}
const Position = {
	W: { x: 0, y: 154 },
	X: { x: 250, y: 154 },
	Y: { x: -250, y: 154 },
	O1: { x: -250, y: -154 },
	O2: { x: 0, y: -154 },
	O3: { x: 0, y: -154 },
	border: { x: 250, y: 154 },
	finalValence: { x: 0, y: 0 }
};

const TrialComposition = {
	ctr: {
		Phase0: "Phase 0 [5,0,0,0] [0,0,0,0] [0,0,0,5] [0,0,0,0]",
		Phase1: "Phase 1 [0,0,0,0] [0,5,5,10] [0,0,0,0] [0,0,0,0]"
	},
	ext: {
		Phase0: "Phase 0 [5,0,0,0] [0,0,0,0] [0,0,0,5] [0,0,0,0]",
		Phase1: "Phase 1 [0,0,0,5] [0,5,5,0] [0,0,0,5] [0,0,0,0]"
	},
	cc: {
		Phase0: "Phase 0 [5,0,0,0] [0,0,0,0] [0,0,0,5] [0,0,0,0]",
		Phase1: "Phase 1 [0,0,5,0] [0,5,0,5] [0,0,0,5] [0,0,0,0]"
	},
	nfe: {
		Phase0: "Phase 0 [5,0,0,0] [0,0,0,0] [0,0,0,5] [0,0,0,0]",
		Phase1: "Phase 1 [0,5,0,0] [0,0,5,5] [0,0,0,5] [0,0,0,0]"
	}
}