import Phaser from 'phaser';
import Events from '../events';
import app from '../app';

export default class ScoreBox extends Phaser.GameObjects.Container {

    constructor(config) {
        super(config.scene);
        this.scene = config.scene;
        this.emitter = config.emitter;

        this.text1 = this.scene.add.text(0, 0, 'SCORE:0', {
            fontSize: app.game.config.width / 20
        });
        this.text1.setOrigin(0.5, 0.5);
        this.add(this.text1);

        this.scene.add.existing(this);

        this.emitter.on(Events.SCORE_UPDATED, this.scoreUpdated, this);
    }
    
    scoreUpdated() {
        this.text1.setText('SCORE:' + app.model.score);
    }
}

