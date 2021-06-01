import { useCanvas } from "./useCanvas";
import "./App.css";

function App() {
  const [coordinates, setCoordinates, canvasRef, canvasWidth, canvasHeight] = useCanvas();

  const handleCanvasClick = (event) => {
    setCoordinates({ x: event.clientX, y: event.clientY });
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
