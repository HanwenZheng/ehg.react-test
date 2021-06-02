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

  const handleClearCanvas = (event) => {
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

      <button className="btn" onClick={handleClearCanvas}>
        CLEAR
      </button>
    </div>
  );
}

export default App;
