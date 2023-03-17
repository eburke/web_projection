// shapes_api.js

function drawShapes(shapesData) {
    const canvas = document.getElementById("projectionCanvas");
    const ctx = canvas.getContext("2d");

    console.log("drawShapes(shapesData)");
    console.log(JSON.stringify(shapesData, null, 2));
  
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
  