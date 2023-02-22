import { useReducer } from "react";
import AnimeService from "../service/anime-services";
import Response from "./Response";

export default function RandomCharacter() {
  const createCharac = (id, name, url) => ({
    id,
    name,
    url,
  });
  const createClue = (title) => ({
    title,
    isActive: false,
  });
  const initialState = { charac: [], clue: {title : "", isActive : false} };

  function reducer(state, action) {
    let clue;
    
    switch (action.type) {
      case "setCharacter":
        const charac = [action.charac];
        return {
          ...state,
          charac: charac,
        };
      case "setClue":
        clue = action.clue;
        return {
          ...state,
          clue: clue,
        };
      case "activeClue":
        clue = state.clue;
        clue.isActive=true;
        console.log({
          ...state,
          clue,
        })
        return {
          ...state,
          clue,
        };
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  const setCharac = async () => {
    const character = await AnimeService.getRandomCharacter();
    const charac = createCharac(
      character.mal_id,
      character.name,
      character.images.jpg.image_url
    );

    dispatch({ type: "setCharacter", charac });
    console.log(charac);

    const work = await AnimeService.getWork(character.mal_id);
    const clue = createClue(work);
    

    dispatch({ type: "setClue", clue });
    
  };

  const activeClue = () => {
    dispatch({ type: "activeClue" });
  };

  const startTimer = Date.now();

  return (
    <>
      <h1>Who am I ?</h1>
      <div>
        <button
          id="new-character"
          onClick={() => {
            setCharac();
          }}
        >
          New Character
        </button>
        <div className="character-image">
          {state.charac.map((character, i) => {
            return <img key={i} src={character.url} />;
          })}
        </div>
        <div className="clue">
        </div>
        {state.clue.title ? (
          <Response
            charac={state.charac[0]}
            setCharac={setCharac}
            clue={state.clue}
            state={state}
            activeClue={activeClue}
            startTimer={startTimer}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
