import Phaser from 'phaser';

import SoundButtons from '../ui/sound-buttons';
import Assets from '../assets';

import app from '../app';
import { scaleToGameWidth } from '../utils/align-utils';
import ScoreBox from '../ui/score-box';
import AlignGrid from '../utils/align-grid';
import GameOverScene from './game-over.scene';
import Events from '../events';
import MediaManager from '../utils/media-manager';

export const SCENE_NAME = 'MainScene';

export default class MainScene extends Phaser.Scene {
    
    static get SCENE_NAME() { return SCENE_NAME; }
    
    constructor() {
        super(SCENE_NAME);
    }
    
    preload() {
      
    }
    
    create() {
        this.mediaManager = new MediaManager({
            scene: this, app
        });
        this.soundBtns = new SoundButtons({
            scene: this, app
        });

        this.velocity = 100;
        this.centerX = app.game.config.width / 2;
        this.centerY = app.game.config.height / 2;
        this.quarter = app.game.config.height / 4;
        this.pMove = app.game.config.height / 32;

        this.bar = this.add.image(this.centerX, this.centerY, Assets.BAR);
        this.bar.displayWidth = app.game.config.width / 3;
        this.bar.displayHeight = app.game.config.height;

        this.ball = this.physics.add.sprite(this.centerX, this.centerY, Assets.BALLS);
        scaleToGameWidth(app, this.ball, 0.05);

        this.paddle1 = this.physics.add.sprite(this.centerX, this.quarter, Assets.PADDLES);
        scaleToGameWidth(app, this.paddle1, 0.25);

        this.paddle2 = this.physics.add.sprite(this.centerX, this.quarter * 3, Assets.PADDLES);
        scaleToGameWidth(app, this.paddle2, 0.25);

        this.pScale = this.paddle1.scaleX;

        this.scoreBox = new ScoreBox({
            scene: this, 
            emitter: app.emitter
        });

        this.alignGrid = new AlignGrid({ 
            scene: this, 
            rows: 11,
            cols: 11,
            app
        });
      //  this.alignGrid.show();
        this.alignGrid.placeAtIndex(5, this.scoreBox);

        this.setBallColor();
        this.ball.setVelocity(0, this.velocity);
        this.paddle1.setImmovable();
        this.paddle2.setImmovable();

        this.physics.add.collider(this.ball, this.paddle1, this.ballHit, null, this);
        this.physics.add.collider(this.ball, this.paddle2, this.ballHit, null, this);

        this.input.on('pointerdown', this.changePaddle, this);
        this.input.on('pointerup', this.onUp, this);
    }

    onUp(pointer) {
        const diffY = Math.abs(pointer.y - this.downY);
        if (diffY > 200) {
            this.tweens.add({
                targets: this.paddle1,
                duration: 1000,
                y: this.quarter
            });
            this.tweens.add({
                targets: this.paddle2,
                duration: 1000,
                y: this.quarter * 3
            });
        }
    }

    ballHit(ball, paddle) {
        this.velocity = -this.velocity;

        const absVelocity = Math.abs(this.velocity);
        if (absVelocity < 200) {
            this.velocity *= 1.05;
        } else if (absVelocity < 300) {
            this.velocity *= 1.01;
        }
        
        app.emitter.emit(Events.PLAY_SOUND, Assets.HIT);

        if (ball.frame.name === paddle.frame.name) {
            const distY = Math.abs(this.paddle1.y - this.paddle2.y);
            
            let points = 1;
            if (distY < app.game.config.height / 4) {
                points += 2;
            } else if(distY < app.game.config.height / 3) {
                points += 1;
            }

            app.emitter.emit(Events.INCREASE_SCORE, points);

            this.setBallColor();
            this.ball.setVelocity(0, this.velocity);
    
            if (distY > app.game.config.height / 5) {
                const targetY = paddle.y > this.centerY ? paddle.y - this.pMove : paddle.y + this.pMove;
                this.tweens.add({
                    targets: paddle,
                    duration: 1000,
                    y: targetY
                });
            }
        } else {
            app.emitter.emit(Events.PLAY_SOUND, Assets.LOSE);
            this.time.addEvent({
                delay: 1000,
                callback: this.gameOver,
                callbackScope: this,
                loop: false
            });
        }        
    }

    gameOver() {
        console.log(SCENE_NAME, 'game over');
        this.scene.start(GameOverScene.SCENE_NAME);
    }

    setBallColor() {
        const r = Math.floor(Math.random() * 100);
        this.ball.setFrame(r < 50 ? 0 : 1);
    }

    changePaddle(pointer) {
        this.downY = pointer.y;
        const paddle = this.velocity > 0 ? this.paddle2 : this.paddle1;
        this.tweens.add({
            targets: paddle,
            duration: 100,
            scaleX: 0,
            onComplete: this.onCompleteHandler.bind(this),
            onCompleteParams: [{ paddle, originalScale: this.pScale }]
        });
        app.emitter.emit(Events.PLAY_SOUND, Assets.FLIP);
    }

    onCompleteHandler(tween, targets, params) {
        const paddle = params.paddle;
        const color = paddle.frame.name == 1 ? 0 : 1;
        paddle.setFrame(color);
        this.tweens.add({
            targets: paddle,
            duration: 100,
            scaleX: params.originalScale
        });
    }

    update() {
        
    }
    
}

