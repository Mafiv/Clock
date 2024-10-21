import "./App.css";
import { useTime } from "./hooks";
export default function App() {
  const [times,handlePause,handleStart,handleReset]=useTime(100)
  return (
    <div className="container">
      <div className="main_div"><p>{times}</p></div>
      <div className="button_collection">
        <button onClick={handleStart}>start</button>
        <button onClick={handlePause}>pause</button>
        <button onClick={handleReset}>reset</button>
      </div>
    </div>
  );
}
