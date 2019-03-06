import Phaser from 'phaser';
import Model from './mc/model';
import Controller from './mc/controller';
import Events from './events';
import MediaManager from './utils/media-manager';

class App {

    constructor() {
        this.emitter = null;
        this.game = null;
        this.model = null;
        this.controller = null;
        this.mediaManager = null;
        this._isMobile = navigator.userAgent.indexOf('Mobile') > -1 || navigator.userAgent.indexOf('Tablet') > -1;
    }

    init(config) {
        this.emitter = new Phaser.Events.EventEmitter();
        this.game = new Phaser.Game(config);
        this.controller = new Controller({ emitter: this.emitter });
        this.model = new Model({ emitter: this.emitter });
        this.emitter.on(Events.RESET_GAME, this.reset, this);
    }

    get isReady() {
        return this.game !== null;
    }

    get isMobile() {
        return this._isMobile;
    }

    reset() {
        this.emitter.removeAllListeners();
        this.controller.registerEvents();
        this.emitter.on(Events.RESET_GAME, this.reset, this);
    }

}

// Singleton
export default new App();
