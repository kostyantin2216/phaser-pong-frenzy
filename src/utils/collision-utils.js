
export function hasCollision(obj1, obj2) {
    const distX = Math.abs(obj1.x - obj2.x);
    const distY = Math.abs(obj1.y - obj2.y);

    return (distX < obj1.width / 2) && (distY < obj1.height / 2);
}
