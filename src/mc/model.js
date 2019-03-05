import Events from '../events';

export default class Model {
    constructor(config) {
        this.emitter = config.emitter;
        this._soundOn = true;
        this._musicOn = true;
        this.setDefaultValues();
    }

    setDefaultValues() {
        this._gameOver = false;
        this._score = 0;
        this._speed = 1;
    }

    set score(val) {
        this._score = val;

        this.emitter.emit(Events.SCORE_UPDATED);
    }

    get score() {
        return this._score;
    }

    set soundOn(val) {
        this._soundOn = val;

        this.emitter.emit(Events.SOUND_CHANGED);
    }

    get soundOn() {
        return this._soundOn;
    }

    set musicOn(val) {
        this._musicOn = val;

        this.emitter.emit(Events.MUSIC_CHANGED);
    }

    get musicOn() {
        return this._musicOn;
    }

    set gameOver(val) {
        this._gameOver = val;
    }

    get gameOver() {
        return this._gameOver;
    }

    set speed(val) {
        this._speed = val;
    }

    get speed() {
        return this._speed;
    }
}
