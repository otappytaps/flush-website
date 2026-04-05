import track1 from "../assets/audio/track1.mp3";
import track2 from "../assets/audio/track2.mp3";
import track3 from "../assets/audio/track3.mp3";
import track4 from "../assets/audio/track4.mp3";
import flushSound from "../assets/audio/flush-sfx.mp3";

const tracks = [track1, track2, track3, track4];

class AudioManager {
    constructor() {
        this.currentIndex = 0;
        this.music = new Audio(tracks[this.currentIndex]);
        this.music.loop = false;
        this.music.volume = 0.2;

        this.music.addEventListener("ended", () => this.nextTrack());
        this.sfx = new Audio();
        this.sfx.volume = 0.5;
    }

    playFlush() {
        this.sfx.src = flushSound;
        this.sfx.currentTime = 0;
        this.sfx.play().catch(() => {});
    }

    nextTrack() {
        this.currentIndex = (this.currentIndex + 1) % tracks.length;
        this.music.src = tracks[this.currentIndex];
        this.music.play().catch(() => {});
    }

    play() {
        this.music.play().catch(() => {});
    }

    pause() {
        this.music.pause();
    }

    stop() {
        this.music.pause();
        this.music.currentTime = 0;
    }

    toggleMute() {
        this.music.muted = !this.music.muted;
    }

    setVolume(value) {
        this.music.volume = value;
    }
}

export default new AudioManager();