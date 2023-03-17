function drawLines(linesData) {
  const { strokeWidth, gap, angle, foregroundColor, backgroundColor } = linesData;

  const canvas = document.getElementById("projectionCanvas");
  const ctx = canvas.getContext("2d");

  // Clear the canvas
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Calculate the center of the canvas
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  // Rotate the canvas about its center
  ctx.translate(centerX, centerY);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.translate(-centerX, -centerY);

  // Set the stroke style and line width
  ctx.strokeStyle = foregroundColor;
  ctx.lineWidth = strokeWidth;

  // Draw the horizontal lines
  const lineSpacing = strokeWidth + gap;
  for (let y = -centerY; y < centerY + canvas.height; y += lineSpacing) {
    ctx.beginPath();
    ctx.moveTo(-centerX, y);
    ctx.lineTo(centerX + canvas.width, y);
    ctx.stroke();
  }

  // Reset the canvas transformation
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

