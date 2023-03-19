var imageFile = null;
var imageObject = null;

// The web page calls this function
function drawImages(imagesData) {
    if (!areFilesEqual(imagesData.imageFile, imageFile)) {
        imageFile = imagesData.imageFile;
        if (imageFile) {
            const reader = new FileReader();

            reader.onload = function (event) {
                imageObject = new Image();
                imageObject.src = event.target.result;

                imageObject.onload = function () {
                    drawImagesData(imagesData);
                };
            };

            reader.readAsDataURL(imageFile);
        } else {
            drawImagesData(imagesData);
        }
    } else {
        drawImagesData(imagesData);
    }
}

function areFilesEqual(file1, file2) {
    if (file1 === null && file2 === null) {
        return true;
    }

    if (file1 === null || file2 === null) {
        return false;
    }

    return file1.name === file2.name &&
        file1.size === file2.size &&
        file1.type === file2.type &&
        file1.lastModified === file2.lastModified;
}

function drawImagesData(imagesData) {
    const canvas = document.getElementById("projectionCanvas");
    const ctx = canvas.getContext("2d");

    if (imagesData && imagesData.imageFile && imageObject) {

        const size = imagesData.size;
        const angle = imagesData.angle;
        const mirror = imagesData.mirror;
        const solo = imagesData.solo;

        const scale = (canvas.width * (size / 100)) / imageObject.width;
        const maxLen = Math.sqrt(Math.pow(imageObject.width / scale, 2) + Math.pow(imageObject.height / scale, 2));

        const scaledImgWidth = imageObject.width * scale;
        const scaledImgHeight = imageObject.height * scale;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        ctx.fillStyle = imagesData.backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle * Math.PI / 180);
        ctx.scale(scale, scale);
        ctx.translate(-centerX, -centerY);

        if (mirror) {
            ctx.scale(-1, 1);
            ctx.translate(-canvas.width, 0);
        }

        if (solo) {
            ctx.translate(-imageObject.width / 2, -imageObject.height / 2);
            ctx.drawImage(imageObject, centerX, centerY);
        } else {
            const pattern = ctx.createPattern(imageObject, "repeat");
            ctx.fillStyle = pattern;

            dx = (canvas.width - imageObject.width) / 2;
            dy = (canvas.height - imageObject.height) / 2;

            // This translation ensures the tiled pattern is always centered in the screen
            ctx.translate(dx, dy);

            const overdraw = maxLen / 2;
            ctx.fillRect(-overdraw, -overdraw,
                canvas.width + (Math.abs(dx) * 2) + (overdraw * 2), canvas.height + (Math.abs(dy) * 2) + (overdraw * 2));

        }
        ctx.restore();
    } else {
        // prompt the user to load an image file
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.fillText("Choose an image file to display.", canvas.width / 2, canvas.height / 2);
    }
}
