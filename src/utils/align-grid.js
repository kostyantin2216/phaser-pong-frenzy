import { requireProperties } from "./validation-utils";

export default class AlignGrid {

    constructor(config) {
        requireProperties(config, ['scene', 'app']);

        if (!config.rows)   config.rows   = 5;
        if (!config.cols)   config.cols   = 5;
        if (!config.height) config.height = config.app.game.config.height;
        if (!config.width)  config.width  = config.app.game.config.width;
        
        this.config = config;
        this.scene  = config.scene;
        this.app    = config.app;

        this.cellWidth  = config.width / config.cols;
        this.cellHeight = config.height / config.rows;
    }

    show() { 
       this.showLines();
       this.showNumbers();
    }

    showLines() {
        this.graphics = this.scene.add.graphics();
        this.graphics.lineStyle(2, 0xff0000);

        for (let i = 0; i < this.config.width; i += this.cellWidth) {
            this.graphics.moveTo(i, 0);
            this.graphics.lineTo(i, this.config.height);
        }

        for (let i = 0; i < this.config.height; i+= this.cellHeight) {
            this.graphics.moveTo(0, i);
            this.graphics.lineTo(this.config.width, i);
        }

        this.graphics.strokePath();
    }

    showNumbers() {
        const count = this.config.cols * this.config.rows;
        for (let i = 0; i < count; i++) {
            const numText = this.scene.add.text(0, 0, i, { color: '#ff0000' });
            numText.setOrigin(0.5, 0.5);
            
            this.placeAtIndex(i, numText);
        }
    }

    placeAt(xx, yy, obj) {
        const x2 = (this.cellWidth * xx) + (this.cellWidth / 2);
        const y2 = (this.cellHeight * yy) + (this.cellHeight / 2);

        obj.x = x2;
        obj.y = y2;
    }

    placeAtIndex(index, obj) {
        const yy = Math.floor(index / this.config.cols);
        const xx = index - (yy * this.config.cols);

        this.placeAt(xx, yy, obj);
    }

}
