
export function scaleToGameWidth(app, obj, per) {
    obj.displayWidth = app.game.config.width * per;
    obj.scaleY = obj.scaleX;
}

export function alignCenter(app, obj) {
    centerHorizontal(app, obj);
    centerVertical(app, obj);
}

export function alignCenterHorizontal(app, obj) {
    obj.x = app.game.width / 2;
}

export function alignCenterVertical(app, obj) {
    obj.y = app.game.height / 2;
}
