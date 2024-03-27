import {useState} from "react";
import {Game} from "./Game";
import {Leaderboard} from "./Leaderboard";
import {SettingsPage} from "./settings";
import {EndGame} from "./endGame";

function App() {
  const [gameStart, setGameStart] = useState(false);
  const [settings, setSettings] = useState({
    playerName: 'Temp',
    boardSize: 30,
    snakeColor: '#31d031',
    foodColor: '#904141',
    gameSpeed: 100,
  });
  const [gameEnd, setGameEnd] = useState(false);

  const [leaders, setLeaders] = useState([]);
  const [score, setScore] = useState(0);


  return (
      <div>
          {!gameStart && gameEnd === false &&  <SettingsPage setGameEnd={setGameEnd} setGameStart={setGameStart} settings={settings} setSettings={setSettings} />}
          {gameStart && gameEnd === false && <Game setScore={setScore} score={score} setGameStart={setGameStart} setGameEnd={setGameEnd} settings={settings} setLeaders={setLeaders} leaders={leaders} />}
          {!gameStart && gameEnd === true && <EndGame setScore={setScore} score={score} setGameStart={setGameStart} setGameEnd={setGameEnd} settings={settings} setLeaders={setLeaders} leaders={leaders} />}
      </div>
  );

}

export default App;
