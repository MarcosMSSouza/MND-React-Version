import { state } from "./model";
import { DeckBtn, addDeckRegionImg } from "./decks";
import useSound from "use-sound";
import switchingGameSections from "../sounds/switchingGameSections.mp3";
import hoveringSystemBtns from "../sounds/hoveringSystemBtns.mp3";
import { useState, useEffect } from "react";

export function PlayScreen({
  selected,
  setSelected,
  handleSetPSopen,
  pSopen,
  handleFieldOpen,
}) {
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
            // setSelected={setSelected}
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
  // const numOfDecks = 9;
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
  // PSmagisArea.innerHTML = "";
  // console.log(magi.url);
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
  const soundUrl = switchingGameSections;
  const [play] = useSound(soundUrl);

  const soundUrl2 = hoveringSystemBtns;
  const [play2] = useSound(soundUrl2);

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

      // const modalLoadingScreen = document.getElementById("modal-loadingScreen");
      // const modalPlayScreen = document.getElementById("modal-PlayScreen");

      if (width >= 55) {
        clearInterval(progressBarInterval);
        // modalLoadingScreen.classList.add("hidden");
        // modalPlayScreen.classList.remove("hidden");
      }
    }, 5);

    document.addEventListener("click", () => {
      clearInterval(progressBarInterval);
      setWidth((a) => {
        // if (a !== 100) a = 100;
        // return a + 50;
      });
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
