// shapes_api.js

// Use Immediately Invoked Function Expression (IIFE) to avoid polluting
// the global namespace with all of the helper functions.
(function () {
  function drawShapes(shapesData) {
    const canvas = document.getElementById("projectionCanvas");
    const ctx = canvas.getContext("2d");

    // Fill the canvas with the backgroundColor
    ctx.fillStyle = shapesData.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set the foregroundColor for the shapes
    ctx.fillStyle = shapesData.foregroundColor;

    // Calculate the number of rows and columns to fill the canvas
    const columns = Math.ceil(canvas.width / (shapesData.width + shapesData.hGap));
    const rows = Math.ceil(canvas.height / (shapesData.height + shapesData.vGap));

    // Draw the shapes on the canvas
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        let x = j * (shapesData.width + shapesData.hGap);
        let y = i * (shapesData.height + shapesData.vGap);

        switch (shapesData.shape) {
          case "Rectangles":
            ctx.fillRect(x, y, shapesData.width, shapesData.height);
            break;
          case "Ovals":
            drawOval(ctx, x, y, shapesData.width, shapesData.height);
            break;
          case "Triangles":
            drawTriangle(ctx, x, y, shapesData.width, shapesData.height);
            break;
          case "Stars":
            drawStar(ctx, x, y, shapesData.width, shapesData.height);
            break;
        }
      }
    }
  }

  function drawOval(ctx, x, y, width, height) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(x + width / 2, y + height / 2);
    ctx.scale(width / 2, height / 2);
    ctx.arc(0, 0, 1, 0, 2 * Math.PI, false);
    ctx.restore();
    ctx.fill();
  }

  function drawTriangle(ctx, x, y, width, height) {
    ctx.beginPath();
    ctx.moveTo(x, y + height);
    ctx.lineTo(x + width / 2, y);
    ctx.lineTo(x + width, y + height);
    ctx.closePath();
    ctx.fill();
  }

  function drawStar(ctx, x, y, width, height, numPoints = 5) {
    const points = calculateStarPoints(x, y, width, height, numPoints);
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.closePath();
    ctx.fill();
  }

  function calculateStarPoints(x, y, width, height, numPoints) {
    const points = [];
    const centerX = x + width / 2;
    const centerY = y + height / 2;
    const outerRadius = Math.min(width, height) / 2;
    const innerRadius = outerRadius / 2;
    const angle = Math.PI / numPoints;

    for (let i = 0; i < 2 * numPoints; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const currentAngle = i * angle - Math.PI / 2;
      points.push({
        x: centerX + radius * Math.cos(currentAngle),
        y: centerY + radius * Math.sin(currentAngle)
      });
    }

    return points;
  }

  // Export functions to window scope so the projector.html file can access them
  window.drawShapes = drawShapes;
})();