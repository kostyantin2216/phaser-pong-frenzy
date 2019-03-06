import Phaser from 'phaser';
import AlignGrid from '../utils/align-grid';
import app from '../app';
import { scaleToGameWidth } from '../utils/align-utils';
import PlainButton from '../ui/plain-button';
import MainScene from '../scenes/main.scene';
import Events from '../events';
import Assets from '../assets';

export const SCENE_NAME = 'TitleScene';

export default class TitleScene extends Phaser.Scene {

    static get SCENE_NAME() { return SCENE_NAME };

    constructor() {
        super(SCENE_NAME);
    }

    preload() {
    }

    create() {
        this.alignGrid = new AlignGrid({
            rows: 11,
            cols: 11,
            scene: this,
            app
        });

    /*     const background = this.add.image(app.game.config.width / 2, app.game.config.height / 2, RK.TITLE_BG); */
    

        this.centerX = app.game.config.width / 2;
        this.centerY = app.game.config.height / 2;

        this.ball = this.physics.add.sprite(this.centerX, this.centerY, Assets.BALLS);
        this.ball.body.setBounce(0, 1);
        this.ball.body.setVelocity((Math.random() * 200) - 100, (Math.random() * 200) - 100);
        this.ball.body.setCollideWorldBounds();
        this.ball.body.onWorldBounds = true;
        scaleToGameWidth(app, this.ball, 0.05);

        const title = this.add.image(0, 0, Assets.TITLE);
        scaleToGameWidth(app, title, .8);
        this.alignGrid.placeAtIndex(38, title)

        const btnStart = new PlainButton({
            scene: this,
            key: Assets.BTN_START_GAME,
            text: 'Start',
            event: Events.START_GAME,
            app
        });
        this.alignGrid.placeAtIndex(82, btnStart);

        this.physics.world.setBoundsCollision();
        this.physics.world.on('worldbounds', this.onWorldBoundsCollision, this);

        app.emitter.once(Events.START_GAME, this.startGame, this);
    }

    onWorldBoundsCollision(body, topCollision, bottomCollision, leftCollision, rightCollision) {
        this.ball.body.setVelocity((Math.random() * 200) - 100, (Math.random() * 200) - 100);
    }

    startGame() {
        console.log(SCENE_NAME, 'start game');
        this.scene.start(MainScene.SCENE_NAME);
    }

    update() {

    }
}
