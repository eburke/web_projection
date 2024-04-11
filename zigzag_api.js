function drawZigzags(zigzagData) {

  const { strokeWidth, gap, amplitude, frequency, foregroundColor, backgroundColor } = zigzagData;

  const canvas = document.getElementById("projectionCanvas");
  const ctx = canvas.getContext("2d");

  // Clear the canvas
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Set the stroke style and line width
  ctx.strokeStyle = foregroundColor;
  ctx.lineWidth = strokeWidth;

  // map the frequency from its original 1..100 range to 1..75
  const scaledFrequency = 1 + (74 * (frequency-1)) / 99;

  // Calculate line spacing and cycle size for zigzag
  const lineSpacing = strokeWidth + gap;
  const fullCycleWidth = canvas.width / scaledFrequency;
  const halfCycleWidth = fullCycleWidth / 2;


  // Draw the zigzag lines.  y is the center, so the zigs are above and zags are below.
  for (let y = -amplitude; y < canvas.height+amplitude; y += lineSpacing) {
    ctx.beginPath();

    // start at the positive peak
    ctx.moveTo(0, y+amplitude); // Starting point of the line

    for (let x = 0; x < canvas.width; x += fullCycleWidth) {
      // move over half of the cycle
      const nextX = x + halfCycleWidth;
      const nextY = y - amplitude;
      
      ctx.lineTo(nextX, nextY); // Draw line to the peak of the "zig" or "zag"
      ctx.lineTo(nextX + halfCycleWidth, y + amplitude); // Draw line back down to the original Y level
    }

    ctx.stroke(); // Actually draw the zigzag line
  }

  // Reset the canvas transformation
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

