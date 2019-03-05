import Phaser from 'phaser';

import TitleScene from './title.scene';
import ProgressBar from '../ui/progress-bar';
import Assets from '../assets';

import app from '../app';

export const SCENE_NAME = 'LoaderScene';


export default class LoaderScene extends Phaser.Scene {

    static get SCENE_NAME() { return SCENE_NAME; }

    constructor() {
        super(SCENE_NAME);
    }

    preload() {
        this.bar = new ProgressBar({
            scene: this,
            x: app.game.config.width / 2,
            y: app.game.config.height / 2,
            app
        });
        this.progressText = this.add.text(app.game.config.width / 2, app.game.config.height / 2, '0%', { 
            color: '#ffffff', 
            fontSize: app.game.config.width / 20 
        });
        this.progressText.setOrigin(0.5, 0.5);
        this.load.on('progress', this.onProgress, this);
        this.load.image(Assets.BG_TOGGLE, 'assets/images/toggles/blue.png');
        this.load.image(Assets.SFX_ON, 'assets/images/sfx_on.png');
        this.load.image(Assets.SFX_OFF, 'assets/images/sfx_off.png');
        this.load.image(Assets.MUSIC_ON, 'assets/images/music_on.png');
        this.load.image(Assets.MUSIC_OFF, 'assets/images/music_off.png');
        this.load.image(Assets.BTN_START_GAME, 'assets/images/buttons/round/blue.png');
        this.load.image(Assets.BTN_PLAY_AGAIN, 'assets/images/buttons/round/blue.png');
        this.load.image(Assets.BAR, 'assets/images/bar.jpg');
        this.load.image(Assets.GAME_OVER, 'assets/images/game-over.png');
        this.load.spritesheet(Assets.BALLS, 'assets/images/balls.png', { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet(Assets.PADDLES, 'assets/images/paddles.png', { frameWidth: 400, frameHeight: 50 });
    }

    create() {
        this.scene.start(TitleScene.SCENE_NAME);
    }

    update() {

    }

    onProgress(value) {
        this.bar.setPercent(value);
        this.progressText.setText(Math.floor(value * 100) + '%');
    }

}
