import { requireProperties } from "./validation-utils";
import Events from "../events";

export default class MediaManager {
    constructor(config) {
        requireProperties(config, ['scene', 'app']);

        this.scene = config.scene;
        this.app   = config.app;

        this.registerEvents();
    }

    registerEvents() {
        this.app.emitter.on(Events.PLAY_SOUND, this.playSound, this);
        this.app.emitter.on(Events.MUSIC_CHANGED, this.musicChanged, this);
    }

    playSound(key) {
        if (this.app.model.soundOn) {
            const sound = this.scene.sound.add(key);
            sound.play();
        }
    }

    musicChanged() {
        if (this.background) {
            if (this.app.model.musicOn) {
                this.background.play();
            } else {
                this.background.stop();
            }
        }
    }

    setBackgroundMusic(key) {
        this.background = this.scene.sound.add(key, { volume: 0.5, loop: true });
        if (this.app.model.musicOn) {
            this.background.play();
        }
    }

    removeBackgroundMusic() {
        if (this.background) {
            this.background.stop();
        }
        this.background = null;
    }
}
