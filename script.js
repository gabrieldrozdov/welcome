const music = new Audio(`assets/audio/music-v2.mp3`);

function startShow() {
	const container = document.querySelector('.container');
	const stage = document.querySelector('.stage');
	const credit = document.querySelector('.credit');
	credit.style.display = 'none';
	container.dataset.open = 1;

	setTimeout(() => {
		stage.dataset.light = 1;
		music.play();
		setTimeout(() => {
			runScript();
		}, 4000)
	}, 2000)
}

let scriptLines = [
	"hello",
	"hi there",
	"welcome",
	"i am this website",
	"i’ve got so much",
	"so much in store for you",
	"on this",
	"*clears throat*",
	"in this",
	"website",
	"so much in store",
	"i bet you are excited",
	"you should be!",
	"you should be excited",
	"for this website",
	2000,
	"but first ground rules",
	"let’s set some ground rules",
	"first rule",
	"at no point should you close this tab",
	"tab stays open",
	"rule two",
	"don’t switch tabs",
	"i know it’s tempting",
	"they’re not as good",
	"this is the tab",
	"this is the website",
	"did you notice the lights?",
	"the curtains before?",
	"what about the fog",
	"did you notice the fog?",
	"that’s not something you’d find on other websites",
	"ok",
	"third rule",
	"hold on",
	"*paper rustling*",
	"found it",
	"third rule",
	"no screen recording",
	"ah that’s interesting",
	"“no screen recording”",
	"you know, i don’t make the rules",
	"you can record",
	"you can do a little recording",
	"i don’t mind",
	"it’s ok",
	1000,
	"well that’s it",
	"those are the rules",
	"in that case",
	"ladies and gentlemen",
	"please",
	"let’s give a warm welcome",
	"to this website",
	"here it is",
	"here we go",
	"in three",
	"two",
	"one"
];
let players = [];
let playerLine = 0;
for (let i=0; i<scriptLines.length; i++) {
	if (typeof(scriptLines[i]) != "number") {
		players.push(new Tone.Player(`assets/audio/lines/line${playerLine}.mp3`).toDestination());
		playerLine++;
	}
}

let currentLine = 0;
let actualLine = 0;
const scriptText = document.querySelector('.script-text');
const scriptShadow = document.querySelector('.script-shadow');
function runScript() {
	if (typeof(scriptLines[currentLine]) == 'number') {
		scriptText.innerHTML = '';
		scriptShadow.innerHTML = '';
		setTimeout(() => {
			currentLine++;
			runScript();
		}, scriptLines[currentLine])
	} else {
		scriptText.innerHTML = "<p>"+scriptLines[currentLine]+"</p>";
		scriptShadow.innerHTML = "<p>"+scriptLines[currentLine]+"</p>";
		players[actualLine].start();
		players[actualLine].onstop = () => {
			currentLine++;
			actualLine++;
			if (currentLine == scriptLines.length) {
				location.reload();
			} else {
				runScript();
			}
		};
		// OLD CODE (doesnt work on mobile safari)
		// let scriptAudio = new Audio(`assets/audio/lines/line${actualLine}.mp3`);
		// scriptAudio.autoplay = true;
		// scriptAudio.addEventListener('ended', () => {
		// 	currentLine++;
		// 	actualLine++;
		// 	if (currentLine == scriptLines.length) {
		// 		location.reload();
		// 	} else {
		// 		runScript();
		// 	}
		// })
	}
}