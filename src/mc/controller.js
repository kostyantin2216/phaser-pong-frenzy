import Events from '../events';

import app from '../app';

export default class Controller {
    constructor(config) {
        this.emitter = config.emitter;
        this.registerEvents();
    }

    registerEvents() {
        this.emitter.on(Events.SCORE_UPDATED, this.scoreUpdated);
        this.emitter.on(Events.SET_SCORE, this.setScore);
        this.emitter.on(Events.INCREASE_SCORE, this.increaseScore);
        this.emitter.on(Events.TOGGLE_MUSIC, this.toggleMusic);
        this.emitter.on(Events.TOGGLE_SOUND, this.toggleSound);
        this.emitter.on(Events.GAME_OVER, this.gameOver);
        this.emitter.on(Events.RESET_GAME, this.resetGame);

    }

    scoreUpdated() {
        if (app.model.speed < 2 && app.model.score / 5 === Math.floor(app.model.score / 5)) {
            app.model.speed += .25;
        }
        console.log(app.model.score, app.model.speed);
    }

    setScore(score) {
        app.model.score = score;
    }

    increaseScore(points) {
        const newScore = app.model.score + points;
        app.model.score = newScore;
    }

    toggleMusic(value) {
        console.log('toggling music', value);
        app.model.musicOn = value || !app.model.musicOn;
    }

    toggleSound(value) {
        console.log('toggling sound', value);
        app.model.soundOn = value || !app.model.soundOn;
    }

    gameOver() {
        app.model.gameOver = true;
    }

    resetGame() {
        app.model.setDefaultValues();
    }
}
