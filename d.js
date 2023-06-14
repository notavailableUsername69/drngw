document.addEventListener("DOMContentLoaded"), () => {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  const brushSizeInput = document.getElementById("brush-size");
  const eraserSizeInput = document.getElementById("eraser-size");
  const undoButton = document.getElementById("undo-button");
  const redoButton = document.getElementById("redo-button");

  let isDrawing = false;
  let brushSize = brushSizeInput.value;
  let eraserSize = eraserSizeInput.value;
  let undoStack = [];
  let redoStack = [];}

  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseout", stopDrawing);

  brushSizeInput.addEventListener("input", updateBrushSize);
  eraserSizeInput.addEventListener("input", updateEraserSize);
  undoButton.addEventListener("click", undo);
  redoButton.addEventListener("click", redo);

  function startDrawing(e) {
    isDrawing = true;
    draw(e);
  }

  function draw(e) {
    if (!isDrawing) return;

    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;

    context.lineWidth = getCurrentSize();
    context.lineCap = "round";
    context.strokeStyle = "black";

    context.lineTo(x, y);
    context.stroke();
    context.beginPath();
    context.moveTo(x, y);
  }

  function stopDrawing() {
    isDrawing = false;
    context.beginPath();
    saveState();
  }

  function updateBrushSize() {
    brushSize = brushSizeInput.value;
  }

  function updateEraserSize() {
    eraserSize = eraserSizeInput.value;
  }

  function getCurrentSize() {
    return isDrawing ? brushSize : eraserSize;
  }

  function saveState() {
    undoStack.push(canvas.toDataURL());
    redoStack = [];
    updateUndoRedoButtons();
  }

  function undo() {
    if (undoStack.length <= 1) return;

    redoStack.push(undoStack.pop());
    const state = new Image();
    state.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(state, 0, 0);
updateUndoRedoButtons();
};
state.src = undoStack[undoStack.length - 1];
}

function redo() {
if (redoStack.length === 0) return;

undoStack.push(redoStack.pop());
const state = new Image();
state.onload = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(state, 0, 0);
  updateUndoRedoButtons();
};
state.src = undoStack[undoStack.length - 1];



}
