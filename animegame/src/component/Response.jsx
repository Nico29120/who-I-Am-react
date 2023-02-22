import { compareTwoStrings } from "string-similarity";
import { useState } from "react";

export default function Response({
  charac,
  clue,
  state,
  setCharac,
  activeClue,
  startTimer,
}) {
  
  const { name } = charac;

  let timeOut;
  let score;
  const [totalScore, setTotalScore] = useState(0);

  const setTimeOut = () => {
    timeOut = Date.now() - startTimer;
    timeOut = parseInt(timeOut / 1000);
  };
  const setScore = () => {
    score = 100 - timeOut;
    return score;
  };

  const handleResponse = (e) => {
    e.preventDefault();

    const response = document.getElementById("reponseInput");

    if (
      compareTwoStrings(response.value.toLowerCase(), name.toLowerCase()) > 0.75
    ) {
      
      setCharac();
      setTimeOut();

      let total = setScore();
        if(clue.isActive===true){
      total = total-25}
      setTotalScore(totalScore + total);
      startTimer = Date.now();
      response.value = "";
    } else if (response.value.toLowerCase() === "skip") {
      setCharac();
      
      response.value = "";
      startTimer = Date.now();
      setTotalScore(totalScore - 50);
      if (totalScore < 50) {
        setTotalScore(0);
      }
    } else {
      response.value = "";
    }
  };
console.log("clue =", clue)
// console.log("clue =", isActive)
  return (
    <div>
      <form onSubmit={handleResponse}>
        <input id="reponseInput" type="text" name="response" />
        <input id="input-submit" type="submit" value="Ok" />
      </form>
      <div>
        <p>Skip -50 points</p>
        <button onClick={activeClue} id="clue-btn">
          Clue
        </button>
        {(clue.isActive) ? <p>Anime/Manga = {clue.title}</p> : <></>}
      </div>

      <h2>Score = {totalScore}</h2>
    </div>
  );
}


// socket io pour du tps réel à plrs