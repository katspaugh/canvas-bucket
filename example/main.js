window.addEventListener('load', function () {
    var img = document.querySelector('img');
    var canvas = document.querySelector('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    var cc = canvas.getContext('2d');
    cc.drawImage(img, 0, 0);

    var bitmap = cc.getImageData(0, 0, canvas.width, canvas.height);
    cc.clearRect(0, 0, canvas.width, canvas.height);
    floodFill(bitmap, [ 0, 255, 255, 128 ], 100, 0, 0);
    cc.putImageData(bitmap, 0, 0);

    var filledImage = document.createElement('img');
    filledImage.src = canvas.toDataURL();
    canvas.parentNode.insertBefore(filledImage, canvas);
    canvas.parentNode.removeChild(canvas);
}, false);
