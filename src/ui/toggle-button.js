import Phaser from 'phaser';
import { requireProperties } from '../utils/validation-utils';
import { scaleToGameWidth } from '../utils/align-utils';

export default class ToggleButton extends Phaser.GameObjects.Container {

    constructor(config) {
        super(config.scene);
        requireProperties(config, ['scene', 'app', 'key', 'onIconKey', 'offIconKey']);
        
        if (config.x) this.x = config.x;
        if (config.y) this.y = config.y;

        this.app   = config.app;
        this.scene = config.scene;
        this.event = config.event || null;
        this.value = config.value || false;

        this.back    = this.scene.add.image(0, 0, config.key);
        this.onIcon  = this.scene.add.image(0, 0, config.onIconKey);
        this.offIcon = this.scene.add.image(0, 0, config.offIconKey);

        scaleToGameWidth(this.app, this.back, .1);
        scaleToGameWidth(this.app, this.onIcon, .05);
        scaleToGameWidth(this.app, this.offIcon, .05);

        this.back.setInteractive();
        this.back.on('pointerdown', this.toggle, this);

        this.add(this.back);
        this.add(this.onIcon);
        this.add(this.offIcon);

        this.updateIcons();
        this.setSize(this.back.displayWidth, this.back.displayHeight);

        this.scene.add.existing(this);
    }

    toggle() {
        this.value = !this.value;
        this.updateIcons();

        if (this.event !== null) {
            this.app.emitter.emit(this.event, this.value);
        }
    }

    updateIcons() {
        this.onIcon.visible  = this.value;
        this.offIcon.visible = !this.value;
    }

}
