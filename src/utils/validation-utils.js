
export function requireProperties(obj, props) {
    for (const prop of props) {
        if (!obj[prop]) throw new Error('Missing required prop ' + prop + ', in provided object');
    }
}
