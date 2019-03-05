import 'phaser';

import fontLoader from './utils/font-loader';
import MainScene from './scenes/main.scene';

import app from './app';
import LoaderScene from './scenes/loader.scene';
import TitleScene from './scenes/title.scene';
import GameOverScene from './scenes/game-over.scene';

fontLoader({
    fontFamilies: ["Fresca","Flamenco","Indie Flower",'Anton']
});

window.onload = function() {
    let height, width;
    if (app.isMobile) {
        width = window.innerWidth;
        height = window.innerHeight;
    } else {
        width = 480;
        height = 640;
    }

    const config = {
        type: Phaser.AUTO,
        width: width,
        height: height,
        backgroundColor: '#0DB34B',
        parent: 'phaser-game',
        physics: {
            default: 'arcade',
            arcade: {
                debug: true
            }
        },
        scene: [
            LoaderScene,
            TitleScene,
            MainScene,
            GameOverScene
        ]
    };

    app.init(config);
}
