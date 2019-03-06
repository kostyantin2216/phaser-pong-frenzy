import Phaser from 'phaser';
import { requireProperties } from '../utils/validation-utils';
import ToggleButton from './toggle-button';
import Events from '../events';
import Assets from '../assets';

export default class SoundButtons extends Phaser.GameObjects.Container {

    constructor(config) {
        super(config.scene);
        requireProperties(config, ['scene', 'app']);

        this.app   = config.app;
        this.scene = config.scene;

        this.toggleMusic = new ToggleButton({
            scene: this.scene,
            key: Assets.BG_TOGGLE,
            onIconKey: Assets.MUSIC_ON,
            offIconKey: Assets.MUSIC_OFF,
            event: Events.TOGGLE_MUSIC,
            value: this.app.model.musicOn,
            app: this.app
        });

        this.toggleSound = new ToggleButton({
            scene: this.scene,
            key: Assets.BG_TOGGLE,
            onIconKey: Assets.SFX_ON,
            offIconKey: Assets.SFX_OFF,
            event: Events.TOGGLE_SOUND,
            value: this.app.model.soundOn,
            app: this.app
        });

        this.toggleMusic.x = this.toggleMusic.width / 2;
        this.toggleMusic.y = this.toggleMusic.height / 2;

        this.toggleSound.x = this.app.game.config.width - this.toggleSound.width / 2;
        this.toggleSound.y = this.toggleMusic.y;

        this.add(this.toggleSound);
        this.add(this.toggleMusic);

        this.toggleMusic.visible = false;
        this.scene.add.existing(this);
    }

}
