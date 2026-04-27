import Plyr from 'plyr';

// --- Аудіо ---
const audioPlayersElements = document.querySelectorAll('.js-audio-player');
let audioPlayers = [];

if (audioPlayersElements.length > 0) {
	audioPlayers = Plyr.setup('.js-audio-player');

	audioPlayers.forEach((player, i) => {
		player.on('play', () => {
			audioPlayers.forEach((otherPlayer, a) => {
				if (a !== i) otherPlayer.pause();
			});
			videoPlayers.forEach(v => v.pause());
		});
	});
}

// --- Відео ---
const videoPlayersElements = document.querySelectorAll('.specific-player');
const videoPlayers = [];

videoPlayersElements.forEach((video) => {
	video.removeAttribute('controls');

	const plyrVideoPlayer = new Plyr(video, {
		clickToPlay: false,
		controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
	});

	videoPlayers.push(plyrVideoPlayer);

	const wrapper = video.closest('.video-wrap--vissible');
	const playPauseButton = wrapper.querySelector('.btn-video-play-pause');
	const videoTitle = wrapper.querySelector('.video-title');

	// Заголовок і кнопка спочатку видимі
	if (videoTitle) videoTitle.style.display = 'block';
	if (playPauseButton) playPauseButton.style.display = 'flex';

	const overlay = video.parentElement.querySelector('.plyr__control--overlaid');
	if (overlay) overlay.style.display = 'none';

	let hasStarted = false;

	const clickHandler = (e) => { if (!hasStarted) e.stopPropagation(); };
	video.addEventListener('click', clickHandler);

	if (playPauseButton) {
		playPauseButton.addEventListener('click', () => {
			// Ставимо на паузу всі аудіо
			audioPlayers.forEach(p => p.pause());
			// Ставимо на паузу інші відео
			videoPlayers.forEach(v => { if (v !== plyrVideoPlayer) v.pause(); });
			plyrVideoPlayer.play();
		});
	}

	plyrVideoPlayer.on('play', () => {
		if (!hasStarted) {
			hasStarted = true;
			// Ховаємо одночасно кнопку і заголовок
			if (playPauseButton) playPauseButton.style.display = 'none';
			if (videoTitle) videoTitle.style.display = 'none';
			video.removeEventListener('click', clickHandler);
		}
	});

	plyrVideoPlayer.on('ended', () => {
		plyrVideoPlayer.currentTime = 0;
		hasStarted = false;
		// Повертаємо кнопку і заголовок на місце
		if (playPauseButton) playPauseButton.style.display = 'flex';
		if (videoTitle) videoTitle.style.display = 'block';
		video.addEventListener('click', clickHandler);
	});
});

// --- Зупинка всіх ---
function pauseAllPlayers() {
	audioPlayers.forEach(p => p.pause());
	videoPlayers.forEach(p => p.pause());
}
