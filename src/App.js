import { useState } from "react";
import { useCanvas } from "./useCanvas";
import "./App.css";

function App() {
  const [coordinates, setCoordinates, canvasRef, canvasWidth, canvasHeight] = useCanvas();
  const [timer, setTimer] = useState(null);

  const handleCanvasClick = (event) => {
    let y = event.clientY;
    clearInterval(timer);
    setTimer(
      setInterval(() => {
        setCoordinates({ x: event.clientX, y });
        y += 2;
      }, 100)
    );
  };

  const handleStopCanvas = (event) => {
    clearInterval(timer);
  };

  const handleClearCanvas = (event) => {
    clearInterval(timer);
    setCoordinates({});
  };

  return (
    <div className="App">
      <h3>Click to Start Painting!</h3>
      <div className="canvas">
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          onClick={handleCanvasClick}
          style={{ outline: Object.keys(coordinates).length === 0 ? "1px solid pink" : "" }}
        />
      </div>
      <div className="btns">
        <button className="btn" onClick={handleStopCanvas}>
          Capture the Moment
        </button>
        <button className="btn" onClick={handleClearCanvas}>
          Clear
        </button>
      </div>
    </div>
  );
}

export default App;
