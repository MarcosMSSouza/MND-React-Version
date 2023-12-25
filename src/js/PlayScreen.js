import { state } from "./model";
import { DeckBtn, addDeckRegionImg } from "./decks";
import useSound from "use-sound";
import switchingGameSections from "../sounds/switchingGameSections.mp3";
import hoveringSystemBtns from "../sounds/hoveringSystemBtns.mp3";
import { useState, useEffect } from "react";
import introMusic from "../sounds/StickerbushSymphony.mp3";
import { volume } from "./decks";
export function PlayScreen({
  selected,
  setSelected,
  handleSetPSopen,
  pSopen,
  handleFieldOpen,
}) {
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [volume, setVolume] = useState(0.1);

  // const [play, { stop }] = useSound(introMusic, {
  //   volume,
  //   // loop: true,
  // });
  // if (!isPlaying) {
  //   play();
  // }
  // const togglePlay = () => {
  //   if (isPlaying) {
  //     stop();
  //   } else {
  //     play();
  //   }

  //   setIsPlaying(!isPlaying);
  // };

  // setIsPlaying(false);

  // const soundUrl = introMusic;
  // const [play] = useSound(soundUrl);
  function handleSelectDeck(id) {
    setSelected(state.playerDecks[id]);
  }

  return (
    <div
      className={`modal modal-collection ${pSopen && "hidden"}`}
      id="modal-PlayScreen"
    >
      <div className="borderGlow">
        <div className="modal-PlayScreen-content">
          <LeftScreenSection
            selected={selected}
            setSelected={setSelected}
            handleSelectDeck={handleSelectDeck}
          />
          <RightScreenSection
            selected={selected}
            handleSetPSopen={handleSetPSopen}
            handleFieldOpen={handleFieldOpen}
          />
        </div>
      </div>
    </div>
  );
}

function LeftScreenSection({ selected, handleSelectDeck }) {
  const PSdeck = true;
  return (
    <section className="modal-PlayScreen-LeftSection">
      <h1 className="PStextArea">. Select a deck .</h1>

      <div className="PlayScreen-DecksArea">
        {Object.values(state.playerDecks).map(
          (deck, i) =>
            deck.name && (
              <div className="PlayScreen-deckDock" key={i}>
                <DeckBtn
                  key={i}
                  deck={deck}
                  PSdeck={PSdeck}
                  i={i + 1}
                  selected={selected}
                  handleSelectDeck={handleSelectDeck}
                  class1={"PSdeckBtn"}
                />
              </div>
            )
        )}
        {Object.values(state.playerDecks).map(
          (deck, i) =>
            !deck.name && (
              <div className="PlayScreen-deckDock" key={`PSdock${i}`}></div>
            )
        )}
      </div>
    </section>
  );
}

function ShowMagiWhenSelectingDeck({ selected }) {
  let magis = selected?.magi;
  if (!magis) return;
  return magis.map((magi, i) => {
    return (
      <div className={` PSmagi-pile-${i} draggable=false `} key={`psmagi${i}`}>
        <img className={"PSmagi"} src={magi.url} alt={magi.Name} />
      </div>
    );
  });
}

function RightScreenSection({ selected, handleSetPSopen, handleFieldOpen }) {
  let deck = selected;
  let regionSelected = addDeckRegionImg(deck);

  const [play] = useSound(switchingGameSections, { volume });

  const [play2] = useSound(hoveringSystemBtns, { volume });

  return (
    <section className="modal-PlayScreen-RightSection">
      <div className="PlayScreen-RightSection-deckInformation">
        <h1 className="PStextArea DeckRegion">{regionSelected} selected</h1>
        <div className="PSmagisArea">
          <ShowMagiWhenSelectingDeck selected={selected} />
        </div>
        <h1 className="PStextArea totalCards">{deck?.crs.length} - Cards</h1>
      </div>
      <div className="PlayScreen-RightSection-buttonsArea">
        <button
          className="console_button "
          type="button"
          id="PlayScreen-btn-play"
          onMouseEnter={play2}
          onClick={() => {
            play();
            handleFieldOpen();
          }}
        >
          PLAY
        </button>
        <button
          className="console_button "
          type="button"
          id="PlayScreen-btn-collection"
          onClick={() => {
            play();
            handleSetPSopen();
          }}
          onMouseEnter={play2}
        >
          COLLECTION
        </button>
      </div>
    </section>
  );
}

export const ProgressBar = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const progressBarInterval = setInterval(() => {
      if (width < 100) {
        setWidth((prevWidth) => prevWidth + 0.2);
      }

      if (width >= 55) {
        clearInterval(progressBarInterval);
      }
    }, 5);

    document.addEventListener("click", () => {
      clearInterval(progressBarInterval);
      setWidth((a) => {});
    });

    return () => {
      document.removeEventListener("click", clearInterval(progressBarInterval));
      clearInterval(progressBarInterval);
    };
  }, [width]);

  return (
    width < 100 && (
      <div class="modal" id="modal-loadingScreen">
        <div class="modal-dialog">
          <div class="modal-loadingScreen-content">
            <div class="modal-loadingScreen-MNDLogo"></div>
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                data-label="Loading..."
                style={{ width: `${width}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
