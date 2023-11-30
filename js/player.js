const tracks = [
	{
		title: "Aperture",
		artist: "Unison",
		source: "audio/Unison - Aperture.mp3",
		poster: "img/unison.jpg"
	},
	{
		title: "Moonlight",
		artist: "Jim Yosef",
		source: "audio/Jim Yosef - Moonlight.mp3",
		poster: "img/jimyosef.jpg"
	},
	{
		title: "Jumble",
		artist: "Rolipso",
		source: "audio/Rolipso - Jumble.mp3",
		poster: "img/rolipso.jpg"
	}
];

let songTitle = document.getElementById("songTitle"), artist = document.getElementById("artist"),
	seek = document.getElementById("seek");

let currentTime = document.getElementById("currentTime"),
    totalTime = document.getElementById("totalTime");

let song = new Audio();
let currentSong = 0;

//Default
song.src = tracks[0].source;
songTitle.textContent = tracks[currentSong].title;
artist.textContent = tracks[currentSong].artist;


function playSong() {
	song.src = tracks[currentSong].source;
	songTitle.textContent = tracks[currentSong].title;
	artist.textContent = tracks[currentSong].artist;
	song.play();
	document.querySelector("#play i").classList.remove("fa-play");
	document.querySelector("#play i").classList.add("fa-pause");

	document.querySelector("#image").setAttribute("src", tracks[currentSong].poster);
	document.querySelector("#background").setAttribute("src", tracks[currentSong].poster);
}

function playPause() {

	if (song.paused) {
		song.play();
		document.querySelector("#play i").classList.remove("fa-play");
		document.querySelector("#play i").classList.add("fa-pause");
	}
	else {
		song.pause();
		document.querySelector("#play i").classList.remove("fa-pause");
		document.querySelector("#play i").classList.add("fa-play");
	}
}

seek.addEventListener("input", function() {
	song.currentTime = this.value;
});

song.addEventListener("timeupdate", function() {
	
	seek.max = song.duration;
	seek.value = song.currentTime;
	convertTime(Math.round(song.currentTime)); //seconds

	if (totalTime.textContent === "NaN:NaN") {
	    totalTime.textContent = "00:00";
	} 
});

song.addEventListener("ended", function() {
	next();
});

function convertTime(seconds) {
	let min = Math.floor(seconds / 60);
	let sec = seconds % 60;

	min = (min < 10) ? "0" + min : min;
	sec = (sec < 10) ? "0" + sec : sec;

	currentTime.textContent = `${min}:${sec}`;

	getTotalTime(Math.round(song.duration));
}

function getTotalTime(seconds) {
	let min = Math.floor(seconds / 60);
	let sec = seconds % 60;

	min = (min < 10) ? "0" + min : min;
	sec = (sec < 10) ? "0" + sec : sec;

	totalTime.textContent = `${min}:${sec}`;
}

function next() {
	currentSong++;
	if(currentSong > tracks.length - 1) {
		currentSong = 0;
	}
	playSong();
}

function previous() {
	currentSong--;
	if(currentSong < 0) {
		currentSong = tracks.length - 1;
	}
	playSong();
}

let volumeBar = document.getElementById('volume-bar');
let saved = [];

function mute() {
    if(volumeBar.value !== "0") {
    	saved.push(volumeBar.value);
    }

	if(song.volume > 0) {
		song.volume = 0;
		document.getElementById('mute').innerHTML = '<i class="fa fa-volume-off"></i>';
		volumeBar.value = 0;
	}
	else {

		let lastVolume = saved.shift();
		parseFloat(lastVolume);

		song.volume = lastVolume || 1;
		document.getElementById('mute').innerHTML = '<i class="fa fa-volume-up"></i>';
		volumeBar.value = lastVolume || 1;
	}
}

function setVolume(volume) {
	song.volume = volume; 
	if(song.volume === 0) {
		document.getElementById('mute').innerHTML = '<i class="fa fa-volume-off"></i>';
	}
	else {
		document.getElementById('mute').innerHTML = '<i class="fa fa-volume-up"></i>';
	}
}

function createPlayList() {
	let playlistContainer = document.getElementById("playlist-container");

	let playlistTitleElem = document.createElement("div");
	let playListTitle = document.createTextNode(`Playlist:`);

	playlistTitleElem.id = `playlist-title`;
	playlistTitleElem.appendChild(playListTitle);
	playlistContainer.appendChild(playlistTitleElem);

	//Start of Playlist code
	for(let i = 0; i < tracks.length; i++) {

		let divElem = document.createElement("div");
		let artist = document.createTextNode(`${tracks[i].artist}`);
		let songName = document.createTextNode(`${tracks[i].title}`);


		divElem.id = `${i}`;
		divElem.className = `song-item`;
		divElem.append(artist, " ",songName);

	    playlistContainer.appendChild(divElem);

		divElem.addEventListener("click", function(event) {
			currentSong = +event.target.id;
			playSong();
		});
	}
}

document.addEventListener("DOMContentLoaded", createPlayList);