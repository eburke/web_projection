function drawText(textData) {
  if (!textData.text) {
    return;
  }

  const canvas = document.getElementById('projectionCanvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.fillStyle = textData.backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = textData.textColor;
  ctx.font = `${textData.fontSize}px ${textData.fontName}`;

  const textWidth = ctx.measureText(textData.text).width;
  const textHeight = textData.fontSize * 1.2; // Rough estimate for text height

  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((textData.angle % 360) * Math.PI / 180);
  if (textData.mirror) {
    ctx.scale(-1, 1);
  }
  ctx.translate(-canvas.width / 2, -canvas.height / 2);

  const overdraw = Math.ceil(Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height));

  if (textData.solo) {
    const x = (canvas.width - textWidth) / 2;
    const y = (canvas.height + textHeight / 2) / 2;
    ctx.fillText(textData.text, x, y);
  } else {
    for (let y = -overdraw; y < canvas.height + overdraw; y += textHeight) {
      for (let x = -overdraw; x < canvas.width + overdraw; x += textWidth) {
        ctx.fillText(textData.text, x, y);
      }
    }
  }

  ctx.restore();
}

