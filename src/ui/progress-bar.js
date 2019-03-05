import Phaser from 'phaser';
import { requireProperties } from '../utils/validation-utils';

export default class ProgressBar extends Phaser.GameObjects.Container {
    
    constructor(config) {
        super(config.scene);
        requireProperties(config, ['scene', 'app']);

        if (!config.color)  config.color  = 0xff0000;
        if (!config.width)  config.width  = 200;
        if (!config.height) config.height = config.width / 4;

        this.app   = config.app;
        this.scene = config.scene;

        if (config.x) this.x = config.x;
        if (config.y) this.y = config.y;

        this.graphics = this.scene.add.graphics();
        this.graphics.fillStyle(config.color, 1);
        this.graphics.fillRect(0, 0, config.width, config.height);
        this.graphics.x = -config.width / 2;
        this.graphics.y = -config.height / 2;

        this.add(this.graphics);
        this.scene.add.existing(this);
    }
    
    setPercent(per) {
        this.graphics.scaleX = per;
    }

}
