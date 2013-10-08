function floodFill(bitmap, replacementColor, tolerance, x, y) {
    
    var RGBA = 4;
    
    x = x || 0;
    y = y || 0;

    var start = getPixelArrayIndex(x, y);

    var queue = [];

    /**
     * http://en.wikipedia.org/wiki/Flood_fill
     */
    (function (node, targetColor, replColor, toler) {
        queue.push(node);

        while (queue.length) {
            node = queue.pop();

            if (colorEquals(node, targetColor, toler)) {
                setColor(node, replColor);

                queue.push(
                    getNode('west' , node),
                    getNode('east' , node),
                    getNode('north', node),
                    getNode('south', node)
                );
            }
        }
    }(
        start || 0,
        Array.prototype.slice.call(bitmap.data, start, start + RGBA),
        replacementColor || [ 0, 0, 0, 0],
        tolerance || 10
    ));

    function colorEquals(node, color, tolerance) {
        if (node < 0 || node + RGBA - 1 > bitmap.data.length) {
            return false;
        }

        var diff = 0;
        for (var i = 0; i < RGBA; i += 1) {
            diff += Math.abs(bitmap.data[node + i] - color[i]);
        }
        return diff <= tolerance;
    }

    function setColor(node, color) {
        for (var i = 0; i < RGBA; i += 1) {
            bitmap.data[node + i] = color[i];
        }
    }

    function getNode(direction, node) {
        var n = 0;
        switch (direction) {
            case 'west':
                n = 1;
                break;
            case 'east':
                n = -1;
                break;
            case 'north':
                n = -bitmap.width;
                break;
            case 'south':
                n = bitmap.width;
                break;
        }

        return node + n * RGBA;
    };

    function getPixelArrayIndex(x, y) {
        return (y * bitmap.width + x) * RGBA;
    }
}
